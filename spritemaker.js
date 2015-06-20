
var SVGSpriter = require('svg-sprite'),
mkdirp = require('mkdirp'),
path = require('path'),
fs = require('fs'),

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

console.log(__dirname);
console.log(path.resolve('uploads/advising-notes-starred.svg'));

spriter.add(
    path.resolve('uploads/advising-notes-starred.svg'),
    'advising-notes-starred.svg',
    fs.readFileSync('/Users/natu/uzhaipaali/spritemaker/svg_spritemaker/public/uploads/advising-notes-starred.svg', {encoding: 'utf-8'})
);

spriter.add(
    path.resolve('uploads/advising-notes-unstarred.svg'),
    'advising-notes-unstarred.svg',
    fs.readFileSync('/Users/natu/uzhaipaali/spritemaker/svg_spritemaker/public/uploads/advising-notes-unstarred.svg', {encoding: 'utf-8'})
);

spriter.add(
    path.resolve('uploads/orange_pencil.svg'),
    'orange_pencil.svg',
    fs.readFileSync('/Users/natu/uzhaipaali/spritemaker/svg_spritemaker/public/uploads/orange_pencil.svg', {encoding: 'utf-8'})
);


spriter.compile(function(error, result, data){
    for (var type in result.css) {
        mkdirp.sync(path.dirname(result.css[type].path));
        fs.writeFileSync(result.css[type].path, result.css[type].contents);
    }
});