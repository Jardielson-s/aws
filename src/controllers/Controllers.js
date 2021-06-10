


class Controllers {


async get(req,res){


    return res.json({message:'this is route get'});
}

async post(req,res){


    return res.json({message:'this is route post'});
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