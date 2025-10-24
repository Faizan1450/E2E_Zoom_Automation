import express from 'express';
import { passwordReset } from '../controller/passwordReset.js';

const passwordResetRouter = express.Router();

//! For Backup Requests Route
passwordResetRouter.post('/reset', passwordReset);

export default passwordResetRouter;