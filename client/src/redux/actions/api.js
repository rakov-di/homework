import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 50000
});

export const api = {
  async getSettings() {
    return await axiosAPI.get('/settings')
  },

  async updateSettings(data) {
    return await axiosAPI.post('/settings', {
      repoName: data.repoName,
      buildCommand: data.buildCommand,
      mainBranch: data.mainBranch,
      period: Number(data.period)
    })
  },

  async addCommitToQueue(commitHash) {
    return await axiosAPI.post(`/builds/${commitHash}`)
  },

  async getBuildsList() {
    return await axiosAPI.get('/builds')
  },

  async getBuildDetails(buildId) {
    return await axiosAPI.get(`/builds/${buildId}`)
  },

  async getBuildLog(buildId) {
    return await axiosAPI.get(`/builds/${buildId}/logs`)
  },

};
