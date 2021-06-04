const db = require('./Database');

const table = "Resume";

//Add or replace (if already exists) a resume
const create = async (email, name, content)=>{
    const params = {
        TableName: table,
        Item:{
            "email": email,
            "name": name,
            "content": content
        }
    }
    return await db.db_put(params);
}

//Find by email or email plus name
const find = async (email, name)=>{
    let params;
    if(name===undefined){
        params = {
            TableName: table,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        };
    }else{
        params = {
            TableName: table,
            KeyConditionExpression: "#email = :email and #name = :name",
            ExpressionAttributeNames:{
                "#email": "email",
                "#name":"name"
            },
            ExpressionAttributeValues: {
                ":email": email,
                ":name": name
            }
        };
    }
    return await db.db_query(params);
}

//Update content. (Note you can't update any primary key attributes. Instead, you need to delete then create new.)
const update = async (email, name, content)=>{
    const params = {
        TableName: table,
        Key:{
            "email": email,
            "name": name
        },
        UpdateExpression: "set #content = :content",
        ExpressionAttributeNames:{
            "#content": "content"
        },
        ExpressionAttributeValues:{
            ":content":content
        },
        ReturnValues:"UPDATED_NEW"
    };
    return await db.db_update(params);
}

const remove = async (email, name)=>{
    var params = {
        TableName:table,
        Key:{
            "email": email,
            "name": name
        },
        ReturnValues: "ALL_OLD"
    };
    return await db.db_delete(params);
}

const removeByEmail = async (email)=>{
    const resumes = await find(email,undefined);
    resumes.Items.forEach(async item=>{
        await remove(email,item.name);
    });
}
module.exports={create, find, update, remove, removeByEmail}