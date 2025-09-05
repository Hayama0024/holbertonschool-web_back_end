// 3-read_file_async.js
const fs = require('fs');

function countStudents(path) {
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

      resolve();
    });
  });
}

module.exports = countStudents;
