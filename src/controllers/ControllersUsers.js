const  { Op }  = require('sequelize');
const bcrypt = require('bcrypt');
const { User, Upload }  = require('../app/models');
const createToken = require('../middleware/Jwt');
const fs = require('fs');
const  s3  = require('../awsConfig/aws');

async function  deleteObjectOfBuck(path, Key){
    if(process.env.TYPE_STORAGE === 's3'){

        s3.deleteObject({
             Bucket: "uploadsnodejs",
             Key: Key
         }).promise();
     }else{
         
         fs.unlink(path, function(err){
             
        });
     }
}

class ControllersUsers {

    static async  getEmail(email){

        const res = await User.findOne({
            where:{ 
                email: email
            }
        })

        return res;
    }

   static async getUploads(id, idUser){
       
       const response =  await Upload.findOne({paranoid: false, where:{
           [Op.and]:[{  id }, { UserId: idUser }]
       }})
        
       return response;
    }



async post(req,res){
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const avatar = req.file;



    const findEmail = await ControllersUsers.getEmail(email).catch(err => console.log(err));
    try{
        if(!avatar){
           
            if(!findEmail){

                User.create({
                    name,
                    avatar: null,
                    email,
                    password: hash
                })
                .then(function(response){
                    
                            const id = response.id;
                            const token = createToken.createToken({ id });

                            return res.status(201).json({ message: "user created with success", token});
                })
                .catch(err => {
                    return res.json({ error: 'bad request' });

                });
            }else{
                return res.json({ message : 'email already exist'});
            }
        }else{
            if(!findEmail){

                User.create({
                    name,
                    avatar: avatar.path || avatar.location,
                    email,
                    password: hash
                })
                .then(function(response){
                    
                     Upload.create({
                            name: avatar.originalname,
                            path: avatar.path || avatar.location,
                            UserId: response.id,
                            key: avatar.key
                        })
                        .then(data => {
                            const id = response.id;
                            const token = createToken.createToken({ id });

                            return res.status(201).json({ message: "user created with success", token});
                        })
                        
                })
                .catch(err => {
                    deleteObjectOfBuck(avatar.path, avatar.key);
                    return res.json({ error: 'bad request' });

                });
            }else{
                deleteObjectOfBuck(avatar.path, avatar.key);
                return res.json({ message : 'email already exist'});
            }
        }
    }catch(err){
            return res.status(500).json({message: 'internal server error'})
    }
    
   /* try{
       
        }catch(err){
           // deleteObjectOfBuck(avatar.path, avatar.key);
            return res.status(500).json({message: 'internal server error'})
        }
        */
}


async login(req, res){

    const { email, password } = req.body;
    
    
    const findEmail = await ControllersUsers.getEmail(email);
    
    if(!findEmail)
        return res.status(400).json({message:'email is invalid'});
    
    const compare =  await bcrypt.compare(password, findEmail.password);
    
    if(!compare)
        return res.status(400).json({message:'password is invalid'});

    const id = findEmail.id;
    const token = createToken.createToken({ id });

    return res.status(200).json({ token })

}



async deleteUser(req, res){
      
    const   id   = req.user.id;
   
    try{
            await User.destroy({
                where:{
                    id
                }
            });

            return res.status(200).json({message:'deleted is success'});
    }catch(err){

        return res.status(500).json({message: 'could not delete the User'})
    }
   
}

async update(req,res){

    const { email, password } = req.body;
    const avatar = req.file;
    
    
    try{
       
        if(email){
            const findEmail = await User.findOne({where:{ email }});
        
             if(findEmail){
              
                 return res.status(400).json({ message: 'email already exist'});
            }

            const user = await User.update({
                email: email,
            }, {
                where: {
                  id: req.user.id
                }  
            })
            
            return res.status(200).json({ message: 'user updated' });
        }else if(password){

           const hash = bcrypt.hashSync(password, 10);

           const user = await User.update({
               password: hash,
           }, {
               where: {
                 id: req.user.id
               }  
           })
           
           return res.status(200).json({ message: 'user updated' });
        }else{
        
            const user = await User.update({
                avatar: avatar.path || avatar.location,
            }, {
                where: {
                  id: req.user.id
                }  
            }).catch(err =>{ 
                deleteObjectOfBuck(avatar.path, avatar.key);
            })

            await Upload.create({
                name: avatar.originalname,
                path: avatar.path || avatar.location,
                UserId: req.user.id,
                key: avatar.key
            });

            return res.status(200).json({ message: 'user updated' });
        }
    }catch(err){
           
            deleteObjectOfBuck(avatar.path, avatar.key);
            res.status(500).json({ message: "can't possible update"})
    }
    
}


async recoverUser(req, res){

    const { email } = req.body;

try{

    
    const user = await User.restore({
        where:{
                email 
        }
    }) ;
   
    return res.status(200).json({message: 'user restored'});
 }catch(err){
     
    return res.status(400).json({ message: 'Unable to recover user' });
 }
}



}





module.exports = new ControllersUsers();