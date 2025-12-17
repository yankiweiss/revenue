import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import patientsRouter from './routes/api/patients.js'
import cors from 'cors'
import registerRouter from "./routes/register.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/register', registerRouter)
app.use('/patients', patientsRouter);

app.use(express.static(path.join(__dirname, "client", "src")));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
  });
}

export default (req, res) => app(req, res);
