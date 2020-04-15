// похоже на костыль, но пока так
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../server/.env')});

var assert = require('assert');
const { api } = require('../../server/externalAPI/api');

const testData = {
  correctSettings: {
    repoName: 'rakov-di/nodejs_test',
    buildCommand: 'npm run build_prod',
    mainBranch: 'master',
    period: '100'
  },
  correctCommitHash: '957c0b699fee752fc2ac533e7157945dfe4dbe7f'
};

describe('Страница build-History', function() {
  beforeEach(async () => {
    await api.updateSettings(testData.correctSettings);
  });

  it('Страница открывается', function() {
    return this.browser
      .url('/build-history')
      .waitForExist('.page_build-history')
      .then(function(exist) {
        assert.ok(exist, 'Страницы не загрузилась')
      })
  });

  it('По клику на кнопке "Settings" в Header происходит переход к странице "Settings"', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_settings-before')
      .waitForExist('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
  });

  it('По клику на кнопке "Rebuild" в Header происходит открывается модальное окно', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .then((exists) => {
        assert.ok(exists, 'Модальное окно не открылось');
      })
  });

  it('При заполнении поля commitHash появляется иконка "Очистить поле"', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .isExisting('.modal')
      .click('#commitHash')
      .keys(['something'])
      .waitForExist('.form__field_name_commit-hash .icon_clear')
      .then((exists) => {
        assert.ok(exists, 'Иконка "Очистить поле" не появилась)');
      })
  });

  it('При клике иконке "Очистить поле" оно очищается', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .click('#commitHash')
      .keys(['something'])
      .waitForExist('.form__field_name_commit-hash .icon_clear')
      .click('.form__field_name_commit-hash .icon_clear')
      .getValue('#commitHash')
      .then(function(value) {
        assert.equal(value, '', 'Поле не очищается')
      });
  });

  it('При клике кнопки "Run build" в модальном окне кнопки дизейблятся', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .click('#commitHash')
      .keys(['somethingWrong'])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form .btn-big_action_primary[disabled]')
      .waitForExist('.form .btn-big_action_secondary[disabled]')
      .then((exists) => {
        assert.ok(exists, 'Иконка "Очистить поле" не появилась');
      })
  });

  it('При клике кнопки "Run build" при неверно заполненном поле - кнопки энейблятся обратно', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .click('#commitHash')
      .keys(['somethingWrong'])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form .btn-big_action_primary[disabled]')
      .waitForExist('.form .btn-big_action_secondary[disabled]')
      .isEnabled('.form .btn-big_action_primary')
      .isEnabled('.form .btn-big_action_secondary')
      .then((exists) => {
        assert.ok(exists, 'Ошибка не показывается');
      })
  });

  it('При клике кнопки "Run build" при неверно заполненном поле - показывается ошибка', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .click('#commitHash')
      .keys(['somethingWrong'])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form .btn-big_action_primary[disabled]')
      .waitForExist('.form .btn-big_action_secondary[disabled]')
      .waitForExist('.form__field_name_commit-hash .input_invalid')
      .waitForExist('.form__field_name_commit-hash .input__error-msg')
      .then((exists) => {
        assert.ok(exists, 'Ошибка не показывается');
      })
  });

  it('При клике кнопки "Run build" при верно заполненном поле - происходит переход на страницу деталей билда', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_rebuild-before')
      .waitForExist('.modal')
      .click('#commitHash')
      .keys([testData.correctCommitHash])
      .click('.form .btn-big_action_primary')
      .waitForExist('.page_build-details')
      .then((exists) => {
        assert.ok(exists, 'Переход на страницу деталей билда не произошел');
      })
  });
});
