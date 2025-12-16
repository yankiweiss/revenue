import express from 'express';
const patientsRouter = express.Router();
import { excelFilesToDB } from '../../controllers/uploadExcelController.js';
import { getAllPatients } from '../../controllers/getAllPateins.js';




patientsRouter.post('/', excelFilesToDB).get('/', getAllPatients)


export default patientsRouter;