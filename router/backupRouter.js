import express from 'express';
const backupRouter = express.Router();
import sendBackup from '../controller/sendBackup.js'
import sendDailyBackup from '../controller/sendDailyBackup.js'

//! For Backup Requests Route
backupRouter.post('/send', sendBackup);

//! For Backup Requests Route
backupRouter.post('/send/daily', sendDailyBackup);

export default backupRouter;