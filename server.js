// JavaScript Document
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');

const port = process.env.PORT || 3001;

//app use

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
app.use(cookieParser());
app.use('/', router);

// model
require('./model/user');

var user = mongoose.model('user');

// API calls
app.get('/', (req, res) => {
  res.send('Welcome to Node API')
})

app.post('/api/postuser', (req, res) => {
  var userData = req.body;
  console.log(user , 'users')
  if (userData.username === 'admin' && userData.password === 'rental') {
    const username = "admin",
	 token = jwt.sign({username},"adminoken")
	console.log(token+'valid user')
	res.json({
		code:200,
		status:'ok',
		token:token
		})
  }
  else{
  	console.log('not valid user')
	res.json({
		code:500,
		status:'failed',
		response:'Your user Name & password invalid'
		})
  }
    })
     
 
app.listen(port, () => console.log(`Listening on port ${port}`));