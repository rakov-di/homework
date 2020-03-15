const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const axios = require('axios');


const { spawn } = require('child_process');

const app = express();

let authorizationToken = getToken();

function getToken() {
  return fs.readFileSync(path.resolve(__dirname, '../../_access/token.txt'), 'utf8', (err, token) => {
    return token;
  });
}

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + authorizationToken
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Функции промежуточной обработки (middleware)

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(function(err, req, res, next) {
  console.error(err);
});

app.get('/api/settings', (req, res, next) => {
  api.get('/conf')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Проверялось с get
app.post('/api/settings', (req, res, next) => {
  console.log('Содержимое' + req.body);
  console.log('repoName' + req.body.repoName);
  console.log('repoName' + req.body.buildCommand);
  console.log('repoName' + req.body.mainBranch);
  console.log('repoName' + req.body.period);
  api.post('/conf', {
    "repoName": req.body.repoName,
    "buildCommand": req.body.buildCommand,
    "mainBranch": req.body.mainBranch,
    "period": +req.body.period
  })
    .then((response) => {
      const gitClone = spawn('git', ['clone', req.body.repoName, './local_repo']);

      gitClone.stdout.on('data', (data) => {
        next(error);
        console.log(`stdout: ${data}`);
      });

      gitClone.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
//
// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
      res.json('Settings have been updated');
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/builds', (req, res, next) => {
  console.log(req.params.buildId + '1');

  api.get('/build/list')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Проверялось с get
app.post('/api/builds1/:commitHash', (req, res, next) => {
  console.log('request' + req.params.commitHash);
  api.post('/build/request', {
      "commitMessage": "[+] Тест",
      "commitHash": req.params.commitHash,
      "branchName": "nodejs",
      "authorName": "Dmitry Rakov"
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/builds/:buildId', (req, res, next) => {
  console.log(req.params.buildId + '2');
  api.get('/build/details?buildId=' + req.params.buildId)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/builds/:buildId/logs', (req, res, next) => {
  console.log(req.params.buildId + '3');
  api.get('/build/log?buildId=' + req.params.buildId)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

app.listen(3000);





