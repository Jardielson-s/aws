const supertest = require('supertest');
const app = require('../../src/index');
const faker = require('faker');
const factory = require('factory-girl').factory;
const { User, Upload } = require('../../src/app/models');



const filePath = `/home/jardielson/exerciciosDeNodejs/aws/images/imageOfStruct.png`;
const otherFile = `/home/jardielson/Imagens/indice.jpg`

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




describe('testing list router', () => {



        it('testin list files', async () => {


           user.then(async user =>{

                const response = await supertest(app)
                  .post('/login')
                  .send({
                      email: user.email,
                      password: user.password
                  });
              
                   
                 
                  const responseUpload = await supertest(app)
                  .post('/uploads')
                  .set('x-access-token', response.body.token)
                  .attach('avatar', otherFile)
                  
                  const responseList = await supertest(app)
                  .get('/list')
                  .set('x-access-token', response.body.token)


        
                
                   expect(responseList.status).toBe(200);
                   expect(responseList.body).toBeDefined()
                   expect(responseList.ok).toBeTruthy();
                   
              });
    

        });
});