require('dotenv').config();
const express = require('express');
const  cors = require('cors');


const server = express();
server.use(cors());
server.use(express.json());


server.get('/',(req,res)=>{

return res.json({message:' hello' });
});


server.listen(process.env.PORT || 3000,()=>{
    console.log('runnig in port ', process.env.PORT || 3000);
})