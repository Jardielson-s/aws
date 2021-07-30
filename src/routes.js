const express = require('express');
const multer = require('./middleware/Multer');

const route = express();

const  ControllersUsers = require('./controllers/ControllersUsers');
const  ControllersUploads = require('./controllers/ControllersUploads');
const auth = require('./middleware/Authorization');


route.get('/search', auth.authenticate, ControllersUploads.search);
route.post('/create', multer.single('avatar'), ControllersUsers.post);
route.post('/recoverUser', ControllersUsers.recoverUser);
route.get('/recoverUpload/:id',auth.authenticate, ControllersUploads.recoverUpload);
route.get('/trash', auth.authenticate, ControllersUploads.trash);
route.post('/login', ControllersUsers.login);
route.post('/uploads', auth.authenticate, multer.single('avatar'), ControllersUploads.uploadFile);
route.delete('/delete/:id', auth.authenticate, ControllersUploads.delete);
route.delete('/deleteUser', auth.authenticate, ControllersUsers.deleteUser);
route.delete('/deleteForceUpload/:id', auth.authenticate, ControllersUploads.deleteForceUpload);
route.post('/update',auth.authenticate, multer.single('avatar'), ControllersUsers.update);
route.get('/list', auth.authenticate,ControllersUploads.list);


module.exports = route;