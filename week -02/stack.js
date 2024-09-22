// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
  // TODO: # 有特別的意思嗎？請以註解回覆。
  #items;
  // 透過 # 來聲明私有變數，解決了 JavaScript 的 Class 無法使用 private 的痛點

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素i
  push(element) {
    // TODO
    return this.#items.push(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
    // TODO
    if (this.isEmpty()) {
      throw new Error("Cannot pop from an empty stack"); //考量到空堆疊的情況，沒有元素可以pop
    }
    return this.#items.pop();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    // TODO
    if (this.isEmpty()) {
      throw new Error("Cannot peek from an empty stack"); //考量到空堆疊的情況，沒有元素可以peek
    }
    return this.#items[this.#items.length - 1];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    // TODO
    return this.#items.length === 0; //這裡用嚴格等於強制要求兩個值在「類型」上也必須一致，例如：都要是數字
  }

  // 回傳 stack 中元素的個數
  size() {
    // TODO
    return this.#items.length;
  }

  // 清空 stack
  clear() {
    // TODO
    this.#items = [];
  }

  // 印出 stack 內容
  print() {
    // TODO
    if (this.#items.length === 0) return console.log("It's an empty stack!"); //考慮到空堆疊，如果不加這個會印出undefined
    console.log(this.#items);
  }
}
