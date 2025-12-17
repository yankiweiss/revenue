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

app.use(express.static(path.join(__dirname, "client", "src")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'src', 'index.js'))
})

app.use('/api/register', registerRouter)
app.use('/patients', patientsRouter);


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
  });
}

export default (req, res) => app(req, res);
