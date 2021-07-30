const  { Op }  = require('sequelize');
const { User, Upload }  = require('../app/models');
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



class  ControllersUploads {



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



async uploadFile(req, res){

    
    const file = req.file;

    if(!file){

        return res.status(400).json({ message: 'provider file'});
    }

    
   const response = await Upload.create({
        name: file.originalname,
        path: file.path || file.location,
        UserId: req.user.id,
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
    
    const upload =  await ControllersUploads.getUploads(idUpload, req.user.id);
   
   try{
   
    Upload.destroy({ where: { id: upload.id }})
    .then(() => {
       return res.status(200).json({message:'deleted is success'});
    })
    
}catch(err){
    
   return res.status(400).json({ message: 'could not delete the file'});
}
   
}



async list (req, res){

    
    const files = await Upload.findAll({
        where:{
            UserId: req.user.id
        }
    });

    return res.status(200).json( files );
}


async recoverUpload(req, res){

    const id = req.params.id;
    const  UserId  = req.user.id;
    
try{
     await Upload.restore({
        where:{
            [Op.and]: [{ id }, { UserId}]
        }
    }) ;
   
    return res.status(200).json({message: 'upload restored'});
 }catch(err){
    return res.status(400).json({ message: 'Unable to recover upload' });
 }
}


async trash(req, res){

    const   id   = req.user.id;
    
try{
    const uploads = await Upload.findAll({
          paranoid: false,
          where:{
              [Op.and]: [{ UserId: id }, { deletedAt: { [Op.ne]: null }}]
          }
    });
    
    return res.status(200).json({ uploads });
 }catch(err){
    return res.status(400).json({ message: 'not find uploads' });
 }
}




async deleteForceUpload(req,res){

    const idUpload = req.params.id;
    
    const upload =  await ControllersUploads.getUploads(idUpload, req.user.id);
   
   try{
   
    Upload.destroy({
        paranoid: false,
        force:  true,
        where:{
            [Op.and]: [{ UserId: upload.UserId }, { id: upload.id },{ deletedAt: { [Op.ne]: null }}]
        }
  }).then(() => {
       deleteObjectOfBuck(upload.path, upload.key);

       return res.status(200).json({message:'deleted is success'});
    })
    
}catch(err){
    
   return res.status(400).json({ message: 'could not delete the file'});
}
   
}

}



module.exports = new ControllersUploads();