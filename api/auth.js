const passport= require('passport');
const passportJWT= require('passport-jwt');
const jwtStrategy= passportJWT.Strategy;
const ExtractJwt= passportJWT.ExtractJwt;
const knex= require('../data/connect.js');
const bookshelf= require('bookshelf');
const securePassword= require('bookshelf-secure-password');
const db= bookshelf(knex);
db.plugin(securePassword);
const jwt= require('jsonwebtoken');


const router= require('express').Router();

const User= db.Model.extend({
    tableName:'off_users',
    hasSecurePassword: true
});

const opts= {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const strategy= new jwtStrategy(opts,(payload,next)=>{
    User.forge({id: payload.id}).fetch().then(res=>next(null,res));
});

passport.use(strategy);

router.get('/',(req,res)=>{
   res.send('Welcome to Off')
});

router.post('/register',(req,res)=>{
    const {username, email,password}= req.body;
    if(!email || !password){
        res.send('No Fields Entered');
    }
    const user= new User({
        username,
        email,
        password
    });
    user.save().then(user=>{
        const payload= {id: user.id};
        const token= jwt.sign(payload, process.env.SECRET_OR_KEY);
        res.send({token, username: user.attributes.username});
    }).catch(err=>res.send(err));
    
});

router.post('/login',(req,res)=>{
    const {email ,password} =req.body;
    if(!email || !password){
        res.send('Sorry No User Found here');
    }
    User.forge({email}).fetch().then(result=>{
        if(! result){
            res.send('No User Found Here, Redirecting You to the Registration page');
        }
        result.authenticate(password).then(user=>{
            const payload= {id: user.id};
            const token= jwt.sign(payload, process.env.SECRET_OR_KEY);
            res.send({token, username: user.attributes.username});
        }).catch(err=>res.send(err))
    })
})






module.exports= router;