const server = require('./index');



server.listen(process.env.PORT || 3000,()=>{
    console.log('runnig in port ', process.env.PORT || 3000);
});