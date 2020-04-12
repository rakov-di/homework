const mocha = require('mocha');
const { expect } = require('chai');
const { stub } = require('sinon');
const { axiosAPI } = require('../../../server/externalAPI/api');
const MockAdapter = require('axios-mock-adapter');

const { getSettings } = require('../../../server/controllers/controllers');

const mock = new MockAdapter(axiosAPI);

describe('Получение настроек текущего репозитория', () => {
  it('Получение настроек из хранилища getSettings', async () => {
    const data = {
      status: 200,
      payload: {
        message: 'Server message',
        "data": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "repoName": "namtyda",
          "buildCommand": "npm run",
          "mainBranch": "master",
          "period": 1
        }
      },
    };
    mock.onGet('https://hw.shri.yandex/api/conf').reply(200, data);
    const res = {};
    // res.status = stub().returns(res);
    // res.send = stub().returns(res);

    getSettings()
      .then(res => expect(res.status).to.equal(200))
      .then(res => expect(res.payload.message).is.exist)
      .then(res => expect(res.payload.data).is.exist)
      .then(res => expect(res.payload.data).to.equal({
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "repoName": "namtyda",
        "buildCommand": "npm run",
        "mainBranch": "master",
        "period": 1})
      )

  });


  // it('Настройки имеются', async () => {
  //   const data = {
  //     status: 200,
  //     data: {
  //       message: "BlaBla",
  //       payload: {
  //         "data": {
  //           "id": "5a581225-4162-4c29-b1f7-56b6c2dcd524",
  //           "repoName": "rakov-di/homework_async",
  //           "buildCommand": "npm run build_prod",
  //           "mainBranch": "master",
  //           "period": 10
  //         }
  //       }
  //     }
  //   };
  //
  //   mock.onGet('https://hw.shri.yandex/api/conf').reply(200, data);
  //   const res = {};
  //   res.status = stub().returns(res);
  //   res.send = stub().returns(res);
  //
  //   await getSettings({}, res);
  //   expect(res.status.firstCall.args[0]).to.equal(200);
  //   expect(res.send.firstCall.args[0]).to.equal({
  //     "id": "5a581225-4162-4c29-b1f7-56b6c2dcd524",
  //     "repoName": "rakov-di/homework_async",
  //     "buildCommand": "npm run build_prod",
  //     "mainBranch": "master",
  //     "period": 10
  //   });
  // });

});
