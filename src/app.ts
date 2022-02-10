// app.ts
import express, { Request, Response } from 'express';
import initMongo from './configs/mongoConnection';
​import mongoose from "mongoose";
import dotenv from "dotenv";

// Setup env file
dotenv.config();

// Init express
const app = express();

// Init MongoDB
initMongo(mongoose, process.env.MONGO_URI || "");

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send('The server is working!!!!!!!!');
});

app.listen(app.get('port'))











