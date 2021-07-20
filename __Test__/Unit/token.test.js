const { compare } = require('bcrypt');
const bcrypt = require('bcrypt');
const generateToken = require('../../src/middleware/Jwt');


    const id = 1
    const token = generateToken.createToken(id);


describe('generate token with jsonwebtoken', () => {
    
    it('test of generate', () => {

         expect(token).toBeTruthy();
    });


    it('test of err in generate', () => {
        const token = generateToken.createToken();

        expect(token).toBeDefined();
   });
});