import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 50000
});

export const api = {
  async getSettings() {
    return await axiosAPI.get('/settings')
  },

  async updateSettings(data: UpdateSettingsParams) {
    return await axiosAPI.post('/settings', data)
  },

  async addCommitToQueue(commitHash: string) {
    return await axiosAPI.post(`/builds/${commitHash}`)
  },

  async getBuildsList() {
    return await axiosAPI.get('/builds')
  },

  async getBuildDetails(buildId: string) {
    return await axiosAPI.get(`/builds/${buildId}`)
  },

  async getBuildLog(buildId: string) {
    return await axiosAPI.get(`/builds/${buildId}/logs`)
  },

};
