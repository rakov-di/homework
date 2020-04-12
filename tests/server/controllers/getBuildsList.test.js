const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const { getBuildsList } = require('../../../server/controllers/controllers');
const MockAdapter = require('axios-mock-adapter');

let res = {};
let req = {};

describe('Получение списка билдов текущего репозитория', () => {
  beforeEach(() => {
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Запрос успешен. Настройки есть', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      const data = {
        "data": [
          {
            "id": "74ec0a44-2e9b-4590-8ce5-4746449e59c1",
            "configurationId": "1f827dc7-e648-47c3-bb86-1dea833a2270",
            "buildNumber": 1,
            "commitMessage": "[@] Косметические правки в README",
            "commitHash": "1db8ad9fea30dd47571212951eb3f454ba5cfe83",
            "branchName": "master",
            "authorName": "Dmitry Rakov",
            "status": "Waiting"
          }
        ]
      };
      mock.onGet('/build/list').reply(200, data);
    });

    it('Возвращается верный код ответа', async () => {
      await getBuildsList(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается объект с настройками', async () => {
      await getBuildsList(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql([
        {
          "id": "74ec0a44-2e9b-4590-8ce5-4746449e59c1",
          "configurationId": "1f827dc7-e648-47c3-bb86-1dea833a2270",
          "buildNumber": 1,
          "commitMessage": "[@] Косметические правки в README",
          "commitHash": "1db8ad9fea30dd47571212951eb3f454ba5cfe83",
          "branchName": "master",
          "authorName": "Dmitry Rakov",
          "status": "Waiting"
        }
      ]);
    });
  });

  describe('Запрос успешен. Настройки пустые', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);
      mock.onGet('/build/list').reply(200, { data: [] });
    });

    it('Возвращается верный код ответа', async () => {
      await getBuildsList(req, res);
      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается пустой массив', async () => {
      await getBuildsList(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql([]);
    });
  });

  describe('Запрос завершился с ошибкой', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);
      mock.onGet('/build/list').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await getBuildsList(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });
  });

});
