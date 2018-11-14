const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Jason',
    password : 'admin',
    database : 'stut'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(`it's working`) })

// SignIn

app.post('/signin', signin.handleSignin(db, bcrypt))

// Register

app.post('/register', register.handleRegister(db, bcrypt))

// Profile

app.get('/profile/:id', profile.handleProfileGet(db))

// Server is responsing

app.listen(process.env.PORT || 3000, () => {
  console.log('app is running on port ${process.env.PORT}');
})
