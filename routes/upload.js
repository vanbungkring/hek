var express = require('express');
var request = require('request');
var router = express.Router();
var paths = require('path');
var fs = require('fs');
var request = require('request');
const batch = parseInt(new Date().getTime() / 1000);
const csv = require('csvtojson')
router.post('/', function(req, res, next) {
    console.log(req.body)
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.csvFile;

    file.mv('./public/source/csv_' + batch + '.csv', function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        var jsonData = [];
        var csvData = [];
        var path = ("./public/source/csv_" + batch + '.csv');
        console.log('data-->', path);
        csv().fromFile(path).on('json', (jsonObj) => {
            jsonData.push(jsonObj);
        }).on('csv', (csvObj) => {
            var jsonRaw = {};
            csvData.push(csvObj);
        }).on('done', (error) => {
            var key = Object.keys(jsonData[0]);
            csvData.unshift(key);
            console.log(csvData[0]);

            var url = 'http://nucare.zispro.co:5005/function/' + req.body.method1;
            request.post({
                url: url,
                json: csvData
            }, function(err, httpResponse, body) {
                if (err) {} else {
                    res.render('home/result', {
                        layout: 'layout/common.layout.ejs',
                        title: 'Tambah konten',
                        data: body
                    });
                }
            })

        })
    });

})
router.post('/forest/', function(req, res, next) {
    console.log(req.body)
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.csvFile;

    file.mv('./public/source/csv_' + batch + '.csv', function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        var jsonData = [];
        var csvData = [];
        var path = ("./public/source/csv_" + batch + '.csv');
        var pathString = paths.resolve(__dirname, '../public/source/','csv_'+batch + '.csv');
        var url = 'http://nucare.zispro.co:5006/fort/log';
        request.post({
            url: url,
            json: {'data':pathString,'target':'learning_label'}
        }, function(err, httpResponse, body) {
            if (err) {} else {
              res.json(body);
            }
        })
    });

})
module.exports = router;
