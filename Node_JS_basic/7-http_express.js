// 7-http_express.js
const express = require('express');
const fs = require('fs');

const DB_PATH = process.argv[2];
const app = express();

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
      students.forEach((cols) => {
        const firstname = cols[0];
        const field = cols[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      });

      resolve({ total: students.length, fields });
    });
  });
}

app.get('/', (_req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', async (_req, res) => {
  res.type('text');
  let body = 'This is the list of our students';
  try {
    const { total, fields } = await readDatabase(DB_PATH);
    body += `\nNumber of students: ${total}`;
    Object.entries(fields).forEach(([field, list]) => {
      body += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
    });
    res.send(body);
  } catch (err) {
    body += `\n${err.message}`;
    res.send(body);
  }
});

app.listen(1245);

module.exports = app;
