'use strict';

(function (module) {

  'use strict';
  var fs = require('graceful-fs');

  module.exports = scanFile;

  /*
   @param opts = {
      srcfile   : String,
      maxChunks : Number,
      minSize   : Number,
      scanSize  : Number,
      linebreak : String|Regex
    @return Promise<opts.splitAt:Array>
  }; 
  */
  function scanFile(srcfile, _ref, callback) {
    var _ref$linebreak = _ref.linebreak;
    var linebreak = _ref$linebreak === undefined ? '\n' : _ref$linebreak;
    var _ref$minSize = _ref.minSize;
    var minSize = _ref$minSize === undefined ? 1048576 : _ref$minSize;
    var _ref$scanSize = _ref.scanSize;
    var scanSize = _ref$scanSize === undefined ? 10240 : _ref$scanSize;
    var _ref$maxChunks = _ref.maxChunks;
    var maxChunks = _ref$maxChunks === undefined ? 2 : _ref$maxChunks;

    var filesize = fs.statSync(srcfile).size;

    if (filesize < minSize) return [{ _id: 0, start: 0, end: filesize }];

    // est the number of chunks
    var n = Math.ceil(Math.min(filesize / minSize, maxChunks));
    var chunkSize = Math.ceil(filesize / n);
    scanSize = Math.min(scanSize, chunkSize);
    console.log('breaking "' + srcfile + '" (' + filesize + ' bytes) into ' + n + ' chunks of ' + chunkSize + ' bytes each.');

    if (callback) return processPromise(srcfile, n, { scanSize: scanSize, chunkSize: chunkSize, linebreak: linebreak, filesize: filesize, callback: callback });
    return processSync(srcfile, n, { scanSize: scanSize, chunkSize: chunkSize, linebreak: linebreak, filesize: filesize });
  }

  function processSync(srcfile, numChunks, _ref2) {
    var scanSize = _ref2.scanSize;
    var chunkSize = _ref2.chunkSize;
    var linebreak = _ref2.linebreak;
    var filesize = _ref2.filesize;

    var fd = fs.openSync(srcfile, 'r');
    var array = [];
    for (var cnt = 0; cnt < numChunks; ++cnt) {
      array.push(readSync(fd, cnt, { scanSize: scanSize, chunkSize: chunkSize, linebreak: linebreak }));
    }
    array.sort(function (a, b) {
      return a - b;
    });
    var splitAt = array.map(function (d, i) {
      var next = array[i + 1];
      return next ? { _id: i, start: d, end: next - 1 } : { _id: i, start: d, end: filesize };
    });
    return { srcfile: srcfile, linebreak: linebreak, splitAt: splitAt };
  }

  function processPromise(srcfile, numChunks, _ref3) {
    var scanSize = _ref3.scanSize;
    var chunkSize = _ref3.chunkSize;
    var linebreak = _ref3.linebreak;
    var filesize = _ref3.filesize;
    var callback = _ref3.callback;

    var promises = [];
    var fd = fs.openSync(srcfile, 'r');
    for (var cnt = 0; cnt < numChunks; ++cnt) {
      promises.push(readPromise(fd, cnt, { scanSize: scanSize, chunkSize: chunkSize, linebreak: linebreak }));
    }
    return Promise.all(promises).then(function (array) {
      array.sort(function (a, b) {
        return a - b;
      });
      var splitAt = array.map(function (d, i) {
        var next = array[i + 1];
        return next ? { _id: i, start: d, end: next - 1 } : { _id: i, start: d, end: filesize };
      });
      var ret = { srcfile: srcfile, linebreak: linebreak, splitAt: splitAt };
      if (typeof callback === 'function') callback(null, ret);
      return ret;
    })['catch'](function (err) {
      console.log(err, err.stack);
      if (typeof callback === 'function') callback(err, null);
    });
  }

  function readPromise(fd, cnt, _ref4) {
    var scanSize = _ref4.scanSize;
    var chunkSize = _ref4.chunkSize;
    var linebreak = _ref4.linebreak;

    return new Promise(function (resolve, reject) {
      var pos = cnt * chunkSize;
      var buffer = new Buffer(scanSize);
      var cb = function cb(err, bytesRead, buffer) {
        if (err) {
          throw err;
        } else {
          resolve(findLinebreak(buffer.slice(0, bytesRead).toString(), pos, linebreak));
        }
      };
      fs.read(fd, buffer, 0, scanSize, pos, cb);
    });
  }

  function readSync(fd, cnt, _ref5) {
    var scanSize = _ref5.scanSize;
    var chunkSize = _ref5.chunkSize;
    var linebreak = _ref5.linebreak;

    var pos = cnt * chunkSize;
    var buffer = new Buffer(scanSize);
    var bytesRead = fs.readSync(fd, buffer, 0, scanSize, pos);
    return findLinebreak(buffer.slice(0, bytesRead).toString(), pos, linebreak);
  }

  function findLinebreak(str, pos, linebreak) {
    var index = str.indexOf(linebreak);
    if (index < 0) throw 'No linebreak found!';
    return pos ? pos + index : 0;
  }
})(module);
