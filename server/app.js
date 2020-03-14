const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

const axios = require('axios');

const app = express();ª

let authorizationToken = getToken();

console.log(authorizationToken);
function getToken() {
  return fs.readFileSync(path.resolve(__dirname, '../../_access/token.txt'), 'utf8', (err, html) => {
    return html;
  });
}

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + authorizationToken
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Функции промежуточной обработки (middleware)

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/api/settings', (req, res) => {
  api.get('/conf')
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error)
    });
});

app.post('/api/settings', (req, res) => {
  api.post('/conf', {
    "repoName": "homework",
    "buildCommand": "npm run build",
    "mainBranch": "master",
    "period": 20
  })
    .then((response) => {
      console.log(response);
      res.json('Settings have been updated');
    })
    .catch((error) => {
      console.error(error)
    });
});

app.get('/api/builds', (req, res) => {
  api.get('/build/list')
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error)
    });
});

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
