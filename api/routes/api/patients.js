import express from 'express';
const patientsRouter = express.Router();
import { excelFilesToDB } from '../../controllers/uploadExcelController.js';
import { getAllPatients, getPatientByID } from '../../controllers/PatientsController.js';
import { updateFieldInPatients } from '../../controllers/PatientsController.js';





patientsRouter.post('/', excelFilesToDB).get('/', getAllPatients).post('/updateField' , updateFieldInPatients)
.get("/:id", getPatientByID)


export default patientsRouter;