import express, { Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { corsOptions } from "./corsConfig.js";
import cors from 'cors'
import helmet from "helmet";
import dotenv from 'dotenv';
import { ServerType } from "../index.js";
import { AppRouter } from "../routes/routes.js";

dotenv.config()

class AppConfig {
  private PORT = process.env.PORT || 5000;
  private server: ServerType;
  private router = new AppRouter().router
  private mongoUrl = process.env.MONGO_URL as string;

  constructor(app: Application, server: ServerType) {
    try{
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true
      } as ConnectOptions)
    }
    catch(error){
      console.log(error)
    }
    this.server = server;
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public'));
    app.use(helmet());
    
    app.use('/api/v1', this.router)

    this.mongoConnect()

    app.all('*', (req: Request, res: Response) => {
      res.status(200).json({status: true, message: 'Resource not found'})
    })
  }

  private mongoConnect() {
    mongoose.connection.once('open', () => {
      console.log('DB connected!!')
      this.server.listen(this.PORT, () => console.log('server running on port: ' + this.PORT))
    })
    
    mongoose.connection.on('error', () => {
      console.log('Error connecting to Mongoose')
    })
  }
}

export default AppConfig