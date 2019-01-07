var express = require('express');
var router = express.Router();
var m = require('./menu.js');
var mysql_dbc = require('./db/con_db')();

router.get('/dynamic', function(req, res){
  res.render('dynamic', {
     name: "TutorialsPoint", 
     url:"http://localhost/",
     user: {name: "ㄴㅇ", age: "20"}
  });
});


router.get('/', function(req, res){
    //res.render('content');var mysql_dbc = require('./db/con')();
  res.render('index', {
    menu: m.menu
 });
});
router.get('/chat', function(req, res){
  res.render('chat', {
    user: {name: "var hw", age: "20"}
 });
});
router.get('/world', function(req, res){
  res.render('world', {
    user: {name: con_sql("select * from member"), money:1000 }
 });
});


router.get('*', function(req, res){//404 page
  res.render('404');
});

function con_sql(sql){
  var connection = mysql_dbc.init();
  return mysql_dbc.sql(connection,sql);
}

//export this router to use in our index.js
module.exports = router;
