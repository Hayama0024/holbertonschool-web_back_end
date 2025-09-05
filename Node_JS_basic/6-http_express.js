// 6-http_express.js
const express = require('express');

const app = express();

app.get('/', (_req, res) => {
  // 明示的にプレーンテキスト
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Hello Holberton School!');
});

// チェッカーが require() したときに勝手にリッスンしないようにガード
if (require.main === module) {
  app.listen(1245);
}

module.exports = app;

