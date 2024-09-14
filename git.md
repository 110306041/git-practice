名詞解釋
---
blob
: 

tree
: 

commit
: 

branch
: 

head 
: 

在 git repo 操作過程中，.git 檔案夾裡的變化紀錄
---
1. 建立git-workshop檔案夾
,,,
total 0
drwxr-xr-x    3 chenyurou  staff    96  9 14 17:51 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 17:51 ..
drwxr-xr-x    9 chenyurou  staff   288  9 14 17:51 .git
,,,

2. 新增一個新檔案file.txt
,,,
total 8
drwxr-xr-x    4 chenyurou  staff   128  9 14 17:57 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 17:57 ..
drwxr-xr-x    9 chenyurou  staff   288  9 14 17:51 .git
-rw-r--r--    1 chenyurou  staff    12  9 14 17:57 file.txt
,,,

3. 把file,txt從工作目錄加到暫存區，並提交到儲存庫
git log
,,,
commit 549582ab5b4245d8dc9278032eedf1a113a4d949 (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:01:31 2024 +0800

  create file.txt
(END)
,,,

4. 修改最近一個commit的訊息
git log
,,,
commit 20779b5a3a36daf9956339d5a308f029d22d93bc (HEAD -> master)
Author: Chen Yurou <sophia21521@gmail.com>
Date:   Sat Sep 14 18:01:31 2024 +0800

    new commit message
(END)
,,,

5. 新增了新的檔案hello.txt
git status
,,,
位於分支 master
未追蹤的檔案:
  （使用 "git add <檔案>..." 以包含要提交的內容）
	hello.txt

提交為空，但是存在尚未追蹤的檔案（使用 "git add" 建立追蹤）
,,,

6. add+commit hello.txt後
git status
,,,
位於分支 master
沒有要提交的檔案，工作區為乾淨狀態
,,,

7.移除hello.txt
,,,
total 8
drwxr-xr-x    4 chenyurou  staff   128  9 14 18:12 .
drwxr-xr-x+ 110 chenyurou  staff  3520  9 14 18:12 ..
drwxr-xr-x   12 chenyurou  staff   384  9 14 18:10 .git
-rw-r--r--    1 chenyurou  staff    12  9 14 17:57 file.txt
,,,

commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？
---
