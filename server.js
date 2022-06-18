const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser= require('body-parser');
const passport = require('passport');
const app = express();
const path = require('path');
//bodyparser middle
app.use(bodyParser.urlencoded({extended:false})); //middleware for parsing json objects
app.use(bodyParser.json());// tells the browser to use JSON
//DB config
const db = require('./config/keys').mongoURI;

//Conect to mongoDB

mongoose
.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected!"))
.catch(err => console.log(err));


//Passport middleware
app.use(passport.initialize());
//Passport config with JWT strategy

require('./config/passport.js')(passport);

//Use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

//Server static assets if in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req, res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port ${port}`));