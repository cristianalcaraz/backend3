import { Router } from 'express';
import MaterialController from '../controllers/materials.js';  

const app = Router();


app.use('/materials', MaterialController);

export default app; 
