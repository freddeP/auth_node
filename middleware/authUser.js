const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

   // enklare sätt att läsa en viss header...
   const token = req.header('x-auth');
   if(!token) res.status(401).send("No token provided");

   // kolla om token är valid
   try{
   const checkToken = jwt.verify(token,"mySecret");
   req.user = checkToken;
   next();
   }
   catch(exeption)
   {
       res.status(400).send("Invalid token");
   }

}