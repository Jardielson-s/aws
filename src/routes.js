const express = require('express');
const multer = require('./middleware/Multer');

const route = express();

const Controllers = require('./controllers/Controllers');
const auth = require('./middleware/Authorization');


route.get('/search', auth.authenticate, Controllers.search);
route.post('/create', multer.single('avatar'), Controllers.post);
route.post('/uploads', auth.authenticate, multer.single('avatar'), Controllers.uploadFile);
route.post('/login', Controllers.login);
route.delete('/delete/:id', auth.authenticate, Controllers.delete);
route.post('/update',auth.authenticate, multer.single('avatar'), Controllers.update);
route.get('/list', auth.authenticate, Controllers.list);




module.exports = route;