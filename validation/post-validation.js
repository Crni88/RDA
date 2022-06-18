const Validator = require('validator');
const isEmpty = require  ('./is-empty');

//Validation 
module.exports = function validatePostInput(data){
 let errors ={};

 data.text= !isEmpty(data.text) ? data.text:''; //If it is empty set it to an empty string 

if(!Validator.isLength(data.text,{min:10,max:300})){
        errors.text = 'Post must be between 10 and 300 characters'
    }
    //Check if it is valid input
    if(Validator.isEmpty(data.text)){
        errors.text = 'Text is required';
    }
 return {
     errors,
     isValid:isEmpty(errors)
 }
}