const express = require('express');
const multer = require('./middleware/Multer');

const route = express();

const Controllers = require('./controllers/Controllers');
const auth = require('./middleware/Authorization');


route.get('/search', auth.authenticate, Controllers.get);
route.post('/create', multer.single('avatar'), Controllers.post);
route.post('/uploads/:id', multer.single('avatar'), Controllers.uploadFile);
route.post('/login', Controllers.login);
route.delete('/delete',Controllers.delete);
route.path('/update',Controllers.update);



module.exports = route;