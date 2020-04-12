const { expect } = require('chai');
const { stub, createSandbox } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');
const helpers = require('../../../server/utils/helpers');
const buildLogs = require('../../../server/utils/buildLogs');

const { getBuildLog } = require('../../../server/controllers/controllers');

let res = {};
let req = {};
// let sandbox;

describe('\n========== Получения логов билда ==========', () => {
  stub(helpers, 'readFile').returns('Text');
  stub(buildLogs, 'get').returns('Text');
  stub(buildLogs, 'set').returns();

  // before(() => {
  //   stub(buildLogs, 'isExist').returns(false);
  //   // sandbox = createSandbox().stub(buildLogs, 'isExist').returns(false);
  // });
  //
  // after(() => {
  //   buildLogs.isExist.restore(); // Unwraps the spy
  //   // sandbox.restore();
  // });

  beforeEach(() => {
    req = {
      params: {
        buildId: '74ec0a44-2e9b-4590-8ce5-4746449e59c1'
      }
    };
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Запрос успешен. Лог билда получен из апи', () => {
    before(() => {
      stub(buildLogs, 'isExist').returns(false);
      // sandbox = createSandbox().stub(buildLogs, 'isExist').returns(false);
    });

    after(() => {
      buildLogs.isExist.restore(); // Unwraps the spy
      // sandbox.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);
      mock.onGet('/build/log?buildId=74ec0a44-2e9b-4590-8ce5-4746449e59c1').reply(200);
    });

    it('Возвращается верный код ответа', async () => {
      await getBuildLog(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается корректный лог', async () => {
      await getBuildLog(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql('Text');
    });
  });

  describe('Запрос успешен. Лог билда получен из кэша', () => {
    before(() => {
      stub(buildLogs, 'isExist').returns(true);
      // sandbox = createSandbox().stub(buildLogs, 'isExist').returns(false);
    });

    after(() => {
      buildLogs.isExist.restore(); // Unwraps the spy
      // sandbox.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);
      mock.onGet('/build/log?buildId=74ec0a44-2e9b-4590-8ce5-4746449e59c1').reply(200);
    });

    it('Возвращается верный код ответа', async () => {
      await getBuildLog(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается корректный лог', async () => {
      await getBuildLog(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql('Text');
    });
  });

  describe('Запрос завершился с ошибкой', () => {

    before(() => {
      stub(buildLogs, 'isExist').returns(false);
      // sandbox = createSandbox().stub(buildLogs, 'isExist').returns(false);
    });

    after(() => {
      buildLogs.isExist.restore(); // Unwraps the spy
      // sandbox.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onGet('/build/log?buildId=74ec0a44-2e9b-4590-8ce5-4746449e59c1').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await getBuildLog(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });
  });

});
