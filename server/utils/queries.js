// const axios = require('axios');
//
// axios.default.post('http://localhost:5000/api/settings', {
//   "repoName": "https://github.com/rakov-di/homework_async",
//   "buildCommand": "npm run build",
//   "mainBranch": "master",
//   "period": 667
// }).then();

require('dotenv').config();
const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  getBuildsList,
  addCommitToQueue,
  getBuildDetails,
  getBuildLog
} = require('../controllers/controllers');

const app = express();

// Функции промежуточной обработки (middleware)
app.use(express.json());
app.use(express.urlencoded()); // TODO Разобраться, почему из postman не отправляется обычный json
app.use(express.static(path.resolve(__dirname, '../build')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(router);
// Общий обработчик ошибок - пока не используется, ошибки обрабатываются индивидуально
app.use((err, req, res, next) => {
  console.error(`Server error: ${err.message}`);
  res.status(500).json({
    message: `Server error: ${err.message}`
  });
});


router.get('/api/settings', getSettings);
router.post('/api/settings', express.json(), updateSettings);

router.get('/api/builds', getBuildsList);
router.post('/api/builds/:commitHash', express.json(), addCommitToQueue);
router.get('/api/builds/:buildId', getBuildDetails);
router.get('/api/builds/:buildId/logs', getBuildLog);




const port = 5000;
app.listen(port, err => {
  if (err) console.log(`Server didn't launch because of error: ${err}`);
  else console.log(`Server successfully launched on the port: ${port}`);
});





const https = require('https');
const axios = require('axios');

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
    return await axiosAPI.get('/conf')
  },


  // Удаление текущих настроек (ручка добавлена для тестов)
  async deleteSettings() {
    return await axiosAPI.delete(`/conf`)
  },
};

(async () => {
    try {
      const result = await api.deleteSettings();
      console.log(result);
    } catch(err) {
      console.log(err.message);
    }

    try {
      const result = await api.deleteSettings();
      console.log(result);
    } catch(err) {
      console.log(err.message);
    }
  }
)();
// module.exports = { api, axiosAPI };
