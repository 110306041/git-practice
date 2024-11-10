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
2. 
