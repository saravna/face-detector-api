const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
var knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const user = require('./controllers/user');



app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : 'true'
    }
  });

//Get All Users
app.get('/',(req, res)=> {
    res.json("working");
});

//SignIn
app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)});

//Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt )});

//Get a user info
app.get('/profile/:id', (req,res) => {user.getInfo(req, res, db)});

//Image Entry
app.put('/image',(req, res) => {image.handleEntry(req, res, db)});

//handleApi
app.post('/apicall',(req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT, () => {
    console.log('App is running');
});

/*

/ res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT = user

*/