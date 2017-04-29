(function(module){
  
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
  function scanFile(srcfile,{
    linebreak:linebreak='\n',
    minSize:minSize = 1048576,
    scanSize:scanSize = 10240,
    maxChunks:maxChunks = 2
    },callback){

    var filesize = fs.statSync(srcfile).size;

    if (filesize < minSize) return [{_id:0, start:0, end:filesize}];
    
    // est the number of chunks
    var n = Math.ceil(Math.min(filesize/minSize,maxChunks));
    var chunkSize = Math.ceil(filesize/n);
    scanSize = Math.min(scanSize,chunkSize);
    console.log(`breaking "${srcfile}" (${filesize} bytes) into ${n} chunks of ${chunkSize} bytes each.`); 
    
    if (callback) return processPromise(srcfile,n,{scanSize,chunkSize,linebreak,filesize,callback});
    return processSync(srcfile,n,{scanSize,chunkSize,linebreak,filesize});
  }
  
  function processSync(srcfile,numChunks,{
    scanSize:scanSize,
    chunkSize:chunkSize,
    linebreak:linebreak,
    filesize:filesize
    }){
    var fd = fs.openSync(srcfile, 'r');
    var array = [];
    for (let cnt=0;cnt<numChunks;++cnt){
      array.push(readSync(fd,cnt,{scanSize,chunkSize,linebreak}));
    }
    array.sort((a,b)=>a-b);
    var splitAt = array.map((d,i)=>{
      let next = array[i+1];
      return (next)?{_id:i,start:d,end:next-1}:{_id:i,start:d,end:filesize};
    });
    return {srcfile,linebreak,splitAt};
  }
  
  function processPromise(srcfile,numChunks,{
    scanSize:scanSize,
    chunkSize:chunkSize,
    linebreak:linebreak,
    filesize:filesize,
    callback:callback
    }){
      
    var promises = [];
    var fd = fs.openSync(srcfile, 'r');
    for (let cnt=0;cnt<numChunks;++cnt){
      promises.push(readPromise(fd,cnt,{scanSize,chunkSize,linebreak}));
    }
    return Promise.all(promises)
      .then(function(array){
        array.sort((a,b)=>a-b);
        var splitAt = array.map((d,i)=>{
          let next = array[i+1];
          return (next)?{_id:i,start:d,end:next-1}:{_id:i,start:d,end:filesize};
        });
        var ret = {srcfile,linebreak,splitAt};
        if (typeof callback === 'function') callback(null,ret);
        return ret;
      })
      .catch(function(err){
        console.log(err,err.stack);
        if (typeof callback === 'function') callback(err,null);
      });
  }

  function readPromise(fd,cnt,{scanSize:scanSize,chunkSize:chunkSize,linebreak:linebreak}){
    return new Promise(function(resolve,reject){
      let pos = cnt * chunkSize;
      let buffer = new Buffer(scanSize);
      let cb = function(err, bytesRead, buffer){
        if (err) {
          throw err;
        }
        else {
          resolve(findLinebreak(
            buffer.slice(0,bytesRead).toString(),
            pos,
            linebreak
          ));
        }
      };
      fs.read(fd, buffer, 0, scanSize, pos, cb);
    });
  }
  
  function readSync(fd,cnt,{scanSize:scanSize,chunkSize:chunkSize,linebreak:linebreak}){
    let pos = cnt * chunkSize;
    let buffer = new Buffer(scanSize);
    let bytesRead = fs.readSync(fd, buffer, 0, scanSize, pos);
    return findLinebreak(
      buffer.slice(0,bytesRead).toString(),
      pos,
      linebreak
    );
  }

  function findLinebreak(str,pos,linebreak){
    var index = str.indexOf(linebreak);
    if (index < 0) throw 'No linebreak found!';
    return (pos)?pos+index:0;
  }
  

})(module);