require("dotenv").config();

const cookieParser = require('cookie-parser');
const cors = require("cors");
const { createServer } = require("http");
const express = require('express');
const logger = require('morgan');
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const httpServer = createServer(app);
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: process.env["CLIENT_URL"],
  }
});

const commentsSocket = require("./socket");
const onConnection = (socket) => {
  commentsSocket(io, socket);
}
io.on("connection", onConnection);
httpServer.listen( process.env["SOCKET_PORT"]);

module.exports = app;
