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

      const [, ...rows] = lines;
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
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    let body = 'This is the list of our students';
    readDatabase(DB_PATH)
      .then(({ total, fields }) => {
        body += `\nNumber of students: ${total}`;
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

  // 仕様では未定義だがプレーンテキストを返す
  res.statusCode = 200;
  res.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;
