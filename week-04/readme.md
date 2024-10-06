Linux檔案目錄結構
---
### Filesystem Hierarchy Standard (FHS)
- FHS 檔案系統階層標準
- 規範每個特定的目錄下應該要放置什麼樣子的資料。
- 目的是希望 **讓使用者可以瞭解到已安裝軟體通常放置於那個目錄下**，所以希望獨立的軟體開發商、作業系統製作者、以及想要維護系統的使用者，都能夠遵循FHS的標準。
- FHS 針對目錄樹架構僅定義出 **三層目錄底下應該放置什麼資料**，分別是下列三個：
  - **/(root, 根目錄)：** 與開機系統有關
  - **/usr(unix software resouce)：** 與軟體安裝/執行有關
  - **/var(variable)：** 與系統運作過程有關
- FHS 會要求目錄下**必須**要有什麼檔案、**建議**可以有什麼檔案，當然也有 FHS 沒有規範，但也很**重要**的目錄。
  
![/image/sample.webp ](https://i.ytimg.com/vi/42iQKuQodW4/maxresdefault.jpg)
參考資料：</br>
[【Linux】 檔案目錄結構筆記](https://watson050308.medium.com/linux-%E6%AA%94%E6%A1%88%E7%9B%AE%E9%8C%84%E7%B5%90%E6%A7%8B-5f9f6e7efeca)</br>
[Linux Directories Explained in 100 Seconds](https://www.youtube.com/watch?v=42iQKuQodW4)

### /etc 是什麼的縮寫？這裡通常都放哪些檔案？
- "et cetera" or "editable text config"
- **系統主要的設定檔幾乎都放置在這個目錄內**，例如人員的帳號密碼、系統的主要設定、各種服務的起始檔等等。
- 一般來說，這個目錄下的各檔案屬性是可以讓一般使用者查閱的， 但是只有root有權力修改。

### /var 這裡通常都放哪些檔案？
- /var目錄主要針對**常態性變動的檔案**，包括**快取(cache)、登錄檔(log file)** 以及某些軟體運作所產生的檔案，包括**程序檔案(lock file, run file)**，或者例如**MySQL資料庫的檔案**等等。
- /var在系統運作後才會漸漸佔用硬碟容量

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
  
