const Resume = require('../models/Resume');

const create_post = (req, res) => {
    const {email, name, content} = req.body
    if (email===undefined){
        return res.status(400).json({success: false, err:{msg:"Email must be provided."}});
    }
    if (req.body.content===undefined){
        return res.status(400).json({success: false, err:{msg:"Content must be provided."}});
    }
    
    if (req.decodedToken===email){
        Resume.create(email,name,content)
        .then(data=>{
            console.log({success: true, data});
            res.json({success: true, data});
        })
        .catch(err=>{
            console.error({success: false, err});
            res.status(err.statusCode).json({success: false, err});
        })   
    }else{
        console.error({success: false, err:{msg:"Authorization failed."}});
        res.status(401).json({success: false, err:{msg:"Authorization failed."}});
    }
}

const get = (req, res) => {
    const { email, name } = req.query;
    if (req.decodedToken===email){
        Resume.find(email,name)
        .then(data=>{
            console.log({success: true, data});
            res.json({success: true, data});
        })
        .catch(err=>{
            console.error({success: false, err});
            res.status(err.statusCode).send({success: false, err});
        });
    }else{
        console.error({success: false, err:{msg:"Authorization failed."}});
        res.status(401).send({success: false, err:{msg:"Authorization failed."}});
    }
}

const update_put = (req, res) => {
    const {email, name, content} = req.body;
    if (email===undefined || name === undefined){
        return res.status(400).json({success: false, err:{msg:"Both email and name must be provided."}});
    }
    if (content===undefined){
        return res.status(400).json({success: false, err:{msg:"Content must be provided."}});
    }
    if (req.decodedToken===email){
        Resume.update(email,name,content)
        .then(data=>{
            console.log({success: true, data});
            res.json({success: true, data});
        })
        .catch(err=>{
            console.error({success: false, err});
            res.status(err.statusCode).json({success: false, err});
        });
    }else{
        console.error({success: false, err:{msg:"Authorization failed."}});
        res.status(401).json({success: false, err:{msg:"Authorization failed."}});
    }
    
}

const remove_delete = (req, res) => {
    const { email, name } = req.query;
    if (name===undefined || email === undefined){
        return res.status(400).json({success: false, err:{msg:"Both email and name must be provided."}});
    }
    if (req.decodedToken===email){
        Resume.remove(email, name)
        .then(data=>{
            console.log({success: true, data});
            res.json({success: true, data});            
        })
        .catch(err=>{
            console.error({success: false, err});
            res.status(err.statusCode).json({success: false, err});
        });
    }else{
        console.error({success: false, err:{msg:"Authorization failed."}});
        res.status(401).json({success: false, err:{msg:"Authorization failed."}});
    }
}

module.exports={
    create_post,
    get,
    update_put,
    remove_delete
}