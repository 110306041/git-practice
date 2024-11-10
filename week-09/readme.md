Troubleshooting Lab - Web Server
---

1. 建立好 EC2 後，在本地端 SSH 進去，username 是 ubuntu。

``` bash
# 我的 "lab.pem" 放在桌面
cd /Users/chenyurou/Desktop

# 我建立的 instance 公有 IPv4 地址是 57.180.27.175
ssh -i "lab.pem" ubuntu@57.180.27.175

# 檢查 server 上本地的 HTTP 服務是否運行正常
curl localhost
```
-> 看到 "Haha, I am the fake web server. Try to find the real web server!"

2. 啟動 nginx 發現失敗，查看 nginx status

``` bash
ubuntu@ip-172-31-35-36:~$ sudo systemctl start nginx
Job for nginx.service failed because the control process exited with error code.
See "systemctl status nginx.service" and "journalctl -xeu nginx.service" for details.

ubuntu@ip-172-31-35-36:~$ sudo systemctl status nginx
× nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; preset: enabled)
     Active: failed (Result: exit-code) since Sun 2024-11-10 02:31:10 UTC; 1min 30s ago
       Docs: man:nginx(8)
    Process: 9317 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=1/FAILURE)
        CPU: 3ms

Nov 10 02:31:10 ip-172-31-35-36 systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
Nov 10 02:31:10 ip-172-31-35-36 nginx[9317]: 2024/11/10 02:31:10 [emerg] 9317#9317: unexpected ";" in /etc/nginx/nginx.conf:8
Nov 10 02:31:10 ip-172-31-35-36 nginx[9317]: nginx: configuration file /etc/nginx/nginx.conf test failed
Nov 10 02:31:10 ip-172-31-35-36 systemd[1]: nginx.service: Control process exited, code=exited, status=1/FAILURE
Nov 10 02:31:10 ip-172-31-35-36 systemd[1]: nginx.service: Failed with result 'exit-code'.
Nov 10 02:31:10 ip-172-31-35-36 systemd[1]: Failed to start nginx.service - A high performance web server and a reverse proxy server.
```

-> 看到 unexpected ";" in /etc/nginx/nginx.conf:8

3. 修改 Nginx 的設定檔
``` bash
sudo nano /etc/nginx/nginx.conf
```
<img width="300" alt="截圖 2024-11-10 上午10 40 13" src="https://github.com/user-attachments/assets/d3bd7bf4-e644-4740-a146-0f296090987c">

-> 在第八行真的看到有 unexpected ";"，刪除後存檔
-> 再重新啟動一次 nginx

``` bash
ubuntu@ip-172-31-35-36:/$ sudo systemctl restart nginx
Job for nginx.service failed because the control process exited with error code.
See "systemctl status nginx.service" and "journalctl -xeu nginx.service" for details.
ubuntu@ip-172-31-35-36:/$ sudo systemctl status nginx
× nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; preset: enabled)
     Active: failed (Result: exit-code) since Sun 2024-11-10 02:43:53 UTC; 8s ago
       Docs: man:nginx(8)
    Process: 9355 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 9356 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=1/FAILURE)
        CPU: 14ms

Nov 10 02:43:51 ip-172-31-35-36 systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
Nov 10 02:43:51 ip-172-31-35-36 nginx[9356]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Nov 10 02:43:51 ip-172-31-35-36 nginx[9356]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Nov 10 02:43:52 ip-172-31-35-36 nginx[9356]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Nov 10 02:43:52 ip-172-31-35-36 nginx[9356]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Nov 10 02:43:53 ip-172-31-35-36 nginx[9356]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Nov 10 02:43:53 ip-172-31-35-36 nginx[9356]: nginx: [emerg] still could not bind()
Nov 10 02:43:53 ip-172-31-35-36 systemd[1]: nginx.service: Control process exited, code=exited, status=1/FAILURE
Nov 10 02:43:53 ip-172-31-35-36 systemd[1]: nginx.service: Failed with result 'exit-code'.
Nov 10 02:43:53 ip-172-31-35-36 systemd[1]: Failed to start nginx.service - A high performance web server and a reverse proxy server.
```
-> 還是有錯誤，顯示 Nginx 嘗試 bind 到port 80，但是 port 80 已經被別人佔用了

4. 查看是誰占用了 port 80，kill 掉，再重新啟動一次 nginx

``` bash
ubuntu@ip-172-31-35-36:/$ sudo lsof -i :80
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
srv     575 root    3u  IPv6   6583      0t0  TCP *:http (LISTEN)
ubuntu@ip-172-31-35-36:/$ sudo kill 575
ubuntu@ip-172-31-35-36:/$ sudo systemctl restart nginx
ubuntu@ip-172-31-35-36:/$ sudo systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; preset: enabled)
     Active: active (running) since Sun 2024-11-10 02:48:19 UTC; 17s ago
       Docs: man:nginx(8)
    Process: 9416 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 9418 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 9419 (nginx)
      Tasks: 2 (limit: 1130)
     Memory: 1.7M (peak: 1.9M)
        CPU: 14ms
     CGroup: /system.slice/nginx.service
             ├─9419 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             └─9420 "nginx: worker process"

Nov 10 02:48:19 ip-172-31-35-36 systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
Nov 10 02:48:19 ip-172-31-35-36 systemd[1]: Started nginx.service - A high performance web server and a reverse proxy server.
ubuntu@ip-172-31-35-36:/$ curl localhost
curl: (7) Failed to connect to localhost port 80 after 0 ms: Couldn't connect to server
```
-> nginx 成功啟動，但又有了新問題：無法成功連到server


5. 查看權限
``` bash
ubuntu@ip-172-31-35-36:/$ ls -la /var/myweb/index.html
-rw-r----- 1 root root 165 Oct 11 07:17 /var/myweb/index.html
ubuntu@ip-172-31-35-36:/$ sudo chown root:www-data /var/myweb/index.html
ubuntu@ip-172-31-35-36:/$ sudo systemctl restart nginx
ubuntu@ip-172-31-35-36:/$ curl localhost
curl: (7) Failed to connect to localhost port 80 after 0 ms: Couldn't connect to server
```

6. 查看防火牆
``` bash
ubuntu@ip-172-31-35-36:/$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
REJECT     tcp  --  anywhere             anywhere             tcp dpt:http reject-with icmp-port-unreachable

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```
-> 在 INPUT 鏈中，有一個規則指定拒絕所有嘗試到達端口 80（HTTP）的 TCP 連接。這個規則將拒絕任何來自外部的 HTTP 請求到達您的服務器，並以 ICMP 端口不可達消息作為響應。這意味著即使 Nginx 配置正確且準備好處理 HTTP 請求，流量仍將在到達 Nginx 之前被阻止。

6. 刪除第一條規則，並在防火牆的 INPUT 鏈開頭插入一條規則，允許所有指向端口 80 的 TCP 數據包進入本機，最後再進行一次測試
``` bash
ubuntu@ip-172-31-35-36:/$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
REJECT     tcp  --  anywhere             anywhere             tcp dpt:http reject-with icmp-port-unreachable

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
ubuntu@ip-172-31-35-36:/$ sudo iptables -L --line-numbers
Chain INPUT (policy ACCEPT)
num  target     prot opt source               destination
1    REJECT     tcp  --  anywhere             anywhere             tcp dpt:http reject-with icmp-port-unreachable

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination
ubuntu@ip-172-31-35-36:/$ sudo iptables -D INPUT 1
ubuntu@ip-172-31-35-36:/$ sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
ubuntu@ip-172-31-35-36:/$ curl localhost
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Troubleshooting 101</title>
  </head>
  <body>
    <h1>Congratulations!</h1>
  </body>
</html>
```
-> 成功了！
-> reboot後，又失敗了，重新查看防火牆規則，發現沒有儲存到

修改 iptables 規則後，這些變更在重啟後默認不會保存。為了使規則持久化，您需要使用 iptables-save 命令或相關工具（如 iptables-persistent 包）來保存這些設置。

7. 重新再添加一次規則，並存檔
``` bash
ubuntu@ip-172-31-35-36:~$ sudo iptables -D INPUT 1
ubuntu@ip-172-31-35-36:~$ sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
ubuntu@ip-172-31-35-36:~$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:http

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
ubuntu@ip-172-31-35-36:~$ sudo sh -c "iptables-save > /etc/iptables/rules.v4"
```
-> 再檢查一次 nginx，發現上面處理過的 port 80 被佔用問題又回來了

8. 停止和禁用 srv 服務，防止它在系統啟動時自動啟動
``` bash
ubuntu@ip-172-31-35-36:~$ sudo lsof -i :80
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
srv     513 root    3u  IPv6   6432      0t0  TCP *:http (LISTEN)
ubuntu@ip-172-31-35-36:~$ sudo systemctl stop srv
ubuntu@ip-172-31-35-36:~$ sudo systemctl disable srv
Removed "/etc/systemd/system/multi-user.target.wants/srv.service".`
```

9. reboot 後還是失敗，nginx沒有在開機時自動啟動
``` bash
ubuntu@ip-172-31-35-36:~$ sudo systemctl enable nginx
Synchronizing state of nginx.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable nginx
ubuntu@ip-172-31-35-36:~$ sudo systemctl start nginx
```
10. 再reboot一次，這次沒出現任何問題，直接成功
<img width="291" alt="截圖 2024-11-10 上午11 48 02" src="https://github.com/user-attachments/assets/0cccb435-facc-4eb5-b033-7448888c3402">
