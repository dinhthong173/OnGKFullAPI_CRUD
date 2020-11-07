const aws= require('aws-sdk');
const e = require('express');
const { resolve } = require('path');

aws.config.update({
    "region": "ap-southeast-1",
    //"endpoint" :"https://859486365290.signin.aws.amazon.com/console",
    "accessKeyId": "",
    "secretAccessKey":""
})

const tableName="SinhVienAPI"
const docClient = new aws.DynamoDB.DocumentClient();

function getAllSinhVien(){
    return new Promise((resolve, reject) => {
        docClient.scan({
            TableName: tableName
        }, function (err, data) {
            if (err)
                reject(err);
            else {
                const { Items } = data;
                resolve(Items);
            }
        });
    });
}

function findSinhVienByID(id) {
    return new Promise(function (resolve, reject) {
        docClient.get({
            TableName: tableName,
            Key: {
                "id": id
            }
        }, function (err, data) {
            if (err)
                reject(err);
            else {
                const { Item } = data;
                resolve(Item)
            }
        });
    });
}

function findSinhVienByMaSV(masv) {
    return new Promise(function (resolve, reject) {
        docClient.scan({
            TableName: tableName,
            FilterExpression: "#mssv=:masv",
            ExpressionAttributeNames: {
                "#mssv": "MaSV"
            },
            ExpressionAttributeValues: {
                ":masv": masv
            }
        }, function (err, data) {
            if (err)
                reject(err);
            else {
                const { Items } = data;
                resolve(Items[0])
            }
        });
    });
}

function putSinhVien(Item) {
    return new Promise(function (resolve, reject) {
        docClient.put({
            TableName: tableName,
            Item: Item
        }, function (err, data) {
            if (err)
                reject(err);
            else {
                resolve(true)
            }
        });
    });
}

function deleteSinhVienByID(id) {
    return new Promise(function (resolve, reject) {
        docClient.delete({
            TableName: tableName,
            Key: {
                "id": id
            },
            ReturnValues: "ALL_OLD",
        }, function (err, data) {
            if (err)
                reject(err);
            else {
                const { Attributes } = data;
                resolve(Attributes);
            }
        });
    });
}

function deleteMultiSV(lstID){
    const array=[]

    
    lstID.forEach(e=>{
        array.push(
            {
                DeleteRequest: {
                    Key: {
                        "id": e.toString()
                    }
                }
            }
        )
    })
    return new Promise(function (resolve, reject){
        docClient.batchWrite({
            RequestItems :{
                "SinhVienAPI": array
            }
        }, (err, data)=>{
            if (err){
                reject(err)
            }
            else {
                const {Attributes}= data;
                resolve(Attributes)
            }
        })
    })
}



module.exports={ getAllSinhVien, putSinhVien, findSinhVienByID, deleteSinhVienByID, findSinhVienByMaSV, deleteMultiSV}