const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors =  require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'ecommerce'
});

app.get("/", (req,res)=> {
    res.send("It is Starting");
})
app.post("/signUp",(req,res)=>{
    const name = req.body.newUser.name;
    const email = req.body.newUser.email;
    const password = req.body.newUser.password;

    const Sqlsignin = "INSERT INTO user (name,email,password) VALUES (?,?,?)";

    db.query(Sqlsignin, [name,email,password],(err,result)=> {
        res.send("okkk");
    });
});

app.post("/loginWithCred", (req,res)=> {
    const email = req.body.mail;
    const password = req.body.pwd;
    // console.log(email);
    // console.log(password);
    const Sqllogin = "SELECT * FROM user WHERE email = ?"
    db.query(Sqllogin, email, (err,result)=> {
        res.send(result)
    })
})

app.post("/order",(req,res) => {
    const request = req.body.orders;
    const orders = request.slice(0,request.length-1)
    const strorders = JSON.stringify(orders);
    const user = request[request.length-1].user;
    const bill = request[request.length-1].total;
    console.log(user);

    const orderSQL = "INSERT INTO orders (user,orderDetails,amount) VALUES(?,?,?)";

    db.query(orderSQL,[user,strorders,bill],(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
})

app.listen(3001, () => {
    console.log("It Is 3001");
})