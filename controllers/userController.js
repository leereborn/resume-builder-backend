const User = require('../models/User');
const {removeByEmail} = require('../models/Resume');

const create_post = (req, res) => {
    const { email, password } = req.body;
    User.create(email,password)
        .then(data=>{
            console.log({success: true, data});
            res.json({success: true, data});
        })
        .catch(err=>{
            console.error({success:false, err});
            res.status(err.statusCode).json({success:false, err});
        });
}

const get = (req, res) => {
    const { id } = req.params;

    if (req.decodedToken===id){
        User.find(id)
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

const update_put = (req, res) => {
    const { email, password } = req.body;
    if (req.decodedToken===email){
        User.update(email, password)
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
    const { id } = req.params;
    if(req.decodedToken===id){
        User.remove(id)
        .then(data=>{
            removeByEmail(id)
                .then(ret=>{
                    console.log({success: true, data});
                    User.logout(res); //Logout user
                    return res.json({success: true, data});
                })
                .catch(err=>{
                    console.error({success: false, err});
                    User.logout(res); //Logout user
                    return res.status(err.statusCode).json({success: false, err});
                });
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

module.exports={
    create_post,
    get,
    update_put,
    remove_delete
}