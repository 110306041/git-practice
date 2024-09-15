Git物件
---

**1. blob:**
- Binary large object
- Git 將檔案內容轉成二進制，並產生 SHA-1 編號後儲存的物件
- 以 SHA-1 雜湊值作為檔名
- 也就是工作目錄中某個檔案的**內容**，非檔案本身
- 當執行 git add 指令時，這些新增檔案的內容就會立刻被寫入成為 blob 物件
  
**2. tree:**
- 以 SHA-1 雜湊值作為檔名
- tree 物件會儲存**檔案的名稱、目錄的名稱、檔案權限、對應的 blob 物件名稱、檔案連結(symbolic link)等等**
- tree 物件裡不一定只有包著 Blob 物件，同時也可以包含另一個 tree 物件
- tree 物件就是在特定版本下某個資料夾的快照(Snapshot)
- 瀏覽 tree 物件的方式和瀏覽檔案系統中的「資料夾」差不多

**3. commit:**
- 進行commit後會出現的物件
- **紀錄有關每次commit需要有的資訊** (e.g.有哪些 tree 物件包含在版本中、版本提交的時間、紀錄訊息等等)
- 通常還會記錄上一層的 commit 物件名稱 (只有第一次 commit 的版本沒有上層 commit 物件名稱）

**4. branch:**
- 一個**指向某提交的可移動輕量級指標**
- 每當你在某個 branch 上進行新的提交時，該 branch 會自動指向新的提交
- Git 預設分支名稱是 master，隨著不斷地製作提交， master 分支會為你一直指向該分支最後一次提交的 Commit
- 分支允許你在不影響主要開發線的情況下進行實驗性更改，後期可以通過合併將變更合併回主要分支

**5. HEAD:**
- HEAD 是一個指標，指向某一個分支
- 通常可以把 HEAD 當做**目前所在分支**看待
- HEAD 偶爾會發生「沒有指到某個分支」的情況，這個狀態的 HEAD 便稱之「detached HEAD」


在 git repo 操作過程中，.git 檔案夾裡的變化紀錄
---
#### 1：初始化新的 Git 儲存庫
```bash
mkdir git-workshop
cd git-workshop
git init
ls -la .git
```
觀察：
- .git資料夾裡有 Git 儲存庫的核心文件和目錄，如 HEAD、config、refs/ 等等

#### 3：建立新檔案並檢查狀態
```bash
echo "Hello Git" > file.txt
git status
ls -la .git
```
觀察：
- 在git status中看到「尚未暫存以備提交的變更」裡有紅色的「修改：file.txt」
- .git資料夾中並無改變

#### 4：將檔案加入暫存區
```bash
git add file.txt
git status
git ls-files --stage
```
觀察：
- 在git status中看到「要提交的變更」裡有綠色的「修改：file.txt」
- git add 會將檔案加入暫存區，更新 .git/index 檔案
  
#### 5：查看物件目錄變化
```bash
ls -la .git/objects
```
觀察：
- .git/objects 內有一個新建立的目錄
- git add 會建立物件來儲存檔案的 blob
  
#### 6：提交檔案
```bash
git commit -m "Initial commit"
ls -la .git/objects
```
觀察：
- git commit 會在 .git/objects 中建立新的物件（commit object 和一個 tree 物件）
  
#### 7：檢視提交內容
```bash
git log
```
觀察：
- git log 裡可以看到剛才的提交物件
```bash
commit a01b8e741b22aa58f9660c087d38719b3540e969 (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sun Sep 15 11:12:07 2024 +0800

    Initial commit

```

#### 8：建立新分支
```bash
git branch new-feature
ls -la .git/refs/heads
```
觀察：
- 可以看到多了一個新的分支「new-feature」
```bash
total 16
drwxr-xr-x  4 chenyurou  staff  128  9 15 11:16 .
drwxr-xr-x  4 chenyurou  staff  128  9 14 17:51 ..
-rw-r--r--  1 chenyurou  staff   41  9 15 11:12 master
-rw-r--r--  1 chenyurou  staff   41  9 15 11:16 new-feature
```

#### 9：檢查 HEAD 指向
```bash
cat .git/HEAD
git checkout new-feature
cat .git/HEAD
```
觀察：
- 一開始的「ref: refs/heads/master」，切換分支後變成「ref: refs/heads/new-feature」


commit message 應該怎麼寫比較好？應該有什麼 style 嗎？
---

我認為commit message不管是寫給自己看還是寫給團隊看，都應該要有**基本且一致**的格式，以確保未來的自己和大家都能進入狀況<br>
不只是要寫下**做了什麼異動(What)**，更要敘述**為什麼要做這樣的異動(Why)** <br>

e.g.
- 不好的commit message:
  - Fix stuff
  - Updated email validation
    
- 好的commit message:
  - Fix broken link in footer<br>The link to the help page was outdated and returning a 404.<br>Updated to point to the correct help page URL.


基於**Conventional Commits**的標準：
<https://www.conventionalcommits.org/en/v1.0.0/>



