// 1. 請以 JavaScript 的 array 函式完成 sum 函式，也就是程式碼中不可以出現 for, while 等迴圈程式
function sum(arr) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(sum([1, 5, 3, 2])); // 11


// 1.1 reduce 是這樣運作的
const arr = [1, 2, 3, 4, 5];
const reduceArr = arr.reduce((accumulator, currentValue) => {
  console.log(accumulator); // 1, 3, 6, 10
  console.log(currentValue); // 2, 3, 4, 5
  return accumulator + currentValue
});
// 由此可知 accumulator 是從 1 開始接收 currentValue 的值並開始累計，而 currentValue 是從 2 開始 loop

// 1.2 reduce還可以合併陣列
const arr = [['a', 'b'], ['c', 'd'], ['e', 'f']];
const reduceArr = arr.reduce((accumulator, currentValue) => {
  return accumulator.concat(currentValue);
}, []); // 預設值為空陣列
console.log(reduceArr); // ['a', 'b', 'c', 'd', 'e', 'f'];

//挑戰題1:有幾種寫法？
//2種，第一種是上面用reduce，第二種是用遞迴搭配slice()
function sum(ary) {
  if (ary.length === 0) {
    return 0; // 基礎情況：當陣列為空時，回傳 0
  }
  return ary[0] + sum(ary.slice(1)); // 每一次都先擷取第一項之後，再用slice()剔除第一項，直到陣列變為空陣列 []，符合基礎情況 (base case)，然後回傳 0
}

console.log(sum([1, 5, 3, 2])); // 11

//slice是這樣運作的
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]
// slice(2,4) 提取了陣列中第三個元素至第四個元素前為止來拷貝

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]


//挑戰題2: 如果 sum 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
//用上底加下底乘高除以二
function sum(n) {
  return (n * (n + 1)) / 2;
}

console.log(sum(4)); // 10 (1 + 2 + 3 + 4)
