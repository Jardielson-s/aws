const  { Op }  = require('sequelize');
const bcrypt = require('bcrypt');
const { User, Upload }  = require('../app/models');
const createToken = require('../middleware/Jwt');
const fs = require('fs');
const  s3  = require('../awsConfig/aws');

async function  deleteObjectOfBuck(path, Key){
    if(process.env.TYPE_STORAGE === 'S3'){

        s3.deleteObject({
             Bucket: "uploadsnodejs",
             Key: Key
         }).promise();
     }else{
         
         fs.unlink(path, function(err){
             
        });
     }
}

class Controllers {

    static async  getEmail(email){

        const res = await User.findOne({
            where:{ 
                email: email
            }
        })

        return res;
    }

   static async getUploads(id, idUser){
       
       const response =  await Upload.findOne({ where:{
           [Op.and]:[{  id }, { UserId: idUser }]
       }})
        
       return response;
    }

async search(req,res){
    
    const { name } = req.query;
    
    Upload.findAll({ where: { [Op.and]:[{ name },{ UserId: req.user.id }]}
    })
    .then( response => {

         return res.json({ response });
    })
    .catch(err => {
        //console.log(err);  
        return res.status(500).json( err )
    });
}

async post(req,res){

    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const avatar = req.file;
    
    try
    {

        const findEmail = await Controllers.getEmail(email);
      
        if(!findEmail){

                User.create({
                    name,
                    avatar: avatar.path || avatar.location,
                    email,
                    password: hash
                })
                .then(function(response){

                        const data = Upload.create({
                            name: avatar.originalname,
                            path: avatar.path || avatar.location,
                            UserId: response.id,
                            key: avatar.key
                        })
                        .then(data => {
                            const id = response.id;
                            const token = createToken.createToken(id);

                            return res.status(201).json({ response, token, data});
                        })
                        
                })
                .catch(err => {
                    deleteObjectOfBuck(avatar.path, avatar.key);
                    return res.status(404).json({ error: 'bad request' });

                });
            }else{
                deleteObjectOfBuck(avatar.path, avatar.key);
                res.status(400).json({ message : 'email already exist'});
            }
        }catch(err){
            deleteObjectOfBuck(avatar.path, avatar.key);
            return res.status(500).json({message: 'internal server error'})
        }
}


async login(req, res){

    const { email, password } = req.body;
    
    
    const findEmail = await Controllers.getEmail(email);
    
    if(!findEmail)
        return res.status(400).json({message:'email is invalid'});
    
    const compare =  await bcrypt.compare(password, findEmail.password);
    
    if(!compare)
        return res.status(400).json({message:'password is invalid'});

    const id = findEmail.id;
    const uploads = findEmail.UploadId;
    const token = createToken.createToken({ id });

    return res.status(200).json({ findEmail, token, uploads })

}

async uploadFile(req, res){

    
    const file = req.file;

    if(!file){

        return res.status(400).json({ message: 'provider file'});
    }

    
   const response = await Upload.create({
        name: file.originalname,
        path: file.path || file.location,
        UserId: req.user.id.id,
        key: file.key
    })
    .then(response =>  {
       return res.status(200).json({ response });
    })
    .catch(err => {
        console.log(err)
        deleteObjectOfBuck(file.path, file.key);
        return res.status(500).json({ message: 'server unavaileble'})
    });
    
}


async delete(req,res){

     const idUpload = req.params.id;
     
     const upload =  await Controllers.getUploads(idUpload, req.user.id.id);
    
    try{
    
     Upload.destroy({ where: { id: upload.id }})
     .then(() => {
        deleteObjectOfBuck(upload.path, upload.key);

        return res.status(200).json({message:'deleted is success'});
     })
     
 }catch(err){

    return res.status(400).json({ message: 'could not delete the file'});
}
    
}

async update(req,res){

    const { email, password } = req.body;
    const avatar = req.file;

    try{
       
        const hash = bcrypt.hashSync(password, 10);
       
        const findEmail = await User.findOne({where:{ email }});
        
        if(findEmail){
            deleteObjectOfBuck(avatar.path || avatar.key);

            return res.status(400).json({ message: 'email already exist'});
         }
        const user = await User.update({
            email,
            password: hash,
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
            UserId: req.user.id.id,
            key: avatar.key
        });
        
        return res.status(200).json({ message: 'user updated' });
    }catch(err){
           
            deleteObjectOfBuck(avatar.path, avatar.key);
            res.status(500).json({ message: "can't possible update"})
    }
    
   
}

async list (req, res){


    const files = await Upload.findAll({
        where:{
            UserId: req.user.id.id
        }
    });

    return res.status(200).json( files );
}

}





module.exports = new Controllers();