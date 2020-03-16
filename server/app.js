require('dotenv').config()
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const axios = require('axios');
const { spawn } = require('child_process');

const app = express();

const localRepoName = 'local_repo';
let mainBranch;

cloneRepo = (repoName) => {
  return new Promise((resolve, reject) => {
    fs.access(path.resolve(__dirname, localRepoName), (err) => {
      console.log(2);
      if (err && err.code === 'ENOENT') {
        console.log("There is no such folder. You can do git clone");
        const gitClone = spawn(`git clone ${repoName} local_repo`, {shell: true});
        gitClone.stdout.on('data', (data) => {
          console.log(3 + 'a');
          console.log(`stdout: ${data}`);
          resolve();
        });

        gitClone.stderr.on('data', (data) => {
          console.log(3 + ' a error');
          // next(error);
          console.error(`stderr: ${data}`);
          resolve();
        });

        gitClone.on('close', (data) => {
          resolve();
        });
      }
      else {
        console.log('Please, clear folder before git clone');
        console.log(`rm -rf ${localRepoName} && git clone ${repoName} local_repo`);
        const gitRmClone = spawn(`rm -rf ${localRepoName} && git clone ${repoName} local_repo`, {shell: true});
        gitRmClone.stdout.on('data', (data) => {
          console.log(3 + 'b');
          console.log(`stdout: ${data}`);
          resolve();
        });

        gitRmClone.stderr.on('data', (data) => {
          console.log(3 + ' b error');
          // next(error);
          console.error(`stderr: ${data}`);
          resolve();
        });

        gitRmClone.on('close', (data) => {
          resolve();
        });
      }
    })
  });

};

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
//     // next(error);
//     console.error(`stderr: ${data}`);
//   });
// };

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + process.env.SHRI_API_KEY
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
// При повторном вызове - папка со старым репозиторием удаляется
// и создается такая же папка, но уже с новым репозиторием
// При этом возникает ошибка - надо разбираться
app.post('/api/settings', (req, res, next) => {
  api.post('/conf', {
    "repoName": req.body.repoName,
    "buildCommand": req.body.buildCommand,
    "mainBranch": req.body.mainBranch,
    "period": +req.body.period
  })
    .then((response) => {
      console.log(1);
      cloneRepo(req.body.repoName).then(() => {
        console.log(4);
        res.json('Settings have been updated');
      });
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
// По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
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
      if (!response.data) {
        res.send(String('Лога для этой сборки нет'))
      }
      else {
        res.send(response.data);
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Тестовая ручка для обновления локального репозитория (подтягивание последних изменений)
// Пока не работает
app.get('/api/test', (req, res, next) => {
  api.get('/conf')
    .then((response) => {
      const updateRepo = spawn(`cd ${localRepoName} && git checkout ${response.data.data.mainBranch} && git pull`,{shell: true})
      // const changeDir = spawn('cd', ['local_repo']);
      // const gitCheckout = spawn('git', ['checkout', branchName]);
      // const gitFetch = spawn('git', ['pull']);
      //
      // changeDir.stdout.pipe(gitCheckout.stdin);
      // gitCheckout.stdout.pipe(gitFetch.stdin);

      updateRepo.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // res.send(`Репозиторий ${response.data.data.repoName} обновлен`);
      });

      updateRepo.stderr.on('data', (data) => {
        // next(error);
        console.error(`stderr: ${data}`);
      });

      updateRepo.on('close', (data) => {
        console.log('child process exited with data ' + data);
        res.send(String(`Репозиторий ${response.data.data.repoName} обновлен`));
      });
    })
    .catch((error) => {
      next(error);
    });
});

app.listen(3000);





