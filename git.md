Git物件
---

1. blob: 
- 工作目錄中某個檔案的 "內容"，且只有內容而已
- 當你執行 git add 指令的同時，這些新增檔案的內容就會立刻被寫入成為 blob 物件
- 檔名則是物件內容的雜湊運算結果，沒有任何其他其他資訊(檔案時間、原本的檔名或檔案的其他資訊，都會儲存在其他類型的物件裡 (也就是 tree 物件))
  
2. tree: 
- 這類物件會儲存特定目錄下的所有資訊，包含該目錄下的檔名、對應的 blob 物件名稱、檔案連結(symbolic link) 或其他 tree 物件等等
- 由於 tree 物件可以包含其他 tree 物件，所以瀏覽 tree 物件的方式其實就跟檔案系統中的「資料夾」沒兩樣
- tree 物件這就是在特定版本下某個資料夾的快照(Snapshot)。

3. commit: 
- 用來記錄有哪些 tree 物件包含在版本中
- 一個 commit 物件代表著 Git 的一次提交，記錄著特定提交版本有哪些 tree 物件、以及版本提交的時間、紀錄訊息等等，通常還會記錄上一層的 commit 物件名稱 (只有第一次 commit 的版本沒有上層 commit 物件名稱

4. branch: 
- Branch 是 Git 中指向某個提交的可變指針。
- 每當你在某個 branch 上進行新的提交時，該 branch 會自動指向新的提交。
- 默認的 branch 通常是 main 或 master，但你可以創建多個分支來進行平行開發。分支允許你在不影響主要開發線的情況下進行實驗性更改，後期可以通過合併將變更合併回主要分支。
- Branch 本質上是指向特定提交的名稱標籤，指向該分支最後一次提交的 Commit。

5. head:
- HEAD 是一個特殊的指針，指向當前檢出的 branch 或 commit。
- 換句話說，它表示你當前所在的位置。
- 如果 HEAD 指向某個 branch，那麼你進行的提交會自動更新該 branch 的指針。
- 如果 HEAD 指向某個 commit 而不是 branch，這種情況稱為 "detached HEAD" 狀態，這表示你處於某個特定提交，不在任何分支上。
- 通常，當你進行 checkout 操作時，HEAD 會更新為指向你選擇的 branch 或 commit。


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

commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？
---
我認為commit message不管是寫給**自己**看還是寫給**團隊**看應該都是要有**基本且一致**的格式，以確保未來的自己和大家都能進入狀況
不只是要寫下**做了什麼異動**，更要敘述**為什麼要做這樣的異動**
e.g.
- 不好的commit message:
  - Fix stuff
  - Updated email validation
- 好的commit message:
  - Fix broken link in footer<br>The link to the help page was outdated and returning a 404. Updated to point to the correct help page URL.
  - Add input validation for email field<br>Added validation to ensure the email field contains a valid email format, preventing invalid submissions that caused backend errors.

基於**Conventional Commits**的標準：
<https://www.conventionalcommits.org/en/v1.0.0/>



