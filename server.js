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
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'face-detector'
    }
  });

//Get All Users
app.get('/',(req, res)=> {
    res.json(database.users);
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

app.listen(3000, () => {
    console.log('App is running');
});

/*

/ res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT = user

*/