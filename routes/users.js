var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('res.send: respond with a resource');
});

router.get('/cool', function (req, res, next) {
  res.send('cool:res.send: You are cool!');
});

router.get('/test', function (req, res, next) {
  res.render('test',{ title: 'My TEst Page' });
});



module.exports = router;