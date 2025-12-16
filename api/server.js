import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import patientsRouter from './routes/api/patients.js'
import cors from 'cors'
import registerRouter from "./routes/register.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json())
app.use(cors())



app.use('/register', registerRouter)
app.use('/patients', patientsRouter);


dotenv.config();

app.use(express.static(path.join(__dirname, "client", "src")));





app.listen(PORT, () => {
  console.log(`Server Ruining on ${PORT}`);
});
