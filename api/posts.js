const db= require('../data/connect.js');
const passport= require('passport');
const router= require('express').Router();


router.get('/posts',/* passport.authenticate('jwt',{session:false}),*/(req,res)=>{
    db.select('post_title','author_name', 'content', 'id').from('posts').limit(100).orderBy('posted_the','desc').then(data=>res.send(data)).catch(err=>res.send({errMessage:'No Posts Available', err}));
});
router.get('/posts/:id', (req,res)=>{
    const id= req.params.id;
    db.select('*').from('posts').where({id}).then(data=>res.send(data)).catch(err=>res.send(err));
})

router.post('/users/:username/posts',(req,res)=>{
    const author_name= req.params.username;
    const post_title= req.body.post_title;
    const content= req.body.content;
    db('posts').insert({content,author_name, post_title}).then(res=>res.redirect('/feed')).catch(err=>res.send(err));
})
router.get('/post-of-the-day',(req,res)=>{
    const id=null;
    db.select('*').from('posts').where({id}).then(data=>res.send(data)).catch(err=>res.send(err))
})

router.get('/posts/:id/likes',(req,res)=>{
    const id= req.params.id;
db('likes').count('*').where({post_id:id}).then(data=>res.send(data)).catch(err=>res.send(err));
})


router.post('/posts/:id/likes',(req,res)=>{
    const id= req.params.id;
    const author= req.body.author;
    db('likes').insert({post_id:id, liked_by:author}).then(data=>res.send(data)).catch(err=>res.send(err));
})
router.get('/posts/:id/views', (req,res)=>{
    const id= req.params.id;
    db('views').count('*').where({post_id:id}).then(data=>res.send(data)).catch(err=>res.send(err));
})
router.post('/posts/:id/views',(req,res)=>{
    const id= req.params.id;
    db('views').insert({post_id:id}).then(data=>res.send(data)).catch(err=>res.send(err))
})

module.exports= router;