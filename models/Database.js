require('dotenv').config();
const AWS = require("aws-sdk");

let db_config;
if (process.env.DB_LOCAL==='true'){
    db_config = {
        region: process.env.DB_REGION,
        endpoint: process.env.DB_ENDPOINT
    }
}else{//remote
    db_config = {
        region: process.env.DB_REGION,
        accessKeyId: process.env.DB_KEY_ID,
        secretAccessKey: process.env.DB_KEY
    }
}
AWS.config.update(db_config);

const docClient = new AWS.DynamoDB.DocumentClient();

const db_get = async (params)=>{
    const result = await docClient.get(params).promise();
    return result.Item;
}
const db_put = async (params)=>{
    return await docClient.put(params).promise();
}
const db_update = async (params)=>{
    return await docClient.update(params).promise();
}
const db_delete = async (params)=>{
    return await docClient.delete(params).promise();
}
const db_query = async(params)=>{
    return await docClient.query(params).promise();
}
module.exports = {
    db_delete,
    db_get,
    db_put,
    db_update,
    db_query
}