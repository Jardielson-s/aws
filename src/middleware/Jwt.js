require('dotenv').config();
const jwt = require('jsonwebtoken');

class Token {

    createToken({ params }){

        return jwt.sign( { params },process.env.SECRET_ENV ,{
            expiresIn: 86500  
        })
    }
}

module.exports = new Token();
