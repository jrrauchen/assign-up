const express=require('express');
const router = express.Router();
const mango = require('mongodb').MongoClient;
var assert = require('assert');
var url = '';

router.get('/', function(req,res,next) {
  res.render()
});

router.get('/getAssignment', function(req,res,next) {
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('assignments').find();
    cursor.forEach();
    var cursor;
  });
});

router.post('/insert', function(req,res,next) {
  var item = {
    UserID: req.user.googleId,
    Course: req.body.Course,
    AssignmentTitle: req.body.AssignmentTitle,
    AssignmentDesc: req.body.AssignmentTitle,
    CreatedDate: req.body.CreatedDate,
    DueDate: req.body.DueDate,
    Complete: req.body.Complete
  };
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('assignments').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('assignment inserted');
      db.close();
    });
  });
});

router.post('/delete', function(req,res,next) {
  var assignment = req.body.AssignmentTitle;
  var id = req.user.googleId;

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('assignments').deleteOne({"AssignmentTitle": assignment,"UserID": id }, function(err, result) {
      assert.equal(null, err);
      console.log('assignment deleted');
      db.close();
    });
  });
});

module.exports = router;
