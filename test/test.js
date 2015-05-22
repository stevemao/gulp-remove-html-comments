'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var join = require('path').join;
var removeHtmlComments = require('../');

it('should remove comments in html', function (cb) {
  var fixture = fs.readFileSync(join(__dirname, 'fixture.html'));
  var expected = fs.readFileSync(join(__dirname, 'expected.html'), 'utf8');

  var stream = removeHtmlComments();

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), expected);
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    cwd: __dirname,
    base: __dirname + '/fixture',
    path: __dirname + '/fixture/fixture.css',
    contents: fixture
  }));

  stream.end();
});
