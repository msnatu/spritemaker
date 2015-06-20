var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function handleFileUpload(request) {
    var uploaded_files = request.files.uploaded_files;
    var SVGSpriter = require('svg-sprite');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var fs = require('fs');

    spriter = new SVGSpriter({
        dest: 'public/converted',
        mode: {
            css: {
                render: {
                    css: true
                }
            }
        }
    });

    uploaded_files.forEach(function(file){
        var file_name = 'public/uploads/' + file.name;
        var original_filename = file.originalname;
        var uploaded_file_path = __dirname + '/' + file_name;
        spriter.add(
            path.resolve(file_name),
            file_name,
            fs.readFileSync(uploaded_file_path, {encoding: 'utf-8'})
        );
    });

    spriter.compile(function(error, result, data){
        for (var type in result.css) {
            mkdirp.sync(path.dirname(result.css[type].path));
            fs.writeFileSync(result.css[type].path, result.css[type].contents);
        }
    });
}

module.exports = handleFileUpload;