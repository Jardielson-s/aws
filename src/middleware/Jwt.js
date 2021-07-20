const jwt = require('jsonwebtoken');

class Token {

    createToken(id){

        return jwt.sign({ id },process.env.SECRET_ENV ,{ 
            expiresIn: 860
         })
    }
}

module.exports = new Token();
