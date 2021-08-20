const { User } = require('../../src/app/models');
const supertest = require('supertest');
const factory = require('factory-girl').factory;
const faker = require('faker');
const app = require('../../src/index');
const filePath = `/home/jardielson/exerciciosDeNodejs/aws/images/imageOfStruct.png`;
const path = require('path')


// -------------- bulider user ------------------
async function createUser(){
    factory.define('user', User, {
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    const user = await  factory.build('user')

    return user;
}

const user = createUser();

describe('test post router', () => {
   
    /*afterEach(async () =>{
       await User.truncate();
    });*/
  
    it('creation router', async () => {
        
        await  user.then(async user =>{
            const response = await supertest(app).post("/create")
            .field('name', user.name)
            .field('email', user.email)
            .field('password', user.password)
            .attach('avatar',filePath)
             
            // console.log(response)
             expect(response.status).toBe(201);
             expect(response.body.token).not.toBeNull()
             expect(response.body.message).toBe("user created with success");

        })
    });

    it('create user with email already', async () => {
        
         await user.then(async user =>{
            const response = await supertest(app).post("/create")
            .field('name', user.name)
            .field('email', user.email)
            .field('password', user.password)
            .attach('avatar',filePath)
        
            
             expect(response.body.message).toBe("email already exist")
             expect(response.status).toBe(400);
             expect(response.body.token).toBeUndefined()
             
        })
    });
});