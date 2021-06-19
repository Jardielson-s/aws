require('dotenv').config();
const morgan = require('morgan');
const  cors = require('cors');
const express = require('express');
const router = require('./routes');

const server =  express();

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use('/static',express.static(__dirname + '/public'));
server.use(router);


server.listen(process.env.PORT || 3000,()=>{
    console.log('runnig in port ', process.env.PORT || 3000);
})