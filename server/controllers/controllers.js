const fs = require('fs');

const { api } = require('../externalAPI/api');
const { cloneRepo, updateRepoStory, getCommitInfo } = require('../utils/git');
const buildLogs = require('../utils/buildLogs');

const controllers = {
  // Получение сохраненных настроек репозитория
  async getSettings(req, res, next) {
    api.getSettings()
      .then((response) => {
        res.json({
          status: 'success',
          message: `Getting settings for current repo ${req.body.repoName} successfully finished`,
          data: response.data.data || response.data
        });
      })
      .catch(() => {
        res.json({
          status: 'error',
          message: `Getting settings for current repo has failed`
        });
        // next(error);
      });
  },

  // Сохранение (Добавление или обновление) настроек репозитория
  // При это происходит клонирование репозитория на локальную машину
  // При повторном вызове - папка со старым репозиторием удаляется
  // и создается такая же папка, но уже с новым репозиторием
  // При этом возникает ошибка - надо разбираться
  async updateSettings(req, res, next) {
    cloneRepo(req.body.repoName)
      .then(() => {
        api.updateSettings(req.body)
          .then(() => {
            res.json({
              status: 'success',
              message: `Settings for repo ${req.body.repoName} successfully saved`
            });
          })
          .catch(() => {
            res.json({
              status: 'error',
              message: `Saving settings for repo ${req.body.repoName} has failed`
            });
            // next(error);
          });
      })
      .catch((error) => {
        res.json({
          status: 'error',
          message: error.message
        });
        // next(error);
      })
  },

  // Получения списка сборок
  async getBuildsList(req, res, next) {
    api.getBuildsList()
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        next(error);
      });
  },

  // Добавление сборки в очередь для конкретного коммита
  // По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
  async addCommitToQueue(req, res, next) {
    getCommitInfo(req.params.commitHash)
      .then((data) => {
        const [message, author] = data.toString().trim().split("===");

        api.addCommitToQueue(message, req.params.commitHash, author)
          .then((data) => {
            //TODO  разобраться с data.data.data - что за ад
            res.json({
              status: 'success',
              message: `Commit with hash ${req.params.commitHash} successfully add to build queue`,
              payload: data.data.data
            });
          })
          .catch((error) => {
            res.json({
              status: 'error',
              message: error.message
            });
            // next(error);
          });
      })
      .catch((error) => {
        res.json({
          status: 'error',
          message: error.message
        });
        // next(error);
      });
  },

  // Получение информации о конкретной сборке
  async getBuildDetails(req, res, next) {
    api.getBuildDetails(req.params.buildId)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        next(error);
      });
  },

  // Получение логов конкретной сборки
  async getBuildLog(req, res, next) {
    if (buildLogs.isExist(req.params.buildId)) res.send(buildLogs.get(req.params.buildId));
    else {
      api.getBuildLog(req.params.buildId)
        .then((response) => {
          fs.readFile('testBuildLog.txt', null, (err, contents) => {
            buildLogs.set(req.params.buildId, contents);
            res.send(contents);
          });
          // TODO Заменить вышестоящую заглушка на реальные логи
          // if (!response.data) {
          //   res.send(String(`Лога для сборки ${req.params.buildId} нет`))
          // }
          // else {
          // }
        })
        .catch((error) => {
          console.error('=====' + error);
          if (error.response.status === 500) {
            res.send('Что-то пошло не так. Ошибка 500.');
          }
          else next(error);
        });
    }
  },

  // ========================================
  // Тестовая ручка для обновления локального репозитория (подтягивание последних изменений)
  // Пока не работает
  async updateRepoStory(req, res, next) {
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
  }
};

module.exports = controllers;
