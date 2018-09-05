const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const dbRoutes = require('./routes/db-routes');
const mongo = require('mongodb');
var assert = require('assert');
const app = express();
let bodyParser = require('body-parser')

app.set('view engine','ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())



app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () =>{
  console.log('connected to mongodb');
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/',(req,res) => {
  res.render('home', {user: req.user });
});

app.get('/getAssignment', function(req,res,next) {
  mongo.connect(keys.mongodb.dbURI, function(err, db){
    console.log(db.collection('assignments'))
    var cursor = db.collection('assignments').find({"UserID":req.user.googleId});
    var responseData = {};
    cursor.forEach(function(data, err){
      if(Object.keys(responseData).includes(data.Course)){
        responseData[data.Course].push(data)
      }else{
        responseData[data.Course] = [];
        responseData[data.Course].push(data);
      }
    }, function(data, err){
      db.close();
      res.send(responseData);
    });
  });
});

app.post('/insert', function(req,res,next) {
  console.log(req)
  var item = {
    UserID: req.user.googleId,
    Course: req.body.course,
    AssignmentTitle: req.body.title,
    AssignmentDesc: req.body.details,
    CreatedDate: req.body.createdDate,
    DueDate: req.body.dueDate,
    Complete: req.body.completed
  };
  mongo.connect(keys.mongodb.dbURI, function(err, db){
    db.collection('assignments').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('assignment inserted');
      db.close();
      res.send()
    });
  });
});

app.post('/delete', function(req,res,next) {
  var assignment = req.body.title;
  var id = req.user.googleId;

  mongo.connect(keys.mongodb.dbURI, function(err, db){
    assert.equal(null, err);
    db.collection('assignments').deleteOne({"AssignmentTitle": assignment,"UserID": id }, function(err, result) {
      assert.equal(null, err);
      console.log('assignment deleted');
      db.close();
    });
  });
});



app.listen(8080, '0.0.0.0',() => {
  console.log('Server is listening')
});
