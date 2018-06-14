const db =require('../data/connect.js');
const router= require('express').Router();

router.get('/posts/:id/comments',(req,res)=>{
    const id= req.params.id;
    db.select('*').from('comments').where({post_id:id}).then(data=>res.send(data)).catch(err=>res.send(err));
})

router.post('/posts/:id/comments',(req,res)=>{
    const post_id= req.params.id;
    const comment= req.body.comment;
    const author_name= req.body.author_name;
    db('comments').insert({comment, post_id, author_name}).then(data=>res.send(data)).catch(err=>res.send(err));
})



module.exports= router;