var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var uploads = require('./uploads');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var routes = require('./routes/index');
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


var end_response = false;
var multer  = require('multer');
app.use(multer({
  dest: './public/uploads/',
  rename: function(field, filename) {
    return filename;
  },
  onFileUploadComplete: function (file, req, res) {
    end_response = res;
  },
  onParseEnd: function(req) {
    uploads(req, end_response);
  },
  putSingleFilesInArray: true
}));

app.post('/uploads', function(req, res) {

});

app.post('/download', function(req, res) {
  var filename = req.body.generated_file_name;
  var filepath = __dirname + '/public/converted/css/' + filename;
  res.download(filepath, path.basename(filename));
});


module.exports = app;