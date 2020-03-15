const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const axios = require('axios');


const { spawn } = require('child_process');

const app = express();

let isRepoExist = false;
const localRepoName = 'local_repo';
let mainBranch;

getToken = () => {
  return fs.readFileSync(path.resolve(__dirname, '../../_access/token.txt'), 'utf8', (err, token) => {
    return token;
  });
};


// const log = spawn(`git show -s --format='%s===%an' 2cd1deef703e8071946608f140ee1091fe89da5d`, {shell: true});
//
// log.stdout.on('data', (data) => {
//   console.log(data.toString().trim().split("==="));
//   // console.log(`stdout: ${data}`);
// });
//
// log.stderr.on('data', (data) => {
//   // next(error);
//   console.error(`stderr: ${data}`);
// });

//
//
//
// gitClone = () => {
//   fs.access(path.resolve(__dirname, localRepoName), (err) => {
//     if (err && err.code === 'ENOENT') {
//     }
//     else {
//     }
//
//   const gitClone = spawn('git', ['clone', req.body.repoName, './local_repo']);
//   const rmDir = spawn('rm', ['-rf', localRepoName]);
//
//   gitClone.stdout.on('data', (data) => {
//     isRepoExist = true;
//     console.log(`stdout: ${data}`);
//   });
//
//   gitClone.stderr.on('data', (data) => {
//     next(error);
//     console.error(`stderr: ${data}`);
//   });
//
//   });
// };
//
// gitFetch = (branchName) => {
//   const changeDir = spawn('cd', ['local_repo']);
//   const gitCheckout = spawn('git', ['checkout', branchName]);
//   const gitFetch = spawn('git', ['pull']);
//
//   changeDir.stdout.pipe(gitCheckout.stdin);
//   gitCheckout.stdout.pipe(gitFetch.stdin);
//
//   gitFetch.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
//
//   gitFetch.stderr.on('data', (data) => {
//     next(error);
//     console.error(`stderr: ${data}`);
//   });
// };

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + getToken()
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

// Получение сохраненных настроек репозитория

app.get('/api/settings', (req, res, next) => {
  api.get('/conf')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Сохранение (Добавление или обновление) настроек репозитория
// При это происходит клонирование репозитория на локальную машину
app.post('/api/settings', (req, res, next) => {
  api.post('/conf', {
    "repoName": req.body.repoName,
    "buildCommand": req.body.buildCommand,
    "mainBranch": req.body.mainBranch,
    "period": +req.body.period
  })
    .then((response) => {
      // gitClone();
      res.json('Settings have been updated');
    })
    .catch((error) => {
      next(error);
    });
});

// Получения списка сборок
app.get('/api/builds', (req, res, next) => {
  api.get('/build/list')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Добавление сборки в очередь для конкретного коммита
// По полному хэшу коммита определяется полное сообщение, автор. Ветка берется по умолчанию
app.post('/api/builds/:commitHash', (req, res, next) => {
  const log = spawn(`git show -s --format='%s===%an' ${req.params.commitHash}`, {shell: true});

  log.stdout.on('data', (data) => {
    const [message, author] = data.toString().trim().split("===");

    api.post('/build/request', {
        "commitMessage": message,
        "commitHash": req.params.commitHash,
        "branchName": "master",
        "authorName": author
      })
      .then(() => {
        res.json({message: message, author: author});
      })
      .catch((error) => {
        next(error);
      });
  });

  log.stderr.on('data', (data) => {
    next(error);
    console.error(`stderr: ${data}`);
  });
});

// Получение информации о конкретной сборке
app.get('/api/builds/:buildId', (req, res, next) => {
  api.get('/build/details?buildId=' + req.params.buildId)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Получение логов конкретной сборки
app.get('/api/builds/:buildId/logs', (req, res, next) => {
  api.get('/build/log?buildId=' + req.params.buildId)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

// Тестовая ручка для обновления локального репозитория (подтягивание последних изменений)
app.get('/api/test', (req, res, next) => {
  api.get('/conf')
    .then((response) => {
      console.log(response.data);
      // gitFetch(response.data.mainBranch);
      res.send(response.data);
    })
    .catch((error) => {
      next(error);
    });
});

app.listen(3000);





