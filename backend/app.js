const express = require("express");
const app = express();
const dotenv = require("dotenv");

// 載入 .env 檔案中的變數
dotenv.config();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
