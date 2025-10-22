import express from 'express';
const addStudentsRouter = express.Router();
import addStudents from '../controller/addStudents.js'

//! Generate Route
addStudentsRouter.post('/add', addStudents);

export default addStudentsRouter;