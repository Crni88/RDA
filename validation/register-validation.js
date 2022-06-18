const Validator = require('validator');
const isEmpty = require  ('./is-empty');

//Validation 
module.exports = function validateRegisterInput(data){
 let errors ={};

    data.name=!isEmpty(data.name)? data.name:''; //If it is empty set it to an empty string 
    data.email=!isEmpty(data.email)? data.email:''; //If it is empty set it to an empty string 
    data.password=!isEmpty(data.password)? data.password:''; //If it is empty set it to an empty string 
    data.password2=!isEmpty(data.password2)? data.password2:''; //If it is empty set it to an empty string 

 if(!Validator.isLength(data.name, {min:2, max:15})){
    errors.name='Name must be between 2 and 15 characters!';
 } 
 //Check for name
 if(Validator.isEmpty(data.name)){
     errors.name = 'Name field is required!';
 }
 //Check for email
 if(Validator.isEmpty(data.email)){
    errors.email = 'E-mail field is required!';
}
 //Check if it is valid email
 if(!Validator.isEmail(data.email)){
    errors.email = 'E-mail is invalid!';
}
//Check for password
if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required!';
}
//Check for password lenght
if(!Validator.isLength(data.password, {min:6,max:30})){
    errors.password = 'Password must be between 6 and 30 characters!';
}
//Check for password confirmation
if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Confirm password field is required!';
}
//Check if passwords match
if(!Validator.equals(data.password2,data.password2)){
    errors.password2 = "Passwords don't match!";
}
 return {
     errors,
     isValid:isEmpty(errors)
 }
}