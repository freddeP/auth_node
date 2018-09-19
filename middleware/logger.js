
module.exports = function(req,res,next){
    console.log("logger is on");
    next();
}