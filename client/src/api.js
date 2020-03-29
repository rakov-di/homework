import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
});

export const api = {
  getSettings(cb) {
    return axiosAPI.get('/settings')
      .then(res => {
        cb(res);
        return res;
      })
      .catch(err => console.log(err));
  },

  updateSettings(data, cb) {
    return axiosAPI.post('/settings', {
      repoName: data.repoName,
      buildCommand: data.buildCommand,
      mainBranch: data.mainBranch,
      period: Number(data.period)
    })
      .then(res => {
        cb();
        return res;
      })
      .catch(err => console.log(err));
  }

  // getBuildsList(data) {
  //   return axiosAPI.get('/builds', {
  //     params: {
  //       limit: data
  //     }
  //   })
  //     .then(res => res)
  //     .catch(err => console.log(err));
  // },
  //
  // getDetailsBuild(buildId) {
  //   return axiosAPI.get(`/builds/${buildId}`)
  //     .then(res => res)
  //     .catch(err => console.log(err));
  // },
  //
  // postAddQueue(data) {
  //   return axiosAPI.post(`/builds/${data.commitHash}`, {
  //     commitMessage: data.commitMessage,
  //     branchName: data.branchName,
  //     authorName: data.authorName
  //   })
  //     .then(res => res)
  //     .catch(err => err);
  // },
  //
  // getLogs(buildId) {
  //   return axiosAPI.get(`/builds/${buildId}/logs`)
  //     .then(res => res)
  //     .catch(err => console.log(err));
  // },

};
