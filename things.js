const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
  res.render('chat', {
    user: {name: "const hw", age: "20"}
 });
});

router.get('*', function(req, res){//404 page
  res.render('404');
});

module.exports = router;
