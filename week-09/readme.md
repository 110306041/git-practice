Troubleshooting Lab - Web Server
---
公司有一台 EC2 instance，裡面有用 systemd 管理了一個 NGINX web server，但它現在似乎無法正確運作，請修復它。

### 1. 建立好 EC2 後，在本地端 SSH 進去，username 是 ubuntu。

``` bash
# 我的 "lab.pem" 放在桌面
cd /Users/chenyurou/Desktop

# 我建立的 instance 公有 IPv4 地址是 57.180.27.175
ssh -i "lab.pem" ubuntu@57.180.27.175

# 檢查 server 上本地的 HTTP 服務是否運行正常
curl localhost
```
**-> 看到 "Haha, I am the fake web server. Try to find the real web server!"**

### 2. 啟動 nginx 發現失敗，查看 nginx status

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

**-> 看到 unexpected ";" in /etc/nginx/nginx.conf:8**

### 3. 修改 Nginx 的設定檔
``` bash
sudo nano /etc/nginx/nginx.conf
```
<img width="300" alt="截圖 2024-11-10 上午10 40 13" src="https://github.com/user-attachments/assets/d3bd7bf4-e644-4740-a146-0f296090987c">

**-> 在第八行真的看到有 unexpected ";"，刪除後存檔**

**-> 再重新啟動一次 nginx**

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
**-> 還是有錯誤，顯示 Nginx 嘗試 bind 到port 80，但是 port 80 已經被別人佔用了**

### 4. 查看是誰占用了 port 80，kill 掉，再重新啟動一次 nginx

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
**-> nginx 成功啟動，但又有了新問題：無法成功連到server**

### 5. 經組員提醒需要檢查 nginx 文件權限，改變 /var/myweb/index.html 文件的群組擁有者到 www-data
``` bash
ubuntu@ip-172-31-35-36:~$ sudo lsof -i :80
COMMAND PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   672     root    6u  IPv4   7553      0t0  TCP *:http (LISTEN)
nginx   673 www-data    6u  IPv4   7553      0t0  TCP *:http (LISTEN)
ubuntu@ip-172-31-35-36:/$ ls -la /var/myweb/index.html
-rw-r----- 1 root root 165 Oct 11 07:17 /var/myweb/index.html
ubuntu@ip-172-31-35-36:/$ sudo chown root:www-data /var/myweb/index.html
ubuntu@ip-172-31-35-36:~$ ls -la /var/myweb/index.html
-rw-r----- 1 root www-data 165 Oct 11 07:17 /var/myweb/index.html
ubuntu@ip-172-31-35-36:/$ sudo systemctl restart nginx
ubuntu@ip-172-31-35-36:/$ curl localhost
curl: (7) Failed to connect to localhost port 80 after 0 ms: Couldn't connect to server
```
**-> 執行 ls -la /var/myweb/index.html 發現只有 root，這可能會阻止 www-data 讀取文件**

**-> 使用 sudo chown root:www-data /var/myweb/index.html 命令，將文件的群組擁有者更改為 www-data。**
（www-data 通常是許多 Linux 系統上運行 web 服務的默認用戶，包括 nginx 和 Apache。這樣做是為了讓 nginx 能夠讀取這個文件）

**-> 重新嘗試從本地訪問，但還是失敗了**

### 6. 檢查防火牆問題
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
**-> 在 INPUT 鏈中，有一個規則指定拒絕所有嘗試到達 port 80（HTTP）的 TCP 連接。這表示流量會在到達 Nginx 之前被阻止。**

### 7. 刪除 REJECT 的那條規則，並插入一條新規則，設定伺服器可以接受來自任何來源的網頁瀏覽請求
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
**-> 再進行一次測試，成功了！**

**-> 經老師提醒要 reboot 之後，又失敗了，重新查看防火牆規則，發現完全沒有儲存到，REJECT 的那條規則還是在那裡**
（修改 iptables 規則後，這些變更在 reboot 後默認不會保存。為了使規則一直都在，需要使用 iptables-save 命令等相關工具來保存這些規則）

### 8. 重新再添加一次規則，並存檔
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
**-> 再檢查一次 nginx，發現上面處理過的 port 80 被佔用問題又回來了**

### 9. 發現有一個名字是 srv 的 service 正在佔用 port 80，停止和禁用 srv 服務，防止它在系統啟動時自動啟動
``` bash
ubuntu@ip-172-31-35-36:~$ sudo lsof -i :80
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
srv     513 root    3u  IPv6   6432      0t0  TCP *:http (LISTEN)
ubuntu@ip-172-31-35-36:~$ sudo systemctl stop srv
ubuntu@ip-172-31-35-36:~$ sudo systemctl disable srv
Removed "/etc/systemd/system/multi-user.target.wants/srv.service".`
```
**-> reboot 後還是失敗，需要restart nginx 才能成功，顯示 nginx 沒有在開機時自動啟動**

### 10. 啟用 nginx，讓他開機後自動啟動
``` bash
ubuntu@ip-172-31-35-36:~$ sudo systemctl enable nginx
Synchronizing state of nginx.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable nginx
ubuntu@ip-172-31-35-36:~$ sudo systemctl start nginx
```
### 11. 再reboot一次，這次沒出現任何問題，直接成功
<img width="291" alt="截圖 2024-11-10 上午11 48 02" src="https://github.com/user-attachments/assets/0cccb435-facc-4eb5-b033-7448888c3402">

### 心得
這次的 Troubleshooting Lab 很有趣。
雖然之前有處理過佔用 port 的問題，但是是第一次處理防火牆和權限問題，原本也都不知道 reboot 後 iptables 的規則不會儲存等等。

我在課堂上幾乎都是需要別人的提醒才能知道是哪裡有問題，還帶著一點挫敗感矇矇懂懂完成。
但回家後重新再做了一次，一邊紀錄、撰寫驗屍報告，最後成功靠自己修好 web server，還是很有成就感🥺。

再重新做過一次之後可以理解所有 error message 其實都有好好傳遞可能會有的問題。
之前處理各種 error message 時因為事態緊急和時間迫切，所以都是直接整坨丟給 GPT，要他幫我想辦法，但其實很多時候也不清楚為什麼要這樣做操作，有時候 GPT 還會鬼打牆一直叫我檢查已經沒問題的地方，更多時候他也沒辦法成功幫我解決。

總之經由這次的 lab ，我更知道要怎麼去看 error message，嘗試各種方法解決。最大的收穫可能是「不要急」，一直有問題噴出來就一個一個慢慢解決就好ㄌ！
