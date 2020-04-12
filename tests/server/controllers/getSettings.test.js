const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');

const { getSettings } = require('../../../server/controllers/controllers');

let res = {};
let req = {};

describe('\n========== Получение настроек текущего репозитория ==========', () => {
  beforeEach(() => {
    req = {
      body: {
        repoName: 'rakov-di/homework_async'
      }
    };
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Запрос успешен. Настройки есть', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      const data = {
        "data": {
          "id": "5a581225-4162-4c29-b1f7-56b6c2dcd524",
          "repoName": "rakov-di/homework_async",
          "buildCommand": "npm run build_prod",
          "mainBranch": "master",
          "period": 10
        }
      };
      mock.onGet('/conf').reply(200, data);
    });

    it('Возвращается верный код ответа', async () => {
      await getSettings(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается объект с настройками', async () => {
      await getSettings(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql({
        "id": "5a581225-4162-4c29-b1f7-56b6c2dcd524",
        "repoName": "rakov-di/homework_async",
        "buildCommand": "npm run build_prod",
        "mainBranch": "master",
        "period": 10
      });
    });
  });

  describe('Запрос успешен. Настройки пустые', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onGet('/conf').reply(200, {});
    });

    it('Возвращается верный код ответа', async () => {
      await getSettings(req, res);
      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается пустой объект', async () => {
      await getSettings(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql({});
    });
  });

  describe('Запрос завершился с ошибкой', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onGet('/conf').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await getSettings(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });

  });

});
