import express from 'express';
const registerRouter = express.Router();
import { handleNewUser, handleSingIns, getAllCurrentUsers } from '../controllers/registerController.js';




registerRouter
.get('/',getAllCurrentUsers)

.post('/', handleNewUser)
.post('/login', handleSingIns)



export default registerRouter;