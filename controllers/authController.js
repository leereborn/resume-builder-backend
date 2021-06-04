const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = (req,res)=>{
    const {email, password} = req.body;
    const expiresIn = parseInt(process.env.JWT_EXPIRES_SECONDS);

    User.login(email,password)
        .then(user=>{
            const token = jwt.sign({email}, process.env.JWT_SECRET_KEY,{
                expiresIn: expiresIn
            });
            res.cookie('jwt', token, { httpOnly: true, maxAge: expiresIn * 1000 });
            res.status(200).json({success: true, data:{}});
        })
        .catch(err=>{
            console.error({success: false, err:{msg:err.message}});
            res.status(400).json({success: false, err:{msg:err.message}}); 
        });
}

const logout = (req, res)=>{
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({success: true, data:{}});
}

module.exports = {login, logout};