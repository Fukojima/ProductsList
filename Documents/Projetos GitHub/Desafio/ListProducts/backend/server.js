const express = require("express");
const bodyparser = require("body-parser");
var jwt = require('jsonwebtoken');
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = require("bson");




var token;
const app = express();
app.use(cors());
app.use(express.json());



// Conexão bando de dados
const mongoUrl = 'mongodb+srv://dbUser:20031357@search-crawler.kz5dm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

 MongoClient.connect(mongoUrl,(err, client)=>{
    if (err) return console.log("Erro na conexão com o banco de dados: ", err);
    db = client.db('dbWei')   
    app.listen(3000,()=> {
        console.log("Servidor está ativo...✓")
        console.log("Porta :3000")  
    });
});

// get request

app.get('/list', (req,res)=>{
   token = generateToken();
    console.log("Executando listagem dos produtos...")
    let cursor = db.collection('ListProducts').find().toArray((err, results) => {
        tam = results.length;
        results[0].token = token;
        res.send(results);


    });
    console.log("Dados listados ✓")


})
app.delete('/delete/:id', (req,res)=>{
    const{id} = req.params;

    let cursor = db.collection('ListProducts').deleteOne({_id:ObjectId(id)},(err,result) =>{
        console.log("Dados deletados ✓")}     
    )
});

app.put('/update/:id', function (req, res) {
    const{id} = req.params;
    console.log("ta auqi")
    let cursor = db.collection('ListProducts').findOneAndUpdate({_id:ObjectId(id)},{
        $set:{name:req.body.name,
         price:req.body.price,
         category:req.body.category       
        
        }})
        console.log("Dados atualizados ✓")
    }     
)
        
    

// post request

app.post('/create', (req,res)=>{
    console.log("Validando token...")
    if (req.body.token != token){
        console.log("tk", req.body.token);
        console.log("token", token);
        return (console.log("Token Inválido"))

    }else{
        console.log("Token Válido ✓")
    console.log("Executando inserção dos produtos na database...")
   let cursor = db.collection('ListProducts').insert(req.body, (err,result) => {
        if (err) return console.log("Erro na conexão com o banco de dados: ", err);
        console.log('Dados salvos...');
        console.log(req.body)
        res.redirect('/list');
        console.log("Dados inseridos ✓")
    });
}
    console.log(req.body);

})








// Criação do token jwt
function generateToken(){
    let header = {
        "typ": "JWT",
        "alg": "HS256"
    }
    
    header = JSON.stringify(header);
    header = Buffer.from(header).toString('base64');
    
    let payload = [
        iss = 'localhost:4200',
        iat = new Date().toLocaleString(),
        exp = new Date().setMinutes(180).toLocaleString(),
        acl = ['user']
    ];
    
    payload = JSON.stringify(payload);
    payload = Buffer.from(payload).toString('base64');
    
    let key = '.net-sp-ness';
    let signature = crypto.createHmac('sha256', key)
        .update(header + "." + payload)
        .digest('base64');
    
    signature = Buffer.from(signature).toString('base64');
    
    let token = header + "." + payload + "." + signature;
    return token;
    }
    
    