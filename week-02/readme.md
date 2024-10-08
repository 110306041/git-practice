# Node.js 環境準備

## 1. 怎麼選擇安裝哪個版本的 Node.js？為什麼？

我選擇安裝 v20.17.0 這個版本，原因有三：

1. 小賴老師有在上課時提到安裝偶數版本比安裝奇數版本來得可靠。根據 [Node.js官方網站 “Node.js Releases”](https://nodejs.org/en/about/previous-releases)，一旦奇數版本發布超過六個月後，將不再修復新的bug，而偶數版本在發布後會有三個月的維護期，並在接下來的兩年內修復所有重要錯誤。

2. 在安裝時看到 v20.17.0 旁邊有括號 (LTS)。  
   - LTS (Long-term support) 是一種軟體產品的生命週期政策，特別適用於開源軟體。  
   - 它延長了軟體的維護期，降低更新風險、成本及中斷時間，並提升軟體的可靠性。  
   - LTS 的版本會在較長時間內持續更新和修補問題，因此使用者不必擔心軟體沒有人維護。若無 LTS 標註，軟體可能在出現問題後無法獲得修正。  
   - 參考來源：[Capdio](https://www.capdio.com/programming-language/%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC%E7%9F%A5%E8%AD%98%E5%BA%AB/%E4%BB%80%E9%BA%BC%E6%98%AF%E8%BB%9F%E9%AB%94%E7%89%88%E7%9A%84-lts/)

3. 經過與組員的協調，我們決定一起下載這個版本的 Node.js，這樣能確保我們在開發過程中不會因版本不一致導致相容性問題。

## 2. nvm 與 npm 分別是什麼？

- **nvm（Node Version Manager）**：是 Node.js 版本管理工具，允許用戶在同一台電腦上安裝和切換多個 Node.js 版本，方便開發者在不同項目中使用不同的 Node.js 版本。

- **npm（Node Package Manager）**：是 Node.js 內建的套件管理工具，用於管理外部 JavaScript 套件。每個套件都有不同版本，npm 幫助我們管理這些版本。

### 統整：

npm 是包管理器，方便開發人員安裝和使用外部套件；nvm 則負責版本管理，讓開發者可以根據需求在不同的 Node.js 版本之間靈活切換。

參考來源：[Stark920](https://stark920.github.io/2022/02/21/nodejsStart/)
