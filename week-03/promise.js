//Promise 代表一個可能在未來某個時刻完成的操作，允許你在異步操作完成後執行後續操作，從而避免回調地獄（callback hell）的問題。
//可以使用 .then() 方法來處理成功的結果，並使用 .catch() 方法來捕捉錯誤。

function doJob(job, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
  });
}

let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);

//呼叫 doJob：先 doJob，傳入工作名稱「刷牙」和 1000 毫秒的時間。結束後會返回一個 Promise。
//接著使用 .then() 方法來處理 Promise 的結果。
//當「刷牙」工作完成後，將輸出結果「完成刷牙」並呼叫下一個 doJob，傳入「吃早餐」和 3000 毫秒。以此類推。

doJob("刷牙", 1000)
  .then((result) => {
    console.log(result); // 完成刷牙
    return doJob("吃早餐", 3000);
  })
  .then((result) => {
    console.log(result); // 完成吃早餐
    return doJob("寫功課", 1000);
  })
  .then((result) => {
    console.log(result); // 完成寫功課
    return doJob("吃午餐", 2000);
  })
  .then((result) => {
    console.log(result); // 完成吃午餐
  })
  .catch((error) => {
    console.error("發生錯誤:", error);
  });
//在最後使用 .catch() 方法來捕捉任何可能發生的錯誤。如果在執行任何 doJob 時發生錯誤，則會進入這個 catch 區塊，並print出錯誤訊息。
