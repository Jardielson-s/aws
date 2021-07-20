const supertest = require('supertest');
const app = require('../../src/index');
const faker = require('faker');
const factory = require('factory-girl').factory;
const { User } = require('../../src/app/models');



const filePath = `/home/jardielson/exerciciosDeNodejs/aws/images/imageOfStruct.png`;

async function createUserInModel(){
    factory.define('user', User,{
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    const user = await factory.build('user');

    await supertest(app)
    .post('/create')
    .field('name', user.name)
    .field('email', user.email)
    .field('password', user.password)
    .attach('avatar',filePath)

    return user;
}

const user = createUserInModel();

describe('testing login router ', () => {


    it('test validate credentials',async  () =>{
         
        await user.then(async user =>{

            const response = await supertest(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            });
            
             expect(response.status).toBe(200);
             expect(response.body.token).not.toBeNull()
             expect(response.body.findEmail.id).toBeDefined()
        });
    });

    it('test  wrong credentials',async  () =>{
         
      

            const response = await supertest(app)
            .post('/login')
            .send({
                email: faker.internet.email(),
                password: faker.internet.password()
            });
             

             expect(response.status).toBe(400);
             expect(response.body.message).toEqual("email is invalid");
             expect(response.ok).toBeFalsy();
             
      
    });


    it('test  wrong password',async  () =>{
         
      

        await user.then(async user =>{

            const response = await supertest(app)
            .post('/login')
            .send({
                email: user.email,
                password: faker.internet.password()
            });
            
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual("password is invalid");
            expect(response.ok).toBeFalsy();
        });
         
         
  
});





});