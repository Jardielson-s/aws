const supertest = require('supertest');
const app = require('../../src/index');
const faker = require('faker');
const factory = require('factory-girl').factory;
const { User, Upload } = require('../../src/app/models');



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


describe('testing upload router', () => {

    it('testing send file with token', async() => {


        await user.then(async user =>{

          const response = await supertest(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            });
        
             
    
             const responseUpload = await supertest(app)
             .post('/uploads')
             .set('x-access-token', response.body.token)
             .attach('avatar', filePath)
    
             

             expect(responseUpload.status).toBe(200);
             expect(responseUpload.body.response.path).not.toBeNull()
             expect(responseUpload.body.response.key).toBeDefined()
             expect(responseUpload.body.response.id).toBeDefined()
             expect(response.ok).toBeTruthy()

        });
            
           
        
    }, 50000)


    it('testing send file without token', async () => {


      await user.then(async user =>{

          const response = await supertest(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            });
            
             
             
    
             const responseUpload = await supertest(app)
             .post('/uploads')
             .attach('avatar', filePath)
    
             expect(responseUpload.status).toBe(400);
             expect(responseUpload.ok).toBeFalsy();
             expect(responseUpload.body).toEqual({ auth: false, message: 'no token provide' })
        });
            
           
        
    })
    

});