import express, { Request, Response } from "express";
import http from "http";
import cors from 'cors'
import dotenv from 'dotenv';
import helmet from "helmet";
import { corsOptions } from "./config/corsConfig.js";
import mongoose from "mongoose";
const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static())
app.use(helmet())


app.get('/', (req: Request, res: Response) => {
	res.status(200).json({status: true, message: 'Server up and running'})
})


app.all('*', (req: Request, res: Response) => {
	res.status(200).json({status: true, message: 'Resource not found'})
})


mongoose.connection.once('open', () => {
	server.listen(PORT, () => console.log('server running on port: ' + PORT))
})

mongoose
