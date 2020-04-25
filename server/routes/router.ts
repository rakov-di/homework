import { Router, json } from 'express';
const router = Router();

import { controllers } from '../controllers/controllers';
const { 
    getSettings, 
    updateSettings, 
    getBuildsList, 
    addCommitToQueue, 
    getBuildDetails, 
    getBuildLog 
} = controllers;

router.get('/api/settings', getSettings);
router.post('/api/settings', json(), updateSettings);

router.get('/api/builds', getBuildsList);
router.post('/api/builds/:commitHash', json(), addCommitToQueue);
router.get('/api/builds/:buildId', getBuildDetails);
router.get('/api/builds/:buildId/logs', getBuildLog);

export default router;
