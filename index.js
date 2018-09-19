// importera moduler
const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const validateUser = require("./modules/validateUser");
const createUser = require("./modules/createUser");
const jwt = require("jsonwebtoken");
const logger = require("./middleware/logger");
const authUser = require("./middleware/authUser");

// applikationsvariabel
const app = express();

app.use(("/public"),express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




//app.use(logger);

app.get("/secret",authUser, function(req,res){

    res.status(200).send({"your token is valid": req.user});
    
});



app.get("/",logger,function(req, res){

    res.send("you've reached index");

});

app.post("/login", function (req,res){

    // läser in user från html request
    // req.body är nu ett json-objekt behöver ej konverteras
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
                       
                        if(result){ console.log("user logged in");
                        const token = jwt.sign(userExists.id,"mySecret");
                       console.log(token); 
                        // send back acces token in body
                       res.send({"token": token});
                        }
                        else res.send({"error": "login failed"});
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
 
   // res.send(req.body.email);

    // Skapa ett userobjekt 
    // validera detta med joi ( se tidigare kod)
    //skicka in i createUser nedan... dvs avkommentera..


    createUser("freP@halmstad.se","testingTesting");
    
       res.send("User created");
    

});






let port = process.env.port || 2006;

app.listen(port,function(){
    console.log("app lyssnar på port: " + port );
});


//hjälpfunktioner - flyttade till modules

