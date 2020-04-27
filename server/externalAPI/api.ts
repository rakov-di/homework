import https from 'https';
import axios from 'axios';
// import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'

export const axiosAPI = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + process.env.SHRI_API_KEY
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export type settings = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number
}

// Получение сохраненных настроек репозитория
const getSettings = async () => {
  return await axiosAPI.get('/conf')
};

// Сохранение (Добавление или обновление) настроек репозитория
const updateSettings = async({ repoName, buildCommand, mainBranch, period }: UpdateSettingsParams) => {
  return await axiosAPI.post('/conf', {
    "repoName": repoName,
    "buildCommand": buildCommand,
    "mainBranch": mainBranch || 'master',
    "period": +period
  })
};

// Получения списка сборок
const getBuildsList = async () => {
  return await axiosAPI.get('/build/list')
};

// Добавление сборки в очередь для конкретного коммита
// По полному хэшу коммита определяется полное сообщение, автор. Ветка пока берется по умолчанию
const addCommitToQueue = async (params: AddCommitToQueueParams) => {
  return await axiosAPI.post('/build/request', params)
};

// Получение информации о конкретной сборке
const getBuildDetails = async (buildId: string) => {
  return await axiosAPI.get(`/build/details?buildId=${buildId}`)
};

// Получение логов конкретной сборки
const getBuildLog = async (buildId: string) => {
  return await axiosAPI.get(`/build/log?buildId=${buildId}`)
};

// Удаление текущих настроек (ручка добавлена для тестов)
const deleteSettings = async () => {
  return await axiosAPI.delete(`/conf`)
};

export const api = { 
  getSettings,
  updateSettings,
  getBuildsList,
  addCommitToQueue,
  getBuildDetails,
  getBuildLog,
  deleteSettings
} 
