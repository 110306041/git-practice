網域購買與憑證申請
---
## 1. 我的網址，應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 架設的 Express server （由 Nginx proxy 到 Express）

## 2. 你在哪裡購買網域的
- GoDaddy
- 原因：
  - 之前大三必修課「企業資料通訊」在介紹 DNS registrar 時老師有介紹到他，所以第一個就馬上想到他，算是年資最久也最受大眾歡迎的網域註冊商之一。
  - 我算是網域初學者，GoDaddy 的介面相對來說比較簡單而且好上手。
  - 考慮到目前還不確定網站的發展，所以也選擇初期價格比較便宜的服務商。
  - 參考資料：[【建站教學#3】如何選擇網域商？2021前六大網域商比較](https://notjustdesigner.com/choose-domain-registrar/)

## DNS records
- DNS (Domain Name System) records 全名：distributed database storing resource records (RR)
- 用於**將網域名稱對應到 IP 位址的資料庫紀錄**
- RR format: (name, value, type, ttl)
- 最常見的 DNS RR type:
  - A record- 儲存網域 IP 位址的記錄。
  - CNAME record - 將一個網域或子網域轉寄到另一個網域，不提供 IP 位址。
  - MX record - 將郵件導向到電子郵件伺服器。
  - NS record - 儲存用於 DNS 項目的名稱伺服器。
- 參考資料：
  - [DNS 記錄](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/)
  - [2023 Networking](https://sites.google.com/view/mikehsiao/teaching/networking-2024?authuser=0)

## 3. DNS 的 A record 是什麼？
- DNS 的 A Record 代表 "**Address Record**"，是**最基礎**的 DNS 記錄類型，用來說明**網域的 IP 位址**。
- 例如你有一個域名 `example.com`，你可以設置一個 A Record，讓它指向你的伺服器的 IP 地址如 `192.0.2.1`，這樣當用戶訪問 `example.com` 時，他們的網路請求就會被導向這個 IP 地址。
  
  | name | type | value   | TTL   |
  |--------------|------|---------|-------|
  |      @       |  A   | 192.0.2.1 | 14400 |

  - **name:** 表示 DNS 記錄的名稱。「@」符號表示這是「root DNS server 的記錄」
  - **type:** 記錄 DNS 類型 `A`
  - **value:** 這是 DNS 記錄指向的實際數據。在此例中，192.0.2.1 是一個 IPv4 地址，代表當使用者訪問域名時，他們的瀏覽器會被引導到這個 IP 地址。
  - **TTL:** 存留時間（Time-To-Live），以秒為單位。A 記錄的預設 TTL 是 14400 秒，代表當 A 記錄更新後，需要 240 分鐘才能生效。
- 參考資料：[什麼是 DNS A 記錄？](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-a-record/)

## 4. DNS 的 NS record 是什麼？
- DNS 的 NS Record 代表 "**Name Server Record**"，名稱伺服器紀錄
- 用來**指定網域的 Authoritative DNS server，通知整個網路在哪裡可以找到你的 DNS record**
![image](https://github.com/user-attachments/assets/041e7be9-6028-4062-b661-6a702459cf69)
[2023 Networking](https://sites.google.com/view/mikehsiao/teaching/networking-2024?authuser=0)
- 通常一個網域會有多個 NS 記錄，指定一個主要和一個或多個備用的 DNS server，以確保網域的穩定訪問。
- 假設你的域名是 example.com，並且你想指定兩個 DNS server來管理 DNS 查詢。
  
  | name     | type | value            | TTL   |
  |------------------|------|------------------|-------|
  | example.com | NS   | ns1.example.com  | 86400 |
  | example.com | NS   | ns2.example.com  | 86400 |

  - **name**: 域名 `example.com`，表示正在為整個 `example.com` 域名指定 Authoritative DNS server。
  - **type**: 記錄 DNS 類型 `NS`。 
  - **value**:  DNS server的地址，這裡列出了兩個，分別是 `ns1.example.com` 和 `ns2.example.com`。這表示 DNS 查詢將由這兩個 DNS server處理。
  - **TTL**: 存留時間設為 86400 秒（1 天），表示這條 DNS 記錄在 DNS 伺服器快取中保持的時間。
- 參考資料：[什麼是 DNS NS 記錄？](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-ns-record/)
  
## 5. Domain Name vs FQDN vs URL 這三者分別為何？
### 網域名稱（Domain Name）:
- 網域名稱是使用者在瀏覽器視窗中鍵入以存取特定網站的文字。例如，Google 的網域名稱是 `google.com`。
- 網域可透過 DNS 的解析，轉換成電腦看得懂的 IP 地址。
- 網站的實際位址是一個複雜的數字 IP 位址（例如 103.21.244.0），但由於 DNS 的存在，使用者可以輸入人類友好的網域名稱並將其路由到他們要查找的網站。此過程稱為 DNS 查閱。

### 完整網域名稱（Fully Qualified Domain Name, FQDN）
- 由『主機名稱』 + 『網域名稱』 + 『.』所組成
- FQDN 確定了在全球域名系統（DNS）中的絕對位置，指向具體的一台主機。
- 以 `www.flag.com.tw.` 為例，`www` 就是這台 Web 伺服器的主機名稱。`flag.com.tw.` 就是這台 Web 伺服器所在的網域名稱。最後的這一個 `.` 代表在整個 DNS 架構中的最上層網域－根網域（Root Domain）。
- 整個 FQDN 的長度不得超過 255 個字元（包含『.』）, 而不管是主機名稱或是網域名稱, 都不得超過 63 個字元。
### 統一資源定位器（Uniform Resource Locator, URL）:
- 也稱為網址，包含網站的網域名稱以及其他資訊，如通訊協定和路徑等。
### 統整
- 在 URL `https://www.tsg.com.tw/blog.htm` 中，`tsg.com.tw` 是網域名稱（Domain Name)，`www.tsg.com.tw.` 是FQDN， `https` 是通訊協定，`/blog.htm` 是指向網站上特定頁面的路徑。
![image](https://github.com/user-attachments/assets/a805415a-837e-4f23-8417-206dbbc835b9)
![image](https://github.com/user-attachments/assets/14081675-3d4d-4ef7-af84-ae3f9d6e5072)
- 參考資料：
  - [什麼是網域名稱？| 網域名稱與 URL](https://www.cloudflare.com/zh-tw/learning/dns/glossary/what-is-a-domain-name/)
  - [網域是什麼？網址與網域名稱的基本介紹｜天矽科技客製化網頁設計](https://www.tsg.com.tw/blog-detail4-183-0-domain.htm)
## 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
- HTTP 的全名為「超文本傳輸協定 (Hyper Text Transfer Protocol)」，是一種用於在網際網路上傳輸超媒體文件（例如HTML）的協定。
- HTTPS（Hyper Text Transfer Protocol Secure）透過 HTTP 進行通訊，但在通訊過程中使用 SSL/TLS 通訊協定對通訊進行加密。
- 當使用者傳輸敏感性、或機密性資訊時，如登入銀行帳戶、輸入信用卡資料、帳號密碼等，這些資訊得以被加密保護，也就是說如果有心人士要竊取，看到的也只是加密符號或一堆亂碼而已。
- HTTP 網站去申請 SSL 憑證，就能升級為 HTTPS。
- SSL (Secure Sockets Layer)，「安全通訊端層」，是一種加密技術，**經由 SSL 加密後的網站，能夠有效保護使用者在網站內或網站間傳輸的資訊**，使其不易被第三方攔截，防止資料外洩。
- 參考資料：[HTTPS是什麼？](https://www.nss.com.tw/why-https-is-important-than-http)
