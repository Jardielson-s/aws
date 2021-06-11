const bcrypt = require('bcrypt');
const { User, Upload }  = require('../models');
const createToken = require('../middleware/Jwt');

async function getEmail(email){

    const res = await User.findOne({ where:{
        email
    }})
    
    return res;
}

class Controllers {

async get(req,res){
    await User.findAll()
    .then( response => {
         return res.json({ response });
    });
}

async post(req,res){

    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const avatar = req.file;
    console.log(avatar.filename,avatar.path);

    const findEmail = await getEmail(email);

        if(findEmail){
            res.status(404).json({ message : 'email already exist'});
        }else{
    
            try{
                
                const response = await User.create({
                    name,
                    avatar: avatar.path,
                    email,
                    password: hash
                })
                .then(response => {
                    const id = response.id;
                    const token = createToken.createToken(id);
                    return res.status(201).json({ response, token });
                })
                .catch(err => {
                    return res.status(400).json( err );
                });
            }catch(err){
                console.log(err);
                return res.status(404).json({message: 'bad request'})
            }
}
}


async login(req, res){

    const { email, password } = req.body;
    
   
    const findEmail = await getEmail(email);

    if(!findEmail)
        return res.status(404).json({message:'email is invalid'});
    
    const compare = bcrypt.compare(password, findEmail.email);

    if(!compare)
        return res.status(404).json({message:'password is invalid'});

    const id = findEmail.id;
    const token = createToken.createToken({ id });
    return res.status(200).json({ findEmail, token })

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