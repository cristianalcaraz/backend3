import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;
mongoose.connect('mongodb+srv://cristianalcaraz:9TBmVJbPBy3QIEJW@coderback.ptzqqzi.mongodb.net/ecommerce').then(()=>{
    console.log('Connected to MongoDB Atlas');
  })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
