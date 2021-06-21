const  { Op }  = require('sequelize');
const bcrypt = require('bcrypt');
const { User, Upload }  = require('../app/models');
const createToken = require('../middleware/Jwt');
const fs = require('fs');


class Controllers {

    static async  getEmail(email){

        const res = await User.findOne({where:{
            email
        }, include:['UploadId']})
    
        return res.email;
    }

   static async getUploads(id, idUser){
        
       const response =  await Upload.findOne({ where:{
           [Op.and]:[{  id }, { UserId: idUser }]
       }}).catch(err => console.log(err))
        
       return response;
    }

async sarch(req,res){
    
    const { name } = req.query;

    await Upload.findAll({ where: { [Op.and]:[{ name },{ UserId: req.user.id }]}
    })
    .then( response => {
         return res.json({ response });
    })
    .catch(err => {
        console.log(err);  
        return res.status(500).json({ err })
    });
}

async post(req,res){

    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const avatar = req.file;

    try
    {

        const findEmail = await Controllers.getEmail(email);

        if(findEmail){
            console.log(findEmail)
            fs.unlink(avatar.path, function(err){
                if(err)
                  console.log(err)
                })
            res.status(404).json({ message : 'email already exist'});
        }else{
    
                
                const response = await User.create({
                    name,
                    avatar: avatar.path,
                    email,
                    password: hash
                })
                .then(async function(response){

                        const data = Upload.create({
                            name: avatar.originalname,
                            path: avatar.path,
                            UserId: response.id
                        })
                        .then(data => {
                            const id = response.id;
                            const token = createToken.createToken(id);

                            return res.status(201).json({ response, token, data});
                        })
                        
                })
                .catch(err => {
                   
                    fs.unlink(avatar.path);
                    return res.status(400).json({ error: 'bad request' });

                });
            }
        }catch(err){
                fs.unlink(avatar.path, function(err){
                    
                    if(err)
                       console.log(err);

                    console.log('deleted with sucessfull')
                });
                return res.status(500).json({message: 'internal server error'})
            }
}


async login(req, res){

    const { email, password } = req.body;
    
   
    const findEmail = await Controllers.getEmail(email);

    if(!findEmail)
        return res.status(404).json({message:'email is invalid'});
    
    const compare = bcrypt.compare(password, findEmail.email);

    if(!compare)
        return res.status(404).json({message:'password is invalid'});

    const id = findEmail.id;
    const uploads = findEmail.UploadId;
    const token = createToken.createToken({ id });

    return res.status(200).json({ findEmail, token, token })

}

async uploadFile(req, res){

    const id = req.user.id;
    const file = req.file;
    
    if(!file)
        return res.status(404).json({ message: 'provider file'});
    
   const response = await Upload.create({
        name: file.originalname,
        path: file.path,
        UserId: id
    })
    .then(response =>  {
       return res.status(200).json({ response });
    })
    .catch(err => {return res.status(500).json({ message: 'server unavaileble'})});
    
}


async delete(req,res){

     const id = req.params.id;
     const idUser = req.user.id;
     const upload =  await Controllers.getUploads(id, idUser);

     
    try{
    
    await Upload.destroy({ where: { UserId: id }})
     .then(() => {
         fs.unlink(upload.path,function(err){
             if(err)
                console.log(err);
            console.log('deleted with sucess');
         })
        return res.status(200).json({message:'deleted is success'});
     })
     .catch(err=>{
         console.log(err)
         return res.status(400).json({ message: 'could not delete the file'});
     })
 }catch(err){
    return res.status(500).json({ message: 'server unavaileble'});
 }
    
}

async update(req,res){


    return res.json({message:'this is route update'});
}

}



module.exports = new Controllers();