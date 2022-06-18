const express= require('express');
const router = express.Router();
const gravatar = require('gravatar'); // Profile pictures 
const bcrypt = require('bcryptjs') //password-hashing function
const jwt = require('jsonwebtoken')
const keys= require('../../config/keys')
const passport = require('passport');

//Load input Validation 
const validateRegisterInput = require('../../validation/register-validation')
const validateLoginInput = require('../../validation/login-validaton')

//Load user model
const User = require('../../models/User')

//@route GET api/users/test
//@access public
router.get('/test',(req,res)=>res.json({msg:"User works"})); //Dobija JSON

//@route POST api/users/register
//@access public
//@description -> registers users 

router.post('/register',(req, res)=>{
    const {errors, isValid}=validateRegisterInput(req.body);
    //Check for validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    //Checks if the email is in the database 
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){ //If user is registered already
            errors.email = 'Email already exist'
            return res.status(400).json(errors);
        }else{
            const avatar = gravatar.url(req.body.email,{
                s:'200', //Size
                r:'pg', //Rating
                d:'mm' //Default
            }); const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
            });
            bcrypt.genSalt(10,(err,salt)=>{ //Generates the hash
                bcrypt.hash(newUser.password,salt,(err,hash)=>{ //Fucntion for hashing
                    if(err){
                        throw err;
                    }
                    newUser.password = hash; //Set the pass to the hash
                    newUser.save() // Save the user to the DB
                    .then(user => res.json(user)) 
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

//@route GET api/users/login
//@access public
//@description -> login users // returns JWT token

router.post('/login',(req,res)=>{
    const {errors, isValid}=validateLoginInput(req.body);
    //Check for validation
    if(!isValid){
        return res.status(400).json(errors);
    }
     const email = req.body.email;
     const password = req.body.password;

     //Find the user by email
     User.findOne({email}) // matches email in user with the const email declared above
    .then(user => {
        if(!user){

            errors.email = 'User not found'; //Add to the errros object
            throw res.status(404).json(errors);
        }
       //Check password
       bcrypt.compare(password,user.password) //Returns a bool
       .then(isSame =>{
        if(isSame){
            //User is found 
            const payload = { //Create JWT payload
                id:user.id,
                name:user.name,
                avatar:user.avatar,
            }
            //Sign token
            jwt.sign(payload, 
                keys.secretOrKey,
                {expiresIn:7200}, 
                (err,token)=>{
                    res.json({
                        success:true,
                        token:'Bearer ' + token
                    });
            });
        }else{
            errors.password = 'Password incorrect.'
            return res.status(400).json(errors);
        }
       })
    });
})


//@route GET api/users/current
//@access private
//@description -> current loged in users 

router.get('/current',passport.authenticate('jwt',
{session:false}),
(req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email:req.user.email
    });
})



module.exports = router;