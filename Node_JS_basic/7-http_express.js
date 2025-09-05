// 7-http_express.js
const express = require('express');
const fs = require('fs');

const app = express();
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

      const [, ...rows] = lines; // ヘッダ除去
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

app.get('/', (_req, res) => {
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', async (_req, res) => {
  res.set('Content-Type', 'text/plain; charset=utf-8');

  let body = 'This is the list of our students';
  try {
    const { total, fields } = await readDatabase(DB_PATH);
    body += `\nNumber of students: ${total}`;
    // insertion order を保持（CSVに従い CS → SWE）
    for (const [field, list] of Object.entries(fields)) {
      body += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
    }
  } catch (err) {
    body += `\n${err.message}`;
  }

  res.status(200).send(body);
});

if (require.main === module) {
  app.listen(1245);
}

module.exports = app;
