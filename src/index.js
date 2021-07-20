require('dotenv').config();
const path = require('path')
const morgan = require('morgan');
const  cors = require('cors');
const express = require('express');
const router = require('./routes');

const server =  express();

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use("/files", express.static(path.resolve(__dirname ,".", "public" , "images")));
server.use(router);

module.exports = server