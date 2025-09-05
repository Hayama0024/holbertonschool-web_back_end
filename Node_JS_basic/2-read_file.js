// 2-read_file.js
const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 空行を除いたうえでヘッダーを外す
  const [, ...rows] = lines;
  const students = rows
    .map((r) => r.split(','))
    .filter((cols) => cols.length >= 4);

  console.log(`Number of students: ${students.length}`);

  const fields = {};
  students.forEach((cols) => {
    const firstname = cols[0];
    const field = cols[3];
    if (!fields[field]) fields[field] = [];
    fields[field].push(firstname);
  });

  Object.entries(fields).forEach(([field, list]) => {
    console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
  });
}

module.exports = countStudents;
