import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import MONGO from '../config/mongoose';
import routes from './routes'
import mongoose from 'mongoose';
import AppError from './errors/AppError';
const PORT : string|number = process.env.PORT || 3333;

const app = express();

mongoose.connect(MONGO.url, MONGO.options)
.then(result => {
    console.log("CONECTED TO DB");
    
})
.catch(err => {
    console.error(err)
})

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

//app.use(errors());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log('Server started on port '+ PORT);
});
