const Joi = require("joi");

module.exports = function(user){

    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().min(10).max(40)
    }).with('password', 'email');
     
  
    const valResult = Joi.validate(user, schema);

    if(valResult.error === null) return true;
    else return valResult.error.details[0].message;
   

}