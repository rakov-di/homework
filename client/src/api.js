import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
});

export const api = {
  getSettings(cb) {
    return axiosAPI.get('/settings')
      .then(res => {
        // TODO Разобраться, почему вложеноость data.data (поправить на сервере)
        const data = res.data.data || res.data;
        cb && cb(data);
        return data;
      })
      .catch(err => console.error(err.message));
  },

  updateSettings(data, cb) {
    return axiosAPI.post('/settings', {
      repoName: data.repoName,
      buildCommand: data.buildCommand,
      mainBranch: data.mainBranch,
      period: Number(data.period)
    })
      .then(res => {
        cb && cb();
        return res;
      })
      .catch(err => console.error(err.message));
  },

  addCommitToQueue(commitHash, cb) {
    return axiosAPI.post(`/builds/${commitHash}`)
      .then(res => {
        cb && cb({
          status: 'ok',
          res: res
        });
        return res;
      })
      .catch(err => {
        cb && cb({
          status: 'error',
          err: err
        });
        console.error(err.message);
      });
  },

  getBuildsList(cb) {
    return axiosAPI.get('/builds')
      .then(res => {
        cb && cb(res.data.data);
        return res;
      })
      .catch(err => console.error(err.message));
  },

  getBuildDetails(buildId) {
    return axiosAPI.get(`/builds/${buildId}`)
      .then(res => res)
      .catch(err => console.error(err.message));
  },

  getBuildLog(buildId) {
    return axiosAPI.get(`/builds/${buildId}/logs`)
      .then(res => res)
      .catch(err => console.error(err.message));
  },

};
