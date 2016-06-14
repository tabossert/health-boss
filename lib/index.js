'use strict';

var requireDir = require('require-dir');
var async = require('async');

module.exports = function(opts,config,checkDir) {

  var dir = requireDir(checkDir);
  var resultObj = {};

  return function(req, res) {
    var statusCode = 200;
    async.forEachOf(config, function(v,k,cb) {
      dir[k](opts, v, function(err, result) {
        if (err) {
          statusCode = 500;
        }

        resultObj[k] = result;
        cb();
      });
    }, function () {
        res.status(statusCode).json(resultObj);
    });
  };
};
