const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const file = process.argv[2];

  res.set('Content-Type', 'text/plain');
  countStudents(file)
    .then((data) => res.send(`This is the list of our students\n${data}`))
    .catch((err) => res.send(`This is the list of our students\n${err.message}`));
});

app.listen(port, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;