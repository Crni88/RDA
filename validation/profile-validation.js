const Validator = require('validator');
const isEmpty = require  ('./is-empty');

//Validation 
module.exports = function validateProfileInput(data){
 let errors ={};

    data.handle=!isEmpty(data.handle)? data.handle:''; //If it is empty set it to an empty string 
    data.status=!isEmpty(data.status)? data.status:''; //If it is empty set it to an empty string 
    data.skills=!isEmpty(data.skills)? data.skills:''; //If it is empty set it to an empty string 


    //Handle length
    if(!Validator.isLength(data.handle,{min:2,max:40})){
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }
    //If the handle is empty
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }
    //If status is empty
    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }
    //If skills is empty
    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required';
    }
    /*
    //If it is not empty
    if(!isEmpty(data.website)){
        if(!Validator.isUrl(data.website)){ //Check if the input is URL
            errors.website = 'Not valid URL';
        }
    }
     //If it is not empty
     if(!isEmpty(data.twitter)){
        if(!Validator.isUrl(data.twitter)){ //Check if the input is URL
            errors.twitter = 'Not valid URL';
        }
    } //If it is not empty
    if(!isEmpty(data.youtube)){
        if(!Validator.isUrl(data.youtube)){ //Check if the input is URL
            errors.youtube = 'Not valid URL';
        }
    } //If it is not empty
    if(!isEmpty(data.facebook)){
        if(!Validator.isUrl(data.facebook)){ //Check if the input is URL
            errors.facebook = 'Not valid URL';
        }
    } //If it is not empty
    if(!isEmpty(data.instagram)){
        if(!Validator.isUrl(data.instagram)){ //Check if the input is URL
            errors.instagram = 'Not valid URL';
        }
    }
    //If it is not empty
    if(!isEmpty(data.linkedin)){
        if(!Validator.isUrl(data.linkedin)){ //Check if the input is URL
            errors.linkedin = 'Not valid URL';
        }
    }*/
 return {
     errors,
     isValid:isEmpty(errors)
 }
}