import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jsonfile from 'jsonfile';
import productRouter from './routing/router';

const port: number = 3000;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(productRouter);

app.listen(port, (): void => {
    console.log(`Server is up and running on port:${port}`);
});
