const express = require('express');
const multer = require('./middleware/Multer');

const route = express();

const Controllers = require('./controllers/Controllers');
const auth = require('./middleware/Authorization');


route.get('/search', auth.authenticate, Controllers.search);
route.post('/create', multer.single('avatar'), Controllers.post);
route.post('/recoverUser', Controllers.recoverUser);
route.get('/recoverUpload/:id',auth.authenticate, Controllers.recoverUpload);
route.get('/trash', auth.authenticate, Controllers.trash);
route.post('/login', Controllers.login);
route.post('/uploads', auth.authenticate, multer.single('avatar'), Controllers.uploadFile);
route.delete('/delete/:id', auth.authenticate, Controllers.delete);
route.delete('/deleteUser', auth.authenticate, Controllers.deleteUser);
route.delete('/deleteForceUpload/:id', auth.authenticate, Controllers.deleteForceUpload);
route.post('/update',auth.authenticate, multer.single('avatar'), Controllers.update);
route.get('/list', auth.authenticate,Controllers.list);


module.exports = route;