import express from 'express';
const patientsRouter = express.Router();
import { excelFilesToDB } from '../../controllers/uploadExcelController.js';
import { getAllPatients } from '../../controllers/PatientsController.js';
import { updateFieldInPatients } from '../../controllers/PatientsController.js';




patientsRouter.post('/', excelFilesToDB).get('/', getAllPatients).post('/updateField' , updateFieldInPatients)


export default patientsRouter;