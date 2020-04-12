const fs = require('fs');

const { api } = require('../externalAPI/api');
const { cloneRepo, updateRepoStory } = require('../utils/git');
const git = require('../utils/git');
const buildLogs = require('../utils/buildLogs');

const controllers = {
  // Получение сохраненных настроек репозитория
  async getSettings(req, res, next) {
    try {
      const response = await api.getSettings();

      return res.status(200).json({
        message: `Getting settings for current repo ${req.body.repoName} successfully finished`,
        payload: response.data.data || response.data
      });
    } catch(error) {
      console.error(`Settings didn't get because of error: ${error.message}`);
      return res.status(500).json({
        message: `Getting settings for current repo has failed`
      });
    }
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
            res.status(200).json({
              message: `Settings for repo ${req.body.repoName} successfully saved`
            });
          })
          .catch((error) => {
            // next(error);
            console.error(`Settings didn't update because of error: ${error.message}`);
            res.status(500).json({
              message: `Saving settings for repo ${req.body.repoName} has failed`
            });
          });
      })
      .catch((error) => {
        // next(error);
        console.error(`Repository didn't clone because of error: ${error.message}`);
        res.status(500).json({
          message: error.message
        });
      })
  },

  // Получения списка сборок
  async getBuildsList(req, res, next) {
    try {
      const response = await api.getBuildsList();

      return res.status(200).json({
        message: 'Build list successfully got',
        payload: response.data.data || response.data
      });
    } catch(error) {
      console.error(`Build list didn't get because of error: ${error.message}`);
      res.status(500).json({
        message: error.message
      });
    }
  },

  // Добавление сборки в очередь для конкретного коммита
  // По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
  async addCommitToQueue(req, res, next) {
    try {
      const commitInfo = await git.getCommitInfo(req.params.commitHash);
      console.log('FUNC: ', commitInfo);
      const [message, author] = commitInfo.toString().trim().split("===");
      console.log('FUNC: ', message, author);

      try {
        console.log('FUNC: ', 3);
        const response = await api.addCommitToQueue(message, req.params.commitHash, author);
        console.log('FUNC: ', 4);

        return res.status(200).json({
          message: `Commit with hash ${req.params.commitHash} successfully add to build queue`,
          payload: response.data.data
        });
      } catch(error) {
        // next(error);
        console.error(`Commit didn't add to build queue because of error: ${error.message}`);
        return res.status(500).json({
          message: error.message
        });
      }
    } catch (error) {
      // next(error);
      console.error(`Repository info didn't get because of error: ${error.message}`);
      return res.status(500).json({
        message: error.message
      });
    }
  },

  // Получение информации о конкретной сборке
  async getBuildDetails(req, res, next) {
    try {
      const response = await api.getBuildDetails(req.params.buildId);
      return res.status(200).json({
        message: `Build details successfully get`,
        payload: response.data.data
      });
    } catch(error) {
      // next(error);
      console.error(`Build details didn't get because of error: ${error.message}`);
      res.status(500).json({
        message: error.message
      })
    }
  },

  // Получение логов конкретной сборки
  async getBuildLog(req, res, next) {
    if (buildLogs.isExist(req.params.buildId)) {
      res.status(200).send({
        message: `Build details successfully got`,
        payload: `${buildLogs.get(req.params.buildId)}`
      });
    }
    else {
      api.getBuildLog(req.params.buildId)
        .then((response) => {
          fs.readFile('testBuildLog.txt', null, (err, contents) => {
            buildLogs.set(req.params.buildId, contents);
            // res.status(200).send(contents);
            res.status(200).send({
              message: `Build details successfully got`,
              payload: `${contents}`
            });
          });
          // TODO Заменить вышестоящую заглушка на реальные логи
          // if (!response.data) {
          //   res.send(String(`Лога для сборки ${req.params.buildId} нет`))
          // }
          // else {
          // }
        })
        .catch((error) => {
          // next(error);
          console.error(`Build details didn't get because of error: ${error.message}`);
          res.status(500).json({
            message: error.message
          });
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
        res.status(200).send({
          message: `Repository story successfully updated`,
          payload: contents
        });
      })
      .catch(error => {
        // next(error);
        // error.response.status
        console.error(`Repository story didn't update because of error: ${error.message}`);
        res.status(500).json({
          message: error.message
        });
      });
  }
};

module.exports = controllers;
