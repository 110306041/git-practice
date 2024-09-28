```bash
npm install express

added 65 packages, and audited 66 packages in 3s

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

```

## a. 觀察 package.json 的變化

### package.json 在 install express 前

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

- package.json 裡記錄了 npm init 時詢問的一連串問題，包括「專案名稱、版本、描述、main、測試命令、git repo、作者、bugs、專案許可證」等等資訊。
- **scripts: 包含了一個 test 腳本，用來做專案的測試。** 當執行 npm test 指令時，它會顯示錯誤訊息 "Error: no test specified" 並退出，因為目前還沒定義任何測試。
- **bugs: 提供 URL 讓用戶可以在這個 URL 報告專案的問題或錯誤。** 這通常會連到 GitHub repo 的 Issues 頁面。

### package.json 在 install express 後

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

- 可以看到 package.json 中 **新增一個 dependencies 欄位，並在這個欄位裡面加入 express 和他的版本**。

## b. 觀察 node_modules 裡面有什麼

- 總共有 63 個資料夾
- 都是 **安裝於專案中的各種 npm packages**。這些 packages 是專案依賴的 libraries，每個資料夾代表一個 package。
- 挑選 6 個 Node.js 常見的 package
  1. **express**: 這個套件可以幫助構建網路應用程式的框架。它提供了處理請求、設定路由（決定如何根據 URL 導航到不同的網頁）和管理 middleware（處理在接收請求與發送回應之間的操作）的功能。
  2. **body-parser**: 這個套件專門用來解析進來的 web 請求中的數據（如 JSON 格式的數據），讓開發者可以方便地從 POST 請求中提取出需要的信息。
  3. **cookie**: 這個套件用於管理瀏覽器中的 cookies，允許應用程式保存用戶的偏好設定或是追蹤用戶的狀態。
  4. **debug**: 這個套件用於 printing debugging information，讓用戶能夠輕鬆地查看應用程序運行時的各種數據和狀態。
  5. **mime-types**: 這個工具用來識別和管理文件的 MIME 類型，確保應用程式能正確地處理不同類型的文件。
  6. **http-errors**: 這個套件提供一個簡單的方式來生成常見的 HTTP 錯誤響應，例如 404 或 500 。

## c. package.json 中的 dependencies 與 devDependencies 分別是什麼

### dependencies:

- 應用程式在 **運行** 時需要的套件。例如：前端框架（如 React、Vue）、後端框架（如 Express）等。
- 當其他開發者或生產環境安裝此專案時，這些依賴會被自動安裝。
- 會被遞歸安裝（transitive installation）：如果 A 需要 B，B 需要 C，那麼 C 也會被安裝，因為 B 需要 C 才能正常運作，進而確保 A 也能正常運作。
- 安裝情況：
  1. 執行 npm install 並且當前目錄包含 package.json 時。
  2. 執行 npm install $package 安裝其他套件時。

### devDependencies:

- 只在 **開發或測試階段** 需要的套件，不會在生產環境中使用。例如：測試框架、編譯工具、代碼格式化工具，Webpack、Babel、ESLint、Jest 等。
- 不會被遞歸安裝：當 A 需要 B 時，不會安裝 B 的開發依賴，因為測試或開發 B 並非測試 A 的必要條件。
- 安裝情況：
  1. 預設情況下，執行 npm install 會安裝 devDependencies，但如果使用 --production 標誌或設置環境變數 NODE_ENV=production，則不會安裝 devDependencies。
  2. 執行 npm install "$package" 時，devDependencies 不會被安裝，除非使用 --dev 標誌。

參考資料：[stackoverflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencie)

## d. package.json 中的 scripts 這個區塊怎麼用？

隨著專案的成長，執行程式需要輸入的指令會越來越複雜，scripts 區塊是用來 **定義在 Node.js 項目中可以執行的自動化任務**。這些任務可以是 **編譯、測試、部署、啟動伺服器** 等常見操作。善用 scripts 的功能可以把精力放在寫程式而不是浪費時間在記住、輸入指令上面。

1. 定義腳本

```json
"scripts": {
  "start": "node app.js",
  "build": "webpack --config webpack.config.js",
  "test": "jest"
}
```

- start：啟動伺服器，執行 node app.js。
- build：使用 Webpack 來打包 code。
- test：執行測試，這裡使用 jest 來運行測試套件。

2. 執行腳本

```bash
npm run start
npm run build
npm test

```

## f. Port number 要怎麼以環境變數來設定？

把要監聽的 port number 寫死在程式碼中，這是一種比較不好的做法，可以使用** .env 文件來管理環境變數**，然後通過 **dotenv 模組** 在應用啟動時自動讀取這些變數，就不需要直接去修改 app.js 這個檔案。

1. 安裝 dotenv 套件：
   使用 dotenv 來載入環境變數。首先在 /backend 目錄中安裝 dotenv：

```bash
npm install dotenv
```

2. 在 /backend 資料夾中建立 .env 檔案，並在編輯器中加入：PORT=3000

```bash
touch .env
nano .env
```

3. 更新 app.js，加上 dotenv 的載入，並使用環境變數來設定監聽的 port：

```javascript
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
//如果 .env 中沒有定義 PORT，使用 8080 作為預設
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

4. 測試：
   如果 print "Server is listening on port 3000"就代表有成功設置.env 中的 PORT
   或是使用 http://localhost:3000/ 測試，確定網頁一樣能連上並顯示 "Hello World!"

## g. 哪些檔案應該放上 GitHub repo？

### 應該上傳：

- 應用程式的 Source Code、`package.json` 和 `package-lock.json` 等配置文件。

### 不應該上傳：

- Log files (e.g., `.log`)，因為有可能檔案會超大，而且很多是和應用程式正常運行無關的訊息，僅針對本地環境有用。
- `node_modules` 不需要上傳。執行 npm install 時，npm 會讀取 package.json 中的 dependencies，並自動下載並安裝所有需要的第三方套件，並將它們放在 node_modules 資料夾中。
- `.env` 文件不應該上傳。 .env 文件通常儲存了應用程式運行所需的敏感訊息，例如 API 密鑰、資料庫連接訊息、port 等。

## h. 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？

### 1. **CommonJS (CJS) - `require`**

#### 文件 1: moduleA.js

```javascript
// 導出一個函數
function greet(name) {
  console.log(`Hello, ${name}!`);
}

module.exports = greet;
```

#### 文件 2: `main.js`

````markdown
```javascript
// 導入moduleA
const greet = require("./moduleA");
// 使用導入的函數
greet("Alice"); // 輸出：Hello, Alice!
```
````

### 2. **ECMAScript Modules (ESM) - `import/export`**

#### 文件 1: `moduleB.js`

```javascript
// 導出一個函數
export function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

#### 文件 2: `main.js`

````markdown
```javascript
// 導入moduleB的greet函數
import { greet } from "./moduleB.js";

// 使用導入的函數
greet("Bob"); // 輸出：Hello, Bob!
```
````

#### 主要差異

- 語法：CJS 使用 require 和 module.exports，ESM 使用 import 和 export。
- 加載時間：**CJS 是動態加載**，在運行時根據需要去動態加載模組，當模組被 require()時，Node.js 會停止所有代碼執行，直到該模組完全加載。**ESM 是靜態加載**，在編譯時就可以確定模塊的依賴關係。
- 運行環境：**CJS 主要用於 Node.js**（因為同步模組加載方式會阻塞瀏覽器），**ESM 可以在現代瀏覽器和 Node.js 中使用**。
- 預設導出：**ESM 支援 export default**，允許你明確地標記一個 export 為"預設"，使其導入更為直接和簡潔，但 CJS 沒有內建的預設導出機制，需要透過 module.exports 管理導出較複雜。
- 相容性：**CJS 和 ESM 不能直接互相導入**。即不能直接在 ES6 模塊和 CommonJS 模塊之間進行導入和導出。

#### 主流模組系統

**ESM 是 JavaScript 的官方模組系統，廣泛應用於現代瀏覽器與 Node.js。**

相較於 CJS 的優勢：

- 靜態加載：編譯時即可確定模組依賴，提升性能。
- 非阻塞加載：模組加載過程中不會阻塞 HTML 解析，當瀏覽器遇到 <script type="module"> 標籤時，它可以繼續解析後面的 HTML，而不需要等待模塊加載完成。
- 預設導出：支援 export default，導出模塊的預設內容，導入更簡潔。

參考資料：[【程式語言 - Javascript】 ESM 與 CJS](https://vocus.cc/article/649cc0e0fd89780001a7d34d)

## i. 進階題

## [localhost](http://localhost) 是什麼？

localhost 是一個主機名，指的就是本地主機。在網絡中，每個主機都會被賦予一個 IP 地址。localhost 通常被設定為 IP 地址 127.0.0.1，是本機地址，主要用於測試。

使用場景：當你開發網路應用或服務時，可以通過訪問 http://localhost 或 http://127.0.0.1 在本地端上進行測試。

參考資料：https://wayne-blog.com/

## `curl` 是什麼？查查看怎麼用 curl 來測試網路連線？常用參數有哪些？

`curl` 就是 client 端的 URL 工具，是一個利用 URL 語法在命令列下工作的文件傳輸工具。它支持多種協議，包括 HTTP、HTTPS、FTP 等，用於傳送和接收數據。
開發者通常使用 `curl` 來測試網路服務的連接性，驗證 API，或者進行自動化腳本的網路操作。

### 常用的 `curl` 參數

- `-X`：指定要使用的 HTTP 方法，例如 `GET`、`POST`、`PUT` 等。
- `-H`：添加特定的頭部到 HTTP 請求中。例如: `curl -H "Content-Type: application/json" ...`。
- `-d`：用於發送數據，常見於發送 POST 請求時。例如: `curl -d '{"key":"value"}' ...`。
- `-u`：用於提供認證信息，常用於需要認證的 API 接口。例如: `curl -u username:password ...`。
- `-i`：包括 HTTP 頭信息在內的完整響應輸出。
- `-o`：將輸出保存到文件而非直接輸出到終端。
- `--data-urlencode`：在發送數據前對其進行 URL 編碼。

### 使用 `curl` 測試 HTTP GET 請求

```bash
curl -i http://localhost:3000
```
