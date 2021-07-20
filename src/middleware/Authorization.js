const jwt = require('jsonwebtoken');


class Authorization{

    authenticate(req, res, next){
        const token = req.headers['x-access-token']

       
        if(!token)
            return res.status(400).json({ auth:false , message: 'no token provide'});

        jwt.verify(token, process.env.SECRET_ENV, function(err, decode){
            if(err){
                //console.log(err);
                return res.status(400).json({ auth: false, message: 'failed to authenticate token'})
            }
            
            req.user = decode;
            
            next();
        })
    }
}



module.exports = new Authorization();