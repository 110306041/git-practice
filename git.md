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

1. 建立git-workshop檔案夾
```
total 0
drwxr-xr-x    3 chenyurou  staff    96  9 14 17:51 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 17:51 ..
drwxr-xr-x    9 chenyurou  staff   288  9 14 17:51 .git
```

2. 新增一個新檔案file.txt
```
total 8
drwxr-xr-x    4 chenyurou  staff   128  9 14 17:57 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 17:57 ..
drwxr-xr-x    9 chenyurou  staff   288  9 14 17:51 .git
-rw-r--r--    1 chenyurou  staff    12  9 14 17:57 file.txt
```

3. 把file,txt從工作目錄加到暫存區，並提交到儲存庫
**git log**
```
commit 549582ab5b4245d8dc9278032eedf1a113a4d949 (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:01:31 2024 +0800

  create file.txt
(END)
```


4. 修改最近一個commit的訊息
**git log**
```
commit 20779b5a3a36daf9956339d5a308f029d22d93bc (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:01:31 2024 +0800

    new commit message
(END)
```


5. 新增了新的檔案hello.txt
**git status**
```
位於分支 master
未追蹤的檔案:
  （使用 "git add <檔案>..." 以包含要提交的內容）
	hello.txt

提交為空，但是存在尚未追蹤的檔案（使用 "git add" 建立追蹤）
```

6. add+commit hello.txt後
**git status**
```
位於分支 master
沒有要提交的檔案，工作區為乾淨狀態
```

7.移除hello.txt
```
total 8
drwxr-xr-x    4 chenyurou  staff   128  9 14 18:12 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 18:12 ..
drwxr-xr-x   12 chenyurou  staff   384  9 14 18:10 .git
-rw-r--r--    1 chenyurou  staff    12  9 14 17:57 file.txt
```

8.最後查看log
**git log**
```
commit d4c3e8b1c576a90616420ce95cd5ab96f02a86a8 (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:10:36 2024 +0800

    create hello.txt

commit 20779b5a3a36daf9956339d5a308f029d22d93bc
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:01:31 2024 +0800

    new commit message
(END)
```

commit message 應該怎麼寫比較好？應該有什麼 style 嗎？
---

我認為commit message不管是寫給**自己**看還是寫給**團隊**看，都應該要有**基本且一致**的格式，以確保未來的自己和大家都能進入狀況<br>
不只是要寫下**做了什麼異動**，更要敘述**為什麼要做這樣的異動**<br>

e.g.
- 不好的commit message:
  - Fix stuff
  - Updated email validation
    
- 好的commit message:
  - Fix broken link in footer<br>The link to the help page was outdated and returning a 404. Updated to point to the correct help page URL.


基於**Conventional Commits**的標準：
<https://www.conventionalcommits.org/en/v1.0.0/>



