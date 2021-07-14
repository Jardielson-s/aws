require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
const uploadFolder = path.resolve(__dirname,'../public/images');
/*
const storage = new aws.S3({
    accessKeyId: process.env.ID_KEY_ACCESS,
    secretAccessKey: process.env.KEY_ACCESS_SECRET,
    region: process.env.REGION_AWS
})
*/
const localTypes = {
    local: multer({

        storage: multer.diskStorage({
            destination: uploadFolder,
            filename(req, file, callback){
                const second = new Date().getSeconds().toString();
                file.key = `${second} - ${file.originalname }`
    
                return callback(null, file.key);
            },
        })
    }),
    S3: multer ({
        storage: multerS3({
         s3: new aws.S3({
             accessKeyId: process.env.ID_KEY_ACCESS,
             secretAccessKey: process.env.KEY_ACCESS_SECRET,
             region: process.env.REGION_AWS
         }),
         bucket: 'uploadsnodejs',
         contentType: multerS3.AUTO_CONTENT_TYPE,
         acl: 'public-read',
         key: (req, file, callback) => {
                const second = new Date().getSeconds().toString();
                const filename = `${second}-${file.originalname }`
     
                return callback(null, filename);
         }
     })
     })
}

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
/*
const UploadMulterS3 = multerS3({

    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(req, file, callback){
            const second = new Date().getSeconds().toString();
            const filename = `${second} - ${file.originalname }`

            return callback(null, filename);
        },
    }),

});
*/

module.exports = localTypes[process.env.TYPE_STORAGE];