import express from "express";
import dotenv from "dotenv";
import patientsRouter from './routes/api/patients.js'
import cors from 'cors'
import registerRouter from "./register.js";

dotenv.config();
const app = express();


app.use(express.json())
app.use(cors())


app.use('/', registerRouter)
app.use('/patients', patientsRouter);




export default app;
