// importera moduler
const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const validateUser = require("./modules/validateUser");
const createUser = require("./modules/createUser");
const jwt = require("jsonwebtoken");

// applikationsvariabel
const app = express();

app.use(("/public"),express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.post("/login", function (req,res){
    // kolla request headers
    console.log(req.headers);
    // läse in user från html request
   //const user = JSON.parse(req.body);
   //console.log(user);
   console.log(req.body);
   const user = req.body;
    // validera användare mot egen modul/joi 
   const valResult = validateUser(user);
   if(valResult)
    {
        fs.readFile("./.data/users.json",function(err,data){

            if(err) throw err;
            else
            {
                console.log("raw: ",data);
              let users = Array.from(JSON.parse(data.toString()));
                const userExists = users.find(function(u){
                        if(u.email === user.email) return true;
                });
                if(userExists === undefined)
                {
                    console.log("Login Failed");
                }
                else
                {
                    // Här skall vi nästa lektion undersöka om lösenorden är samma...
                    console.log("user found", userExists);
                    bcrypt.compare(user.password,userExists.password,function(err,result){
                       
                        if(result) console.log("user logged in");
                        const token = jwt.sign(userExists.id,"mySecret");
                       console.log(token); 
                        // send back acces token in body
                       res.send({"token": token});
                    });
                } 
            }
        }); // end readfile

    }  // end if validate
    else res.send(valResult);


    //hitta användare i databas med hjälp av email
    // Om hen finns, kolla lösenord

    // om lösenordet är korrekt. SKicka meddelande samt en JWT
    // om lösenordet är inkorrekt skicka stausmeddelande

});


app.get("/createuser",function(req,res){ 
 
   if( createUser("freddeP@halmstad.se","testingTesting"))
   {
       res.send("User created");
   }

});






let port = process.env.port || 2006;

app.listen(port,function(){
    console.log("app lyssnar på port: " + port );
});


//hjälpfunktioner - flyttade till modules

