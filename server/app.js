const path = require('path');
const express = require('express');

const app = express();

// Функции промежуточной обработки (middleware)

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/hello', (req, res) => res.json({ message: 'hello' }));
app.get('/bye', (req, res) => res.json({ message: 'bye' }));
//
app.listen(3000);




// const { spawn } = require('child_process');
// const ls = spawn('git', ['hist', '-2']);
//
// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
//
// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });
//
// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
