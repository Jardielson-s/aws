require('dotenv').config();
const  cors = require('cors');
const express = require('express');
const router = require('./routes');

const server =  express();


server.use(cors());
server.use(express.json());

server.use(router);


server.listen(process.env.PORT || 3000,()=>{
    console.log('runnig in port ', process.env.PORT || 3000);
})