// full_server/controllers/StudentsController.js
import readDatabase from '../utils.js';

class StudentsController {
  static async getAllStudents(_req, res) {
    const dbFile = process.argv[2]; // 実行時引数から取得
    try {
      const data = await readDatabase(dbFile);
      // フィールド名を case-insensitive でソート
      const fields = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      const lines = ['This is the list of our students'];
      for (const field of fields) {
        const list = data[field] || [];
        lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      res.status(200).type('text').send(lines.join('\n'));
    } catch (err) {
      res.status(500).type('text').send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).type('text').send('Major parameter must be CS or SWE');
      return;
    }
    const dbFile = process.argv[2];
    try {
      const data = await readDatabase(dbFile);
      const list = data[major] || [];
      res.status(200).type('text').send(`List: ${list.join(', ')}`);
    } catch (err) {
      res.status(500).type('text').send('Cannot load the database');
    }
  }
}

export default StudentsController;
