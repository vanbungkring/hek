# cleancut
A nodejs micro-module to scan through a file and identify the positions to cleanly split the file into multiple chunks based on the line delimiter character.

[![NPM](https://nodei.co/npm/cleancut.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cleancut/)
[![NPM](https://nodei.co/npm-dl/cleancut.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cleancut/)

## Installation
```
npm install cleancut
```

## Quickstart

#### Module
```
var cleancut = require('cleancut');
```

#### Options
```
var filename = './mockaroo_mockdata.csv';

var opts = {
  maxChunks : 10,       // default 2
  minSize   : 1048576,  // default 1048576 bytes = 10 mb
  scanSize  : 10240,    // default 10240 bytes = 10 kb
  linebreak : '\n'      // default '\n'
};
```

#### Synchronous
```
var results = cleancut(filename, opts);
console.log(results.splitAt);
```

#### Promise
```
cleancut(filename, opts, true)
  .then(function(results){
    console.log(results.splitAt);
  });
```

### Callback
```
cleancut(filename, opts, 
  function(err,results){
    console.log(results.splitAt);
  });
```

### Sample output `results.splitAt`
```
[ { _id: 0, start: 0, end: 6358 },
  { _id: 1, start: 6359, end: 12725 },
  { _id: 2, start: 12726, end: 19124 },
  { _id: 3, start: 19125, end: 25433 },
  { _id: 4, start: 25434, end: 31815 },
  { _id: 5, start: 31816, end: 38130 },
  { _id: 6, start: 38131, end: 44506 },
  { _id: 7, start: 44507, end: 50845 },
  { _id: 8, start: 50846, end: 57229 },
  { _id: 9, start: 57230, end: 63533 } ]
```

## cleancut(filename, opts [, callback])
- `filename`: the source file to cut cleanly (e.g. a very big csv file)
- `opts`: configuration file to define how to cut cleanly
  - `maxChunks`: the max number of chunks to cut the file into (default: 2),
  - `minSize`: the min size each chunk must be in bytes (default: 1048576 bytes),
  - `scanSize`: the number of bytes to sample at each cut point (default: 10240 bytes),
  - `linebreak`: the line delimiter (default: '\n')
- `callback(err,results)` (optional): callback function with `err` and `results` arguments.
  - `err`: error message if any
  - `results`: result object
    - `srcfile`: the source file to be cut
    - `linebreak`: the line delimiter for the cut
    - `splitAt`: array of objects specifying the cut points
      - `_id`: chunk id
      - `start`: start position in bytes
      - `end`: end position in bytes
      
- `return`: either a `Promise<results>` or `results` as above in `callback`
      
If `callback` is not defined, cleancut will be a synchronous function returning `result`. 

If callback is defined or `true`, a `Promise` will be returned.