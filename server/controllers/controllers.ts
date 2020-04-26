import { api } from '../externalAPI/api';
import git from '../utils/git';
import buildLogs from '../utils/buildLogs';
import helpers from '../utils/helpers';
import { Request, Response } from 'express';

export const controllers = {
  // Получение сохраненных настроек репозитория
  async getSettings(req: Request, res: Response) {
    try {
      const response: GetSettingResponse = await api.getSettings();

      return res.status(200).json({
        message: `Getting settings for current repo ${req.body.repoName} successfully finished`,
        payload: response.data.data || response.data
      });
    } catch(error) {
      // console.error(`Settings didn't get because of error: ${error.message}`);
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
  async updateSettings(req: Request, res: Response) {
    const settings: UpdateSettingsParams = req.body;
    const { repoName } = req.body;

    try {
      await git.cloneRepo(repoName);

      try {
        await api.updateSettings(settings);

        return res.status(200).json({
          message: `Settings for repo ${repoName} successfully saved`
        });
      } catch(error) {
        console.error(`Settings didn't update because of error: ${error.message}`);
        return res.status(500).json({
          message: `Saving settings for repo ${repoName} has failed`
        });
      }
    } catch (error) {
      console.error(`Repository didn't clone because of error: ${error.message}`);
      res.status(500).json({
        message: error.message
      });
    }
  },

  // Получения списка сборок
  async getBuildsList(req: Request, res: Response) {
    try {
      const response = await api.getBuildsList();

      return res.status(200).json({
        message: 'Build list successfully got',
        payload: response.data.data || response.data
      });
    } catch(error) {
      // console.error(`Build list didn't get because of error: ${error.message}`);
      res.status(500).json({
        message: error.message
      });
    }
  },

  // Добавление сборки в очередь для конкретного коммита
  // По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
  async addCommitToQueue(req: Request, res: Response) {
    try {
      const commitInfo: string = await git.getCommitInfo(req.params.commitHash);
      const [message, author] = commitInfo.toString().trim().split("===");

      try {
        const params: AddCommitToQueueParams = {
          commitMessage: message, 
          commitHash: req.params.commitHash,
          branchName: 'master',
          authorName: author
        }

        const response: AddCommitToQueueResponse = await api.addCommitToQueue(params);

        return res.status(200).json({
          message: `Commit with hash ${req.params.commitHash} successfully add to build queue`,
          payload: response.data.data
        });
      } catch(error) {
        // console.error(`Commit didn't add to build queue because of error: ${error.message}`);
        return res.status(500).json({
          message: error.message
        });
      }
    } catch (error) {
      // console.error(`Repository info didn't get because of error: ${error.message}`);
      return res.status(500).json({
        message: error.message
      });
    }
  },

  // Получение информации о конкретной сборке
  async getBuildDetails(req: Request, res: Response) {
    try {
      const commitHash: string = req.params.buildId;

      const response: BuildDetailsResponse = await api.getBuildDetails(commitHash);
      return res.status(200).json({
        message: `Build details successfully get`,
        payload: response.data.data
      });
    } catch(error) {
      // console.error(`Build details didn't get because of error: ${error.message}`);
      res.status(500).json({
        message: error.message
      })
    }
  },

  // Получение логов конкретной сборки
  async getBuildLog(req: Request, res: Response) {
    const buildId: string = req.params.buildId;

    if (buildLogs.isExist(buildId)) {
      res.status(200).json({
        message: `Build logs successfully got from cache`,
        payload: `${buildLogs.get(buildId)}`
      });
    }
    else {
      try {
        // Заглушка для выдачи логов
        const response = await api.getBuildLog(buildId);

        const contents = await helpers.readFile('testBuildLog.txt');
        buildLogs.set(buildId, contents);
        return res.status(200).json({
          message: `Build details successfully got from api`,
          payload: `${contents}`
        });

      } catch(error) {
        // console.error(`Build details didn't get because of error: ${error.message}`);
        res.status(500).json({
          message: error.message
        });
      }
    }
  },

  // ========================================
  // TODO
  // Тестовая ручка для обновления локального репозитория (подтягивание последних изменений)
  // Пока не работает
  // async updateRepoStory(req: Request, res: Response) {
  //   api.get('/conf')
  //     .then(response => {
  //       return git.updateRepoStory(response.data.data)
  //     })
  //     .then(repo => {
  //       res.status(200).send({
  //         message: `Repository story successfully updated`,
  //         payload: contents
  //       });
  //     })
  //     .catch(error => {
  //       // next(error);
  //       // error.response.status
  // //       console.error(`Repository story didn't update because of error: ${error.message}`);
  //       res.status(500).json({
  //         message: error.message
  //       });
  //     });
  // }
};

// module.exports = controllers;
