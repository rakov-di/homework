const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');
const git = require('../../../server/utils/git');

const { updateSettings } = require('../../../server/controllers/controllers');

let res = {};
let req = {};

describe('\n========== Сохранения настроек репозитория ==========', () => {

  beforeEach(() => {
    req = {
      body: {
        repoName: 'rakov-di/homework_async',
        // buildCommand: 'npm run build_prod',
        // mainBranch: 'master',
        // period: 100
      }
    };
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Репозиторий успешно склонирован. Настройки сохранены в апи', () => {
    before(() => {
      stub(git, 'cloneRepo').resolves();
    });

    after(() => {
      git.cloneRepo.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);
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

  describe('Репозиторий успешно склонирован, но запрос на сохранение настроек в api завершился с ошибкой', () => {
    before(() => {
      stub(git, 'cloneRepo').resolves();
    });

    after(() => {
      git.cloneRepo.restore();
    });

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

  describe('Возникла ошибка при клонировании репозитория', () => {
    before(() => {
      stub(git, 'cloneRepo').throws(() => new Error(`Can't find repository rakov-di/homework_async`));
    });

    after(() => {
      git.cloneRepo.restore();
    });

    beforeEach(() => {
      // до запроса вообще не должно дойти, но все-равно мокаем
      const mock = new MockAdapter(axiosAPI);
      mock.onPost('/conf').reply(200);
    });

    it('Возвращается верный код ошибки', async () => {
      await updateSettings(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });

    it('Возвращается верное сообщение', async () => {
      await updateSettings(req, res);

      expect(res.json.firstCall.args[0].message).is.exist;
      expect(res.json.firstCall.args[0].message).is.equal(`Can't find repository ${req.body.repoName}`);
    });
  });

});
