
const db= require('../data/connect.js');
const router= require("express").Router();

router.get('/users/:username',(req,res)=>{
    const username= req.params.username;
    db.select('*').from('off_users').where({username}).then(data=>res.send(data)).catch(err=>res.send(err));
})

router.get('/users/:username/posts',(req,res)=>{
  const username= req.params.username;
  db.select('*').from('posts').where({author_name:username}).then(data=>res.send(data)).catch(err=>res.send(err))
  
})
router.post('/delete/user/:username',(req,res)=>{
  const username= req.params.username;
  db('off_users').where({username:username}).del().then(()=>res.send('account deleted')).catch(err=> res.send(err))
})




module.exports= router;