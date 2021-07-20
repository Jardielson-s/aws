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

    const upload = await supertest(app)
    .post('/create')
    .field('name', user.name)
    .field('email', user.email)
    .field('password', user.password)
    .attach('avatar',filePath)
    
    return user;
}

const user = createUserInModel();






describe('testing update router', () => {




    it('updating user with email already exist', async () => {


        await user.then(async user =>{

            const response = await supertest(app)
              .post('/login')
              .send({
                  email: user.email,
                  password: user.password
              });
          
               
             
               let responseUpdate = await supertest(app)
               .post('/update')
               .set('x-access-token', response.body.token)
               .field('email', user.email)
               .field('password', user.password)
               .attach('avatar',filePath)
      
            
               expect(responseUpdate.status).toBe(400);
               expect(responseUpdate.body.message).toEqual('email already exist')
               expect(responseUpdate.ok).toBeFalsy();
          });

    }, 50000);


    it('updating user with new credencials', async () => {


         await user.then(async user =>{

            const response = await supertest(app)
              .post('/login')
              .send({
                  email: user.email,
                  password: user.password
              });
          
               
             
               let responseUpdate = await supertest(app)
               .post('/update')
               .set('x-access-token', response.body.token)
               .field('email', faker.internet.email())
               .field('password', faker.internet.password())
               .attach('avatar',filePath)
      
        
               expect(responseUpdate.status).toBe(200);
               expect(responseUpdate.body.message).toEqual('user updated')
               expect(responseUpdate.ok).toBeTruthy();
          });

    });
})