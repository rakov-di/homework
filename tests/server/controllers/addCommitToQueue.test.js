const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');
const git = require('../../../server/utils/git');

const { addCommitToQueue } = require('../../../server/controllers/controllers');

let res = {};
let req = {};

describe('Постановка билда в очередь', () => {
  stub(git, 'getCommitInfo').returns(Promise.resolve('[@] Косметические правки в README===Dmitry Rakov'));

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

  describe('Запрос успешен. Билд добавлен в очередь', () => {
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

  describe('Запрос завершился с ошибкой', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axiosAPI);

      mock.onPost('/build/request').reply(500);
    });

    it('Возвращается верный код ошибки', async () => {
      await addCommitToQueue(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
    });
  });

});
