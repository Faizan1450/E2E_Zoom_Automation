import express from 'express';
import dotenv from 'dotenv';
import "./crons/autoResetPassword.cron.js";
import { globalErrorhandler, notFound } from './middleware/globalErrorHandler.js';
import backupRouter from './router/backupRouter.js';
import addStudentsRouter from './router/addStudentsRouter.js';
import healthCheckRouter from "./router/healthCheckRouter.js"

//! Load the Environment Variable
dotenv.config();
console.log("Working")

//! Create an Express App
const app = express()

//! Set up the middleware
app.use(express.json());

// Warming-up guard: refuse requests until the workbook is ready
app.use(express.urlencoded({ extended: true }));
// Routes
//?Setup the User route
app.use("/", healthCheckRouter);
app.use('/api/v1/backup', backupRouter);
app.use('/api/v1/students', addStudentsRouter);

//! Not Found error handler
app.use(notFound);

//! Global Exception Handler
app.use(globalErrorhandler)

//! Start The Server
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Stated at ${PORT}`)
})