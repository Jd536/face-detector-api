const express = require('express');
const App = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const { json } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

App.use(express.urlencoded({extended:true}));
App.use(express.json());
App.use(cors());

const db = knex({
    client: 'pg',
    version: '78.7',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'root',
      database : 'facedetector'
    },
    searchPath: ['knex', 'public']
  });
  
  


App.get('/', (req, res) => {
    const users = db.select('*').from('users')
    console.log(users)
    // res.json(users)
}) 

App.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
App.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)});
App.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
App.put('/image', (req, res) => {image.handleImage(req, res, db)})
App.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

App.listen(3300, ()=>{
    console.log('The server is running')
})