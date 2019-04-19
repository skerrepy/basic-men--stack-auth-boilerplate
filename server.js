const express = require('express'),
app = express(),
mongoose =require('mongoose');
const PORT = 8080 || process.env.PORT;
const passport = require('passport');
const session = require('express-session');
mongoose.connect('mongodb://localhost/souf',{useNewUrlParser:true})
.then(console.log('DB is working')).catch(err => console.log(err));
//passport config 
require('./passport/index')(passport);
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'5asd651sa56dfa5f6adfghedp',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session())
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use('/users/',require('./routes/users'));
app.use('/',require('./routes/index'));
app.listen(PORT,()=>{
    console.log(`Working on port:${PORT}`);
})