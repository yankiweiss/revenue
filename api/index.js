import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import patientsRouter from './routes/api/patients.js'
import cors from 'cors'
import registerRouter from "./routes/register.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;


app.use(express.json())
app.use(cors())




app.use('/api/register', registerRouter)
app.use('/api/patients', patientsRouter);




export default (req, res) => app(req, res);
