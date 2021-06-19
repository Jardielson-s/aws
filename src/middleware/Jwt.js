const jwt = require('jsonwebtoken');

class Token {

    createToken(id){

        return jwt.sign({ id },process.env.SECRET_ENV ,{ 
            noTimestamp:true, 
            expiresIn: '1h'
         })
    }
}

module.exports = new Token();
