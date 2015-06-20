var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.cookie('cookiename', 'cookievalue', { maxAge: 900000, httpOnly: true });
//  console.log("Cookies: ", req.cookies)
//  console.log(req.cookies.cookiename)
//  res.clearCookie('cookiename');

  res.render('index');
});

module.exports = router;
