var express = require('express');
var request = require('request');
var router = express.Router();
const batch = parseInt(new Date().getTime() / 1000);
const csv = require('csvtojson')
router.get('/', function(req, res, next) {
    var url = 'http://nucare.zispro.co:5005/functions';
    // request
    //   .get('http://nucare.zispro.co:5005/functions')
    //   .on('end', function(response) {
    //     console.log(response);
    //   })
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const responseBody = JSON.parse(body)
            res.json(responseBody);
        } else {
            console.log("Got an error: ", error, ", status code: ", response.statusCode)
        }
    })
})
module.exports = router;
