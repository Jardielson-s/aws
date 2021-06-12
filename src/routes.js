const express = require('express');
const multer = require('./middleware/Multer');

const route = express();

const Controllers = require('./controllers/Controllers');
const auth = require('./middleware/Authorization');


route.get('/list',auth.authenticate,Controllers.getAll);
route.get('/search', Controllers.get);
route.post('/create', multer.single('avatar'), Controllers.post);
route.post('/login', Controllers.login);
route.delete('/delete',Controllers.delete);
route.path('/update',Controllers.update);



module.exports = route;