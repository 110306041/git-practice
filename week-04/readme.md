Linux檔案目錄結構
---
### Filesystem Hierarchy Standard (FHS)
- FHS 檔案系統階層標準
- 規範每個特定的目錄下應該要放置什麼樣子的資料。
- 目的是希望 **讓使用者可以瞭解到已安裝軟體通常放置哪個目錄下**，所以希望獨立的軟體開發商、作業系統製作者、以及想要維護系統的使用者，都能夠遵循FHS的標準。
- FHS 針對目錄樹架構僅定義出 **三層目錄底下應該放置什麼資料**，分別是下列三個：
  - **/(root, 根目錄)：** 與開機系統有關
  - **/usr(unix software resouce)：** 與軟體安裝/執行有關
  - **/var(variable)：** 與系統運作過程有關
- FHS 會要求目錄下**必須**要有什麼檔案、**建議**可以有什麼檔案，當然也有 FHS 沒有規範，但也很**重要**的目錄。
![/image/sample.webp ](https://i.ytimg.com/vi/42iQKuQodW4/maxresdefault.jpg)
</br>[Linux Directories Explained in 100 Seconds](https://www.youtube.com/watch?v=42iQKuQodW4)
### /etc 是什麼的縮寫？這裡通常都放哪些檔案？
- "et cetera" or "editable text config"
- **系統主要的設定檔幾乎都放置在這個目錄內**，例如人員的帳號密碼、系統的主要設定、各種服務的起始檔等等。
- 一般來說，這個目錄下的各檔案屬性是可以讓一般使用者查閱的， 但是只有root有權力修改。

### /var 這裡通常都放哪些檔案？
- /var 目錄主要針對**常態性變動的檔案**，包括**快取(cache)、登錄檔(log file)** 以及某些軟體運作所產生的檔案，包括**程序檔案(lock file, run file)**，或者例如**MySQL資料庫的檔案**等等。
- /var 在系統運作後才會漸漸佔用硬碟容量

### /boot 這裡通常都放哪些檔案？
- 主要放置**開機會使用到的檔案**，包括**Linux核心檔案**以及**開機選單與開機所需設定檔**等等。
- Linux kernel常用的檔名為：vmlinuz

### $PATH 環境變數的作用是什麼？
- **告訴 Linux 在哪裡可以找到可執行文件**
- 當使用者輸入一個命令（如pwd、echo、ls、mkdir…等等）時，系統會在「PATH 環境變數底下的路徑」內去搜尋，是否有與該命令的執行檔，若有，則執行之。若無，則回傳錯誤訊息：command not found。
- 這些路徑的先後順序是有意義的，因同一個命令執行檔，可能在不同路徑下同時擁有，這時系統在搜尋命令執行檔的時候，就是**按照 PATH 中路徑的先後順序來搜尋，執行最先被找到的那個命令執行檔。**
- 觀察PATH變數內容 (通常各個路徑之間用冒號 : 分隔)
  ``` bash
  echo $PATH
  ```
  /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
  這表示 PATH 底下的路徑有/usr/local/sbin、/usr/local/bin、/usr/sbin、/usr/bin、/sbin、/bin、/usr/games。
  
### which 指令的作用？
- 在 PATH 變數指定的路徑中，搜尋某個系統指令的位置，並且傳回第一個搜尋結果
- 假設你想知道 python 命令的具體路徑
  ``` bash
  which python
  ```
  這會返回 python 命令的全路徑，如 /usr/bin/python。

建立 EC2 主機與部署 Web Server
---

### 1. 提供 instance 的 public IP，保持主機是一直在啟動中
- public IP: 3.107.169.203
<img width="1162" alt="截圖 2024-10-06 下午2 54 44" src="https://github.com/user-attachments/assets/7a17ee99-5612-4109-b118-b48deebb5f1b">

### 2. 什麼是 instance type?
- AWS EC2 全名 Elastic Compute Cloud，是一個具有彈性擴充的虛擬執行個體。
- EC2 是由作業系統、vCPU以及記憶體所構成
  <img width="781" alt="截圖 2024-10-06 下午3 20 21" src="https://github.com/user-attachments/assets/f3b6d030-adf7-46a7-81aa-0280af612198">
</br>[可以很簡單也可以非常複雜的EC2_InstanceType](https://ithelp.ithome.com.tw/m/articles/10295411)
- **instance type 由不同的CPU、記憶體、儲存體和網路頻寬組合而成，讓用戶為應用程式彈性選擇適當的資源組合。**
- instance type 中包含
  - vCPU
  - Memory：記憶體
  - Instance Storage：可用儲存空間類型
  - Network Bandwidth：網路頻寬
  - EBS Bandwidth：EBS 頻寬
- EC2 的 vCPU 與 Memory 是配好的，每種 instance type 都是固定的，不能自己增減 vCPU 或 Memory。

### 3. 什麼是 Nginx？有哪些用途與特性？
- Nginx 是一個非同步框架的 web server
- 特性（和 Apache 比較）
  - **輕量級：** 核心功能專注於 HTTP 伺服器、反向代理和電子郵件（IMAP/POP3）代理功能。
  - **高併發性能：** 使用非同步事件驅動架構，能有效處理數千甚至數萬的同時連線，而不會導致性能下降。
  - **處理靜態檔案的效率較高：** 直接從 OS 的磁碟快取中讀取數據，減少了磁碟讀寫次數。
  - **耗費的記憶體較少**：因為非同步的處理方式，在處理大量併發連線時消耗的記憶體更少。
  - **負載效能好**：可以有效地分發流量到多個後端伺服器，提高網站的可用性和擴展性。
- 用途
  - **反向代理(Reverse Proxy):**  client 不需知道 Application Server 的真實位置，僅需要透過 Nginx 反向代理的方式就能夠向後面的 Application Server 發送請求，而 Application Server 也不需要知道是哪一個 client 的 Request，僅需回傳 Response 即可。
  - **負載均衡(Load Balance):** 自動將 client 的 Request 分送到不同 Application Server 上，分送的演算法可以自己設計，最常使用的是 Round Robin 演算法。
  - **HTTP 快取:** 見參考網頁，有 Nginx Cache 機制的圖

### 4. pm2 套件是什麼？有什麼用處？
- pm = process manager
- 幫助開發者在生產環境中管理和維持應用程序的運行，並提供了許多功能來提高應用的可靠性和效率
- 用處：
  - **自動重啟應用：** 如果 Node.js 應用程序因錯誤停止運行，pm2 可以自動重啟它。
  - **負載均衡：** pm2 可以輕鬆地擴展應用在多個 CPU 核心之間以提高性能和利用率。
  - **日誌管理：** pm2 能夠處理應用的日誌文件，且支持日誌文件的分割和保留，使得日誌管理變得更加方便和高效。
  - **更新流程：** pm2 可以實現無停機更新，在重新部署應用時，不需要停止服務。
  - **監控和管理應用性能：** pm2 提供了一套完整的監控工具，可幫助開發者監控應用的 CPU 和記憶體使用情況等等。

### 5. 步驟 9 中提到的 `proxy` 是什麼意思？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?
- Nginx 作為反向代理，介於 client 與 Express server 之間。client 首先連接到 Nginx，然後 Nginx 轉發請求到 Express server，最後將 server 的 response 返回給 client。
- 使用 Nginx 來 proxy 到 Express 開發的 Web 伺服器有以下原因：
  - **性能優化：** Nginx 處理靜態內容（如圖片、CSS、JavaScript 文件）的效率非常高，可以減輕 Express server 的負擔。
  - **安全性增強：** Nginx 可以配置 SSL/TLS 加密，保護數據傳輸安全，並可以幫助防範網路攻擊。
  - **負載均衡：** Nginx 可以將流量分發至多個 Express server，提高應用的可用性和擴展性。
  - **集中化管理：** 利用 Nginx 檢查 access.log 和 error.log ，方便維護和監控。

### Forward Proxy vs. Reverse proxy
  ![image](https://github.com/user-attachments/assets/9446b94f-31d6-42db-ad0f-16a303cc07fe)
</br>[【前端學Nginx】什麼是Nginx？](https://pink-learn-frontend.medium.com/%E5%89%8D%E7%AB%AF%E5%AD%B8nginx-%E4%BB%80%E9%BA%BC%E6%98%AFnginx-fc604db20ad1)
- `Forward Proxy`
  - 當 client 從瀏覽器輸入網址，發送 request 的時候，會先連到 proxy server，再轉連到實際上真正要連到的 web server。這個時候真正的目的地只知道 proxy server 對他發送 request，不知道實際發送 request 的人是 client。
  - VPN 的應用概念就是正向代理：連到 VPN 提供的 proxy，再用那個 proxy 去騙實際上要連到的目的地的真實身份。
- `Reverse proxy`
  - 正向代理隱藏的是 client 的身份，反向代理也就是**隱藏真實目的地**。
  - 在反向代理的情境下，client端使用瀏覽器輸入網址，發送 request 時，我們會以為 proxy server 是我們的目的地，但是實際上 proxy server 還會繼續往下導到真正的目的地。
  - 通常應用在**負載平衡和與安全相關的防火牆上。**

### 6. 步驟 9 的 Nginx 設定檔
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
### 7. Security Group 是什麼？用途為何？有什麼設定原則嗎？
- Security Group 就是 EC2 外面一層的**流量防火牆**，負責**控制進出 EC2 實例的網路流量**，指定哪些特定協議或哪些 IP 地址被允許訪問該實例。
- **規則** （預設的 SG 規則是限制流入的流量，但流出不限制）
  - 透過允許來設定，用戶無法建立拒絕存取的規則。
  - 可讓用戶選擇協定(TCP、HTTP、HTTPS、SSH)以及port 號
  - 可以隨時新增或移除 SG 規則，也可以套用超過一組的 SG 規則
### 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
- sudo = superuser do
- 由於 root 權限非常高，使用時必須非常小心，若下錯指令是有可能造成系統損毀。
- 因此，在維護 Linux 系統時，標準的作法是：**使用一般的帳號登入，遇到需要 root 權限時，再使用 sudo 取得較高的權限進行系統變更**
- Ubuntu Linux 系統預設在安裝時基於安全考量，並不會啟用 root 帳號，無法用 root 直接登入系統，所有的系統管理動作都是透過 sudo 來取得 root 權限。
- 對於不影響系統或不需管理員權限的日常任務，如讀取或編輯個人文件、運行普通應用程序，通常就不需要 sudo。

### 9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？
- Nginx 的日誌文件主要包括兩種類型：**訪問日誌（access log）和錯誤日誌（error log）**
- 大多數 Linux 發行版（如 Ubuntu、CentOS）中，Nginx 的日誌文件通常位於以下位置：
  - 訪問日誌：/var/log/nginx/access.log
  - 錯誤日誌：/var/log/nginx/error.log
```nginx
ubuntu@ip-172-31-38-27:~/git-practice/backend$ sudo grep -r "access_log" /etc/nginx/
/etc/nginx/nginx.conf:  access_log /var/log/nginx/access.log;
ubuntu@ip-172-31-38-27:~/git-practice/backend$ sudo grep -r "error_log" /etc/nginx/
/etc/nginx/nginx.conf:error_log /var/log/nginx/error.log;
```
- 可以使用 `cat`（查看完整 log）、`less`（分頁查看 log） 或 `tail`（查看最新日誌） 命令看 Nginx 的 Log
``` nginx
ubuntu@ip-172-31-38-27:~/git-practice/backend$ sudo tail -f /var/log/nginx/access.log
140.119.96.63 - - [06/Oct/2024:06:46:11 +0000] "GET / HTTP/1.1" 200 12 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
140.119.96.63 - - [06/Oct/2024:06:46:11 +0000] "GET /favicon.ico HTTP/1.1" 404 148 "http://3.107.169.203/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
140.119.96.63 - - [06/Oct/2024:06:46:12 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
140.119.96.63 - - [06/Oct/2024:06:46:18 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
198.235.24.8 - - [06/Oct/2024:08:08:54 +0000] "GET / HTTP/1.1" 200 12 "-" "Expanse, a Palo Alto Networks company, searches across the global IPv4 space multiple times per day to identify customers&#39; presences on the Internet. If you would like to be excluded from our scans, please send IP addresses/domains to: scaninfo@paloaltonetworks.com"
1.200.11.74 - - [06/Oct/2024:08:12:44 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
3.107.169.203 - - [06/Oct/2024:08:18:52 +0000] "GET / HTTP/1.1" 200 12 "-" "curl/8.5.0"
31.13.224.36 - - [06/Oct/2024:08:38:53 +0000] "GET /.git/config HTTP/1.1" 404 150 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
```
- **解釋：**
  - **IP 地址**: `3.107.169.203` - 發出請求的 client IP 地址。
  - **時間戳**: `[06/Oct/2024:08:18:52 +0000]` - 請求發生的日期和時間，UTC 時區。
  - **請求類型**: `"GET / HTTP/1.1"` - 使用 GET 方法請求根目錄，HTTP 協議版本 1.1。
  - **狀態碼**: `200` - 表示請求已成功處理。
  - **傳輸字節**: `12` - 伺服器響應的內容大小，字節單位。（因為 Hello World! 有12位元） 
  - **引薦來源**: `"-"` - 沒有提供引薦來源，表示直接訪問。
  - **用戶代理**: `"curl/8.5.0"` - 表明發出請求的是 curl 程序，版本為 8.5.0。
  - or `"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"`：顯示請求是通過 Mac OS X 10.15.7 上的 Chrome 瀏覽器發出的，其中包含了瀏覽器的具體信息和使用的渲染引擎。

### 10. 其他在過程中遭遇的問題
- 一開始把 Security Group 和「金鑰對」搞混了，一直沒有設定到「安全群組」，導致一直無法連線成功
- 忘記當初專案.env檔設定的 port 是8080還是3000，所以又回去查
- 原本用「npm install pm2@latest -g」來安裝pm2，但出現這個錯誤訊息「EACCES: permission denied」，所以加上了sudo，就成功了

### 11. 列出完成本作業時參考的資料
- [【前端學Nginx】什麼是Nginx？](https://pink-learn-frontend.medium.com/%E5%89%8D%E7%AB%AF%E5%AD%B8nginx-%E4%BB%80%E9%BA%BC%E6%98%AFnginx-fc604db20ad1)
- [Nginx 是什麼？有哪些用途？](https://www.explainthis.io/zh-hant/swe/why-nginx)
- [可以很簡單也可以非常複雜的EC2_InstanceType](https://ithelp.ithome.com.tw/m/articles/10295411)
- [【Linux】 檔案目錄結構筆記](https://watson050308.medium.com/linux-%E6%AA%94%E6%A1%88%E7%9B%AE%E9%8C%84%E7%B5%90%E6%A7%8B-5f9f6e7efeca)</br>
- [Linux Directories Explained in 100 Seconds](https://www.youtube.com/watch?v=42iQKuQodW4)
- [Security Group 簡介與佈建](https://ithelp.ithome.com.tw/articles/10264200)
- [Linux 的 su 與 sudo 指令教學與範例](https://medium.com/linux-on-raspberry-pi4/linux-%E7%9A%84-su-%E8%88%87-sudo-%E6%8C%87%E4%BB%A4%E6%95%99%E5%AD%B8%E8%88%87%E7%AF%84%E4%BE%8B-%E8%BD%89%E9%8C%84-a47251c5296)
- ChatGPT（用在部署 Web Server 的過程）
