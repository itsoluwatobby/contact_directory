import express from "express";
import http from "http";
import AppConfig from "./config/appConfig.js";
const app = express()

const server = http.createServer(app)
export type ServerType = typeof server

new AppConfig(app, server)