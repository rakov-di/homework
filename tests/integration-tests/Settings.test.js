// require('dotenv').config();
var assert = require('assert');
// const { api, axiosAPI } = require('../../server/externalAPI/api');

const testData = {
  repoName: 'rakov-di/nodejs_test',
  repoNameIncorrect: 'rakov-di/nodejs_test123456789',
  buildCommand: 'npm run build_prod',
  mainBranch: 'master',
  period: '100'
};

describe('Страница settings', function() {
  beforeEach(async () => {
    // Почему не работает???
    // await api.deleteSettings();
    // await axiosAPI.delete('/conf')
    // await this.browser.pause(3000);
    // (async () => await api.deleteSettings())();
    // (async () => await axiosAPI.delete('/conf'))();
    // (async () => await this.browser.pause(3000))();
  });

  it('Страница открывается', function() {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .then(function(exist) {
        assert.ok(exist, 'Страницы не загрузилась')
      });
  });

  it('По клику на кнопке "Cancel" происходит переход к странице "build-history"', function() {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .click('.form .btn-big_action_secondary')
      .waitForExist('.page_build-history')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
  });

  it('При заполнении поля repo появляется иконка "Очистить поле"', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .click('#repo')
      .isExisting('.form__field_name_repo .icon_clear')
      .then((exists) => {
        assert.ok(exists, 'Иконка "Очистить поле" не появилась');
      })
  });

  it('При заполнении поля command появляется иконка "Очистить поле"', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .click('#command')
      .isExisting('.form__field_name_command .icon_clear')
      .then((exists) => {
        assert.ok(exists, 'Иконка "Очистить поле" не появилась');
      })
  });

  it('При заполнении поля branch появляется иконка "Очистить поле"', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .click('#branch')
      .isExisting('.form__field_name_branch .icon_clear')
      .then((exists) => {
        assert.ok(exists, 'Иконка "Очистить поле" не появилась');
      })
  });

  // TODO Подумать, как обойтись без хака с написанием/стиранием одного символа
  it('По клику на кнопку Save при незаполненном поле "repo" - оно подсвечивается красным, выдается ошибка', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .clearElement('#repo', '')
      .click('#repo')
      .keys(['f', '\u0008'])
      .clearElement('#command')
      .click('#command')
      .keys([testData.buildCommand])
      .clearElement('#branch')
      .click('#branch')
      .keys([testData.mainBranch])
      .clearElement('#minutes')
      .click('#minutes')
      .keys([testData.period])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form__field_name_repo .input_invalid')
      .isExisting('.form__field_name_repo .input_invalid')
      .waitForExist('.form__field_name_repo .input__error-msg')
      .isExisting('.form__field_name_repo .input__error-msg')
      .then((exists) => {
        assert.ok(exists, 'В пустом поле "repo" НЕ зафиксирована ошибка');
      })
  });

  it('По клику на кнопку Save при незаполненном поле "command" - оно подсвечивается красным, выдается ошибка', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .click('#repo')
      .clearElement('#repo')
      .keys([testData.repoName])
      .clearElement('#command')
      .click('#command')
      .keys(['f', '\u0008'])
      .clearElement('#branch')
      .click('#branch')
      .keys([testData.mainBranch])
      .clearElement('#minutes')
      .click('#minutes')
      .keys([testData.period])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form__field_name_command .input_invalid')
      .isExisting('.form__field_name_command .input_invalid')
      .waitForExist('.form__field_name_command .input__error-msg')
      .isExisting('.form__field_name_command .input__error-msg')
      .then((exists) => {
        assert.ok(exists, 'В пустом поле "command" НЕ зафиксирована ошибка');
      })
  });

  //TODO Посмотреть можно ли написать нормальную маску для НЕ цифр (regExp??)
  it('При попытке ввода в поле "minutes" НЕ числа - оно остается пустым', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .clearElement('#minutes')
      .click('#minutes')
      .keys(['a.,:;/-=_!@#$%^&*()_+'])
      .getValue('#minutes')
      .then(function(value) {
        assert.equal(value, '', 'В поле можно вводить что-то кроме цифр')
      });
  });

  // ?? Возможно, стоит разделить disable/enable на 2 теста
  it('По клику на кнопку Save при всех заполненных полях - кнопки должны дизейблиться, при завершении запроса - энейблиться', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .clearElement('#repo')
      .click('#repo')
      .keys([testData.repoName])
      .clearElement('#command')
      .click('#command')
      .keys([testData.buildCommand])
      .clearElement('#branch')
      .click('#branch')
      .keys([testData.mainBranch])
      .clearElement('#minutes')
      .click('#minutes')
      .keys([testData.period])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form .btn-big_action_primary[disabled]')
      .isExisting('.form .btn-big_action_primary[disabled]')
      .waitForExist('.form .btn-big_action_secondary[disabled]')
      .isExisting('.form .btn-big_action_secondary[disabled]')
      .waitForEnabled('.form .btn-big_action_primary')
      .isEnabled('.form .btn-big_action_primary')
      .waitForEnabled('.form .btn-big_action_secondary')
      .isEnabled('.form .btn-big_action_secondary')
      .then((exists) => {
        assert.ok(exists, 'Кнопки НЕ в состоянии disabled');
      })
  });

  it('При сохранении корректных настроек - выдается сообщение об успешном сохранении', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .clearElement('#repo')
      .click('#repo')
      .keys([testData.repoName])
      .clearElement('#command')
      .click('#command')
      .keys([testData.buildCommand])
      .clearElement('#branch')
      .click('#branch')
      .keys([testData.mainBranch])
      .clearElement('#minutes')
      .click('#minutes')
      .keys([testData.period])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form__success-msg')
      .isExisting('.form__success-msg')
      .then((exists) => {
        assert.ok(exists, 'Сообщение об успешном сохранении настроек не показано');
      })
      .assertView('buildSettings_success', 'body', { screenshotDelay: 10 });

  });

  it('При сохранении НЕкорректных настроек - выдается сообщение о невозможности сохранения', function () {
    return this.browser
      .url('/settings')
      .waitForExist('.page_settings')
      .clearElement('#repo')
      .click('#repo')
      .keys([testData.repoNameIncorrect])
      .clearElement('#command')
      .click('#command')
      .keys([testData.buildCommand])
      .clearElement('#branch')
      .click('#branch')
      .keys([testData.mainBranch])
      .clearElement('#minutes')
      .click('#minutes')
      .keys([testData.period])
      .click('.form .btn-big_action_primary')
      .waitForExist('.form__error-msg')
      .isExisting('.form__error-msg')
      .then((exists) => {
        assert.ok(exists, 'Сообщение о невозможности сохранения настроек не показано');
      })
  });
});
