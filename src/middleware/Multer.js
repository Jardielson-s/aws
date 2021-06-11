require('dotenv').config();
const multer = require('multer');
const path = require('path');
const uploadFolder = path.resolve(__dirname,'../public/images');


const Upload = multer({

    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(req, file, callback){
            const second = new Date().getSeconds().toString();
            const filename = `${second} - ${file.originalname }`

            return callback(null, filename);
        },
    }),
});


module.exports = Upload;