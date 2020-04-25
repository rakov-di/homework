import https from 'https';
import axios from 'axios';
// import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'

const axiosAPI = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + process.env.SHRI_API_KEY
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});


const api = {
  // Получение сохраненных настроек репозитория
  async getSettings() {
    console.log(process.env);
    console.log(process.env.SHRI_API_KEY);
    return await axiosAPI.get('/conf')
  },

  // Сохранение (Добавление или обновление) настроек репозитория
  async updateSettings({ repoName, buildCommand, mainBranch, period }) {
    return await axiosAPI.post('/conf', {
      "repoName": repoName,
      "buildCommand": buildCommand,
      "mainBranch": mainBranch || 'master',
      "period": +period
    })
  },

  // Получения списка сборок
  async getBuildsList() {
    return await axiosAPI.get('/build/list')
  },

  // Добавление сборки в очередь для конкретного коммита
  // По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
  async addCommitToQueue(message, commitHash, author) {
    return await axiosAPI.post('/build/request', {
      "commitMessage": message,
      "commitHash": commitHash,
      "branchName": "master",
      "authorName": author
    })
  },

// Получение информации о конкретной сборке
  async getBuildDetails(buildId) {
    return await axiosAPI.get(`/build/details?buildId=${buildId}`)
  },

  // Получение логов конкретной сборки
  async getBuildLog(buildId) {
    return await axiosAPI.get(`/build/log?buildId=${buildId}`)
  },

  // Удаление текущих настроек (ручка добавлена для тестов)
  async deleteSettings() {
    return await axiosAPI.delete(`/conf`)
  },
};

module.exports = { api, axiosAPI };
