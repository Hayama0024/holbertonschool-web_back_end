// 5-http.js
const http = require('http');
const fs = require('fs');

const DB_PATH = process.argv[2];

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const [, ...rows] = lines; // 先頭はヘッダ
      const students = rows
        .map((r) => r.split(','))
        .filter((cols) => cols.length >= 4);

      const fields = {};
      for (const cols of students) {
        const firstname = cols[0];
        const field = cols[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      resolve({ total: students.length, fields });
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    let body = 'This is the list of our students';
    readDatabase(DB_PATH)
      .then(({ total, fields }) => {
        body += `\nNumber of students: ${total}`;
        // 5番では順序要件なし（CSVの出現順でOK：CS → SWE）
        for (const [field, list] of Object.entries(fields)) {
          body += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
        }
        res.end(body);
      })
      .catch((err) => {
        body += `\n${err.message}`;
        res.end(body);
      });
    return;
  }

  // 指定のないエンドポイントはプレーンテキストで固定返答（OK）
  res.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;

