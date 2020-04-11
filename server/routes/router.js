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

router.get('/api/settings', getSettings);
router.post('/api/settings', express.json(), updateSettings);

router.get('/api/builds', getBuildsList);
router.post('/api/builds/:commitHash', express.json(), addCommitToQueue);
router.get('/api/builds/:buildId', getBuildDetails);
router.get('/api/builds/:buildId/logs', getBuildLog);

module.exports = { router };
