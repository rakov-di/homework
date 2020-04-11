const axios = require('axios');

axios.default.post('http://localhost:5000/api/settings', {
  "repoName": "https://github.com/rakov-di/homework_async",
  "buildCommand": "npm run build",
  "mainBranch": "master",
  "period": 667
}).then();
