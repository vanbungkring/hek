var express = require('express');
var router = express.Router();
var fs = require('fs')
const csv = require('csvtojson')
var fastCsv = require('fast-csv');
var path = ("public/source/hack_data.csv")
var stream = fs.createReadStream(path);
var models = require('../models/all-models.js');
/* GET home page. */
var async = require('async');
var output = [];
const batch = parseInt(new Date().getTime() / 1000);
router.get('/', function(req, res, next) {
    //
    // var jsonData = [];
    // csv().fromFile(path).on('json', (jsonObj) => {
    //     var jsonRaw = {};
    //     jsonRaw.batch = batch;
    //     jsonRaw.data = jsonObj;
    //     jsonData.push(jsonRaw);
    // }).on('done', (error) => {
    //
    //     models.model.insertMany(jsonData).then(function(mongooseDocuments) {
    //       models.model.find({'batch':batch}).where("data.learning_label").ne('1').count().exec(function(err,result){
    //         res.json(result);
    //       })
    //         /* ... */
    //     }).catch(function(err) {
    //
    //
    //     });
    // })
    //
    //
    // var data = {};
    // var key = [];
    // var uniqueValues = [];
    // var mykeys;
    // async.waterfall([
    //     function(callback) {
    //         models.model.findOne().exec(function(err, result) {
    //             key = Object.keys(result.data);
    //             callback(null, key);
    //         })
    //     },
    //     function(arg1, callback) {
    //         // arg1 now equals 'three'
    //         console.log(arg1);
    //         callback(null, arg1);
    //     }
    // ], function(err, result) {
    //
    //     for (var i = 0; i < result.length; i++) {
    //       var key = '$data.'+result[i]
    //         models.model.aggregate([
    //             {
    //                 $group: {
    //                     _id: key,
    //                     uniqueValues: {
    //                         $addToSet: key
    //                     }
    //                 }
    //             }
    //         ]).exec(function(err, resultagg) {
    //         console.log('resultagg.length==>',resultagg.length);
    //         })
    //     };
    //
    // });
    /* GET users listing. */
    res.render('home/index', {
                  layout: 'layout/common.layout.ejs',
                  title: 'Tambah konten',
              });

});

module.exports = router;
