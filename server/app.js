require('dotenv').config();
const path = require('path');
const https = require('https');
const express = require('express');
const axios = require('axios');

const { cloneRepo, updateRepoStory, getCommitInfo } = require('./repo');
const buildLogs = require('./buildLogs');

const app = express();

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
app.use(express.urlencoded()); // TODO Разобраться, почему из postman не отправляется обычный json
app.use(express.static(path.resolve(__dirname, '../build')));
// Error handler
app.use((err, req, res, next) => {
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
  console.log(req.body);
  console.log(req.params);
  api.post('/conf', {
    "repoName": req.body.repoName,
    "buildCommand": req.body.buildCommand,
    "mainBranch": req.body.mainBranch,
    "period": +req.body.period
  })
    .then(() => {
      return cloneRepo(req.body.repoName)
    })
    .then((repoName) => {
      res.json(String(`Настройки сохранены. Репозиторий ${repoName} склонирован.`));
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
  getCommitInfo(req.params.commitHash)
    .then((data) => {
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
    })
    .catch((error) => {
      next(error);
      console.error(error);
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
  if (buildLogs.isExist(req.params.buildId)) res.send(buildLogs.get(req.params.buildId));
  else {
    api.get('/build/log?buildId=' + req.params.buildId)
      .then((response) => {
        if (!response.data) {
          res.send(String(`Лога для сборки ${req.params.buildId} нет`))
        }
        else {
          buildLogs.set(req.params.buildId, response.data);
          res.send(response.data);
        }
      })
      .catch((error) => {
        console.error('=====' + error);
        if (error.response.status === 500) {
          res.send('Что-то пошло не так. Ошибка 500.');
        }
        else next(error);
      });
  }
});

// ========================================
// Тестовая ручка для обновления локального репозитория (подтягивание последних изменений)
// Пока не работает
app.get('/api/test', (req, res, next) => {
  api.get('/conf')
    .then(response => {
      return updateRepoStory(response.data.data)
    })
    .then(repo => {
      res.send(String(`История ветки ${repo.mainBranch} репозитория ${repo.repoName} обновлена`));
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.listen(3000);





