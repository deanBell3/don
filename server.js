const dotenv= require('dotenv');
dotenv.config();
const cors= require('cors');
const bodyParser= require('body-parser');
const passport= require('passport');


const app= require('express')();


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

const authRoutes= require('./api/auth.js');
const postsRoutes= require('./api/posts.js');
const profileRoutes= require('./api/profile.js');
const commentRoutes= require('./api/comments.js');


app.use(authRoutes);
app.use(postsRoutes);
app.use(profileRoutes);
app.use(commentRoutes);

app.listen(8080,()=>{
    
})