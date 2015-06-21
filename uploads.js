function handleFileUpload(request, response) {
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
                },
                prefix: '.'
            }
        },
        shape: {
            spacing : {
                padding: 5
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
        var output = data.css.sprite;
        var css_file_path = __dirname + '/public/converted/css/sprite.css';
        var css_output = fs.readFileSync(css_file_path);
        css_output = css_output.toString().replace(/public--uploads--/g, "");
        css_output = css_output.replace(/svg\//g, "");

        response.render('uploaded_image', {
          converted_image: output,
          css_output: css_output
        });
    });


}

module.exports = handleFileUpload;