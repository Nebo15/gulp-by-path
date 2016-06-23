'use strict';

var through2 = require('through2');
var callbackCount = require('callback-count');
var streamFromArray = require('stream-from-array');

module.exports = function (transform) {

  var cache = {},
    streams = {};

  function reset () {
    cache = {};
    streams = {};
  }

  return through2.obj(function (file, env, next) {
    if (!cache[file.relative]) cache[file.relative] = [];
    cache[file.relative].push(file);
    next();
  }, function (cb) {

    var self = this;

    var onEnd = callbackCount(Object.keys(cache).length, function () {
      reset();
      cb();
    });

    Object.keys(cache).forEach(function (filePath) {

      streams[filePath] = streamFromArray(cache[filePath], {
        objectMode: true
      });

      streams[filePath].pipe(transform(filePath)).on('data', function (file) {
        self.push(file);
      }).on('end', onEnd.next).on('error', onEnd.next);

    });

  });

};
