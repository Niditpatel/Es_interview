const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({path:'config.env'});

// console.log(process.env.DB_URI)

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//auth apis
app.use('/',require('./Routes/Auth.route'));

//other apis

app.use('/user',require('./Routes/User.route'));
app.use('/blog',require('./Routes/Blog.route'));


app.listen(4040,()=>console.log('server is connected.'));

// app.get('/',(req,res)=>{
//     res.send('Welcome to the blog post app');
// });


// connect database
const connectDatabase = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('database connected');
    }catch(e){
        console.log(e);
    }
}
connectDatabase();