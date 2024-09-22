// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from "./stack.js";

let stack = new Stack();
stack.print();

stack.push(5);
stack.push(8);
stack.print();

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？

// 檢查top是誰
console.log(stack.peek()); // 8

// pop測試
console.log(stack.pop()); // 會先pop掉最上面的8
stack.print(); // 輸出 [5]，因為stack只剩下5

// 試算size()看有幾個元素
console.log(stack.size()); // 1

// pop測試
console.log(stack.pop()); // 5
try {
  console.log(stack.pop()); // 這邊會拋出錯誤
} catch (error) {
  console.error(error.message); // 顯示error message
}

// 檢查isEmpty()
console.log(stack.isEmpty()); // true

// 清空 stack 測試
stack.push(7);
stack.push(9);
stack.print();
stack.clear();
stack.print(); // 清空堆疊之後會印出空堆疊訊息
