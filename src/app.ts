// app.ts
import express, { Request, Response, Application } from 'express';
import initMongo from './configs/mongoConnection';
import 'dotenv/config';
import cors, { CorsOptions } from 'cors';
import { router } from "./routers/index";

// Init express
const app: Application = express();

// Init MongoDB
initMongo();

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// cors settings
const corsOptions: CorsOptions = {
  origin: "*",
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))

// load router
for (const route of router) {
    app.use(route.getRouter());
}

app.listen(app.get('port'))











