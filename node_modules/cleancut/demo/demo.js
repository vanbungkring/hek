'use strict';

var cleancut = require('../index.js');

var filename = './mockaroo_mockdata.csv';
var opts = {
  maxChunks : 10,
  minSize   : 1024,
  scanSize  : 512,
  linebreak : '\n'
};

var callback = function(err,results){
  console.log(results.splitAt);
};

cleancut(filename, opts, callback);

cleancut(filename, opts, true)
  .then(function(d){
    console.log(d.splitAt);
  });

console.log(cleancut(filename, opts).splitAt);
