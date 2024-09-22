function fib(n) {
  if (n < 2) return n; //注意這邊的n是從0開始，所以0和1都會返回自己
  if (n < 3) return 1; //n = 2的話是1
  else return fib(n - 1) + fib(n - 2); //剩餘的遵循遞迴規則
}

console.log(fib(0)); // 0
console.log(fib(1)); // 1
console.log(fib(5)); // 5
console.log(fib(10)); // 55
