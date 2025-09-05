// 1-stdin.js
process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const name = String(chunk).trim();
    console.log(`Your name is: ${name}`);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
