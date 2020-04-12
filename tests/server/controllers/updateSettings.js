const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');
const git = require('../../../server/utils/git');

const { updateSettings } = require('../../../server/controllers/controllers');

let res = {};
let req = {};

describe('Сохранения настроек репозитория', () => {
  stub(git, 'cloneRepo').returns(Promise.resolve());

  beforeEach(() => {
    req = {
      body: {
        repoName: 'rakov-di/homework_async',
        buildCommand: 'npm run build_prod',
        mainBranch: 'master',
        period: 100
      }
    };
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Запрос успешен. Настройки сохранены', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      const data = {
        "data": {
          "id": "22cd67ec-b5ae-4f00-9161-9274bbad9461",
          "buildNumber": 4,
          "status": "Waiting"
        }
      };
      mock.onPost('/conf').reply(200);
    });

    it('Возвращается верный код ответа', async () => {
      await updateSettings(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается верное сообщение', async () => {
      await updateSettings(req, res);

      expect(res.json.firstCall.args[0].message).is.exist;
      expect(res.json.firstCall.args[0].message).is.equal(`Settings for repo ${req.body.repoName} successfully saved`);
    });
  });

  describe('Запрос завершился с ошибкой', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onPost('/conf').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await updateSettings(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });

    it('Возвращается верное сообщение', async () => {
      await updateSettings(req, res);

      expect(res.json.firstCall.args[0].message).is.exist;
      expect(res.json.firstCall.args[0].message).is.equal(`Saving settings for repo ${req.body.repoName} has failed`);
    });
  });

});
