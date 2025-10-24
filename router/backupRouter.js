import express from 'express';
import sendBackup from '../controller/sendBackup.js'
import sendDailyBackup from '../controller/sendDailyBackup.js'

const backupRouter = express.Router();

//! For Backup Requests Route
backupRouter.post('/send', sendBackup);

//! For Backup Requests Route
backupRouter.post('/send/daily', sendDailyBackup);

export default backupRouter;