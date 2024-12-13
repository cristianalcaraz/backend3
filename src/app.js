import express from 'express';
import { addLogger } from './utils/logger.js'
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import mongoose from 'mongoose';
import mainRouter from "./routes/index.js";
import Config from "./config/index.js";
import { connectDb } from "./db/db.js";



//const PORT = Config.PORT || 8080;

app.use(express.json());

app.use("/api", mainRouter);

connectDb().then(() => {
  console.log("DB CONECTADA");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});




app.use(addLogger)
app.get('/', (req, res) => {
  req.logger.warning('Esto es un warn de prueba')
  res.json({ message: 'Probando loggers' })
})

app.listen(8080, () => {
  console.log('Server en 8080')
})

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
app.use(addLogger);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
