const express = require('express');


const route = express();

const Controllers = require('./controllers/Controllers');



route.get('/list',Controllers.getAll);
route.get('/search', Controllers.get)
route.post('/create',Controllers.post);
route.delete('/delete',Controllers.delete);
route.path('/update',Controllers.update);



module.exports = route;