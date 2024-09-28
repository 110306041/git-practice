```bash
npm install express

added 65 packages, and audited 66 packages in 3s

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

```

## a. 觀察 package.json 的變化

#### package.json 在 install express 前

```json
{
  "name": "cloudnative2024",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/110306041/git-practice.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/110306041/git-practice/issues"
  },
  "homepage": "https://github.com/110306041/git-practice#readme",
  "description": ""
}
```

- package.json 裡記錄了 npm init 時詢問的一連串問題，包括「專案名稱、版本、描述、main、測試命令、git repo、作者、bugs、專案許可證等等資訊。」
- **scripts: 包含了一個 test 腳本，用來做專案的測試。**當執行 npm test 指令時，它會顯示錯誤訊息 "Error: no test specified" 並退出，因為目前還沒定義任何測試。
- **bugs: 提供 URL 讓用戶可以在這個 URL 報告專案的問題或錯誤。** 這通常會連到 GitHub repo 的 Issues 頁面。

#### package.json 在 install express 後

```json
{
  "name": "cloudnative2024",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/110306041/git-practice.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/110306041/git-practice/issues"
  },
  "homepage": "https://github.com/110306041/git-practice#readme",
  "description": "",
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

- 可以看到 package.json 中**新增一個 dependencies 欄位，並在這個欄位裡面加入 express 和他的版本**。

## b. 觀察 node_modules 裡面有什麼

## c. package.json 中的 dependencies 與 devDependencies 分別是什麼

## d. package.json 中的 scripts 這個區塊怎麼用？

## f. Port number 要怎麼以環境變數來設定？

## g. 關於哪些檔案應該要被放上 github repo 這個問題，描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？

## h. 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？

## i. 進階題

## [localhost](http://localhost) 是什麼？

## `curl` 是什麼？查查看怎麼用 curl 來測試網路連線？常用參數有哪些？
