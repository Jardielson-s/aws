const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.ID_KEY_ACCESS,
    secretAccessKey: process.env.KEY_ACCESS_SECRET,
    region: process.env.REGION_AWS
});



module.exports = s3;