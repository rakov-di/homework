const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');
const git = require('../../../server/utils/git');

const { addCommitToQueue } = require('../../../server/controllers/controllers');

let res = {};
let req = {};
describe('\n========== Постановка билда в очередь ==========', () => {
  beforeEach(() => {
    req = {
      params: {
        commitHash: '1db8ad9fea30dd47571212951eb3f454ba5cfe83'
      }
    };
    res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
  });

  describe('Информация о коммите получена. Билд добавлен в очередь в api', () => {
    before(() => {
      stub(git, 'getCommitInfo').resolves('[@] Косметические правки в README===Dmitry Rakov');
      // stub(git, 'cloneRepo').throws(() => new Error(`Can't find repository rakov-di/homework_async`));
    });

    after(() => {
      git.getCommitInfo.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      const data = {
        "data": {
          "id": "22cd67ec-b5ae-4f00-9161-9274bbad9461",
          "buildNumber": 4,
          "status": "Waiting"
        }
      };
      mock.onPost('/build/request').reply(200, data);
    });

    it('Возвращается верный код ответа', async () => {
      await addCommitToQueue(req, res);

      expect(res.status.firstCall.args[0]).to.equal(200);
    });

    it('Возвращается корректный объект с данными о поставленном в очередь билде', async () => {
      await addCommitToQueue(req, res);

      expect(res.json.firstCall.args[0].payload).is.exist;
      expect(res.json.firstCall.args[0].payload).to.eql({
        "id": "22cd67ec-b5ae-4f00-9161-9274bbad9461",
        "buildNumber": 4,
        "status": "Waiting"
      });
    });
  });

  describe('Информация о коммите получена, но возникла ошибка при запросе к api', () => {
    before(() => {
      stub(git, 'getCommitInfo').resolves('[@] Косметические правки в README===Dmitry Rakov');
    });

    after(() => {
      git.getCommitInfo.restore();
    });

    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onPost('/build/request').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await addCommitToQueue(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });
  });

  describe('Получение информация о коммите завершилось с ошибкой', () => {
    before(() => {
      stub(git, 'getCommitInfo').throws(() => new Error());
    });

    after(() => {
      git.getCommitInfo.restore();
    });

    beforeEach(() => {
      // до запроса не должно дойти. но мокаем на всякий случай
      const mock = new MockAdapter(axiosAPI);
      mock.onPost('/build/request').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await addCommitToQueue(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });
  });

});
