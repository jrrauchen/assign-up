const express=require('express');
const router = express.Router();
const mango = require('mongodb').MongoClient;
var assert = require('assert');
var url = '';

router.get('/', function(req,res,next) {
  res.render()
});

//get assign for a student
// router.get('/getAssignment', function(req,res,next) {
//   var result = [];
//   mongo.connect(url, function(err, db){
//     assert.equal(null, err);
//     var cursor = db.collection('assignments').find();
//     cursor.forEach(function(data, err){
//       assert.(null, err);
//       results.push(data);
//     }, function(data, err){
//       db.close();
//       res.render('index', {items: result});
//     });
//   });
// });
router.get('/getAssignment', function(req,res,next) {
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('assignments').find({"UserID":req.user.googleId});
    cursor.forEach(function(data, err){
      assert.equal(null, err);
      var item = {
        Course : req.body.course,
        AssignmentTitle: req.body.title
      };
      console.log(item);
    }, function(data, err){
      db.close();
      //res.render('index', {items: });
    });
  });
});

router.post('/insert', function(req,res,next) {
  var item = {
    UserID: req.user.googleId,
    Course: req.body.course,
    AssignmentTitle: req.body.title,
    AssignmentDesc: req.body.details,
    CreatedDate: req.body.createdDate,
    DueDate: req.body.dueDate,
    Complete: req.body.completed
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
  var assignment = req.body.title;
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
