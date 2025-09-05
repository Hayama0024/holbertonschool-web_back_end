// full_server/utils.js
import fs from 'fs';

export default function readDatabase(path) {
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

      // { field: [firstname, ...] }
      const map = {};
      for (const cols of students) {
        const firstname = cols[0];
        const field = cols[3];
        if (!map[field]) map[field] = [];
        map[field].push(firstname);
      }

      resolve(map);
    });
  });
}
