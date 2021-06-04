const db = require('./Database');
const bcrypt = require('bcrypt');

const table = "User";

const login = async (email, password)=>{
    const params = {
        TableName: table,
        Key: {
            "email":email
        }
    };
    const user = await db.db_get(params);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          return user;
        }
        throw new Error('Incorrect password');
      }
    throw new Error('Incorrect email');
}

const logout = (res)=>{
    res.cookie('jwt', '', { maxAge: 1 });
}

//Add or replace (if already exists) a resume
const create = async (email, password)=>{
    const salt = await bcrypt.genSalt();
    const params = {
        TableName: table,
        Item:{
            "email": email,
            "password": await bcrypt.hash(password, salt)
        }
    }
    return await db.db_put(params);
}

const find = async (email)=>{
    const params = {
        TableName: table,
        Key:{
            "email": email
        }
    };
    return await db.db_get(params);
}

//update password
const update = async (email, password)=>{
    const params = {
        TableName: table,
        Key:{
            "email": email
        },
        UpdateExpression: "set #password = :pw",
        ExpressionAttributeNames:{
            "#password": "password"
        },
        ExpressionAttributeValues:{
            ":pw":password
        },
        ReturnValues:"UPDATED_NEW"
    };
    return await db.db_update(params);
}

const remove = async (email)=>{
    var params = {
        TableName:table,
        Key:{
            "email": email
        },
    };
    return await db.db_delete(params);
}
module.exports = {login, logout, create, find, update, remove};