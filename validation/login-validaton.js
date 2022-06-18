const Validator = require('validator');
const isEmpty = require  ('./is-empty');

//Validation 
module.exports = function validateLoginInput(data){
 let errors ={};

    data.email=!isEmpty(data.email)? data.email:''; //If it is empty set it to an empty string 
    data.password=!isEmpty(data.password)? data.password:''; //If it is empty set it to an empty string 

    //Check if it is valid email
    if(!Validator.isEmail(data.email)){
        errors.email = 'E-mail is invalid';
    }
    //Check for email
     if(Validator.isEmpty(data.email)){
        errors.email = 'E-mail field is required!';
    }
//Check for password
if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required!';
}


 return {
     errors,
     isValid:isEmpty(errors)
 }
}