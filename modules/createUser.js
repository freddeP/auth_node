const bcrypt = require("bcryptjs");
const fs = require("fs");

module.exports = function(email, pw){

       // Manuellt tillverka en ny användare
       let user = {};
       user.email = email;
       user.id = Date.now();
   
       //let tmpPassword = "jwtärnästamomentpådennalektion";
       let tmpPassword = pw;
   
       bcrypt.genSalt(12,function(err,salt){
           if(err) throw err;
     
   
           bcrypt.hash(tmpPassword,salt,function(err,hash){
               if(err) throw err;
             
    
               // uppdatera vår användare
               user.password = hash;
               if(saveUser(user)) return true;
   
           });
       });


}


function saveUser(userObj){


    let users = "";
    fs.readFile("./.data/users.json",function(err,data){
        
        let tmpData = data.toString();
        tmpData = JSON.parse(tmpData);
        users = Array.from(tmpData);
    
        users.push(userObj);

        fs.writeFile("./.data/users.json",JSON.stringify(users,null,2),function(err){
            if(err) console.log("no user added");
            else console.log("user added");
            return true;
        });
        
    }); // end read file
    return true;
}