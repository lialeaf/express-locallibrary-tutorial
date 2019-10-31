var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('res.send: respond with a resource');
});

router.get('/cool', function (req, res, next) {
  res.send('cool:res.send: You are cool!');
});


module.exports = router;
