//@ts-check
'use-strict';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import Path from 'path';
import BodyParser from 'body-parser';
import * as Routes from "./src/routes"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body parser middleware
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.text({ limit: '50mb' }));

//routes
app.use(express.static(Path.join(__dirname, 'public')));
Routes.register(app);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});