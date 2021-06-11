const { User, Upload }  = require('../models');


class Controllers {


async get(req,res){
    await User.findAll()
    .then( response => {
         return res.json({ response });
    });
}

async post(req,res){

    const { name, email, password } = req.body;
    const avatar = req.file;
    console.log(avatar.filename,avatar.path);
    
    try{

        const response = await User.create({
            name,
            avatar: avatar.path,
            email,
            password:password
        })
        .then(response => {
            return res.status(201).json( response );
        })
        .catch();
    }catch(err){
         console.log(err);
        return res.status(404).json({message: 'bad request'})
    }
    //return res.status(200).json({avatar, name, email, password });
}
async delete(req,res){


    return res.json({message:'this is route delete'});
}
async update(req,res){


    return res.json({message:'this is route update'});
}

async getAll(req,res){


    return res.json({message:'this is route getAll'});
}


}



module.exports = new Controllers();