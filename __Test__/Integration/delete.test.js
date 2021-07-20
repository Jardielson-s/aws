const supertest = require('supertest');
const app = require('../../src/index');
const faker = require('faker');
const factory = require('factory-girl').factory;
const { User, Upload } = require('../../src/app/models');



const filePath = `/home/jardielson/exerciciosDeNodejs/aws/images/imageOfStruct.png`;
// foreing key of upload in create roueter
let UserId = 0

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
    //console.log(upload)
    UserId = upload.body.data.id
    return user;
}

const user = createUserInModel();



describe('testing delete router', () => {


    it('delete file with id', async () =>{

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
              .attach('avatar', filePath)
               
             
               let responseDelete = await supertest(app)
               .delete(`/delete/${UserId}`)
               .set('x-access-token', response.body.token)

                responseDelete = await supertest(app)
               .delete(`/delete/${responseUpload.body.response.id}`)
               .set('x-access-token', response.body.token)
      
               
            
               expect(responseDelete.status).toBe(200);
               expect(responseDelete.body.message).toEqual('deleted is success')
               expect(responseDelete.ok).toBeTruthy()
               
  
          });

    });


    it('delete file with id not exist in the table',async () =>{

          user.then(async user =>{

            const response = await supertest(app)
              .post('/login')
              .send({
                  email: user.email,
                  password: user.password
              });
          
               
             
            

               const responseDelete = await supertest(app)
               .delete(`/delete/14`)
               .set('x-access-token', response.body.token)
      
    
            
               expect(responseDelete.status).toBe(400);
               expect(responseDelete.body.message).toEqual('could not delete the file')
               expect(responseDelete.ok).toBeFalsy()
               
               
  
          });

    });
});