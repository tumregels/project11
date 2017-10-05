const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');

var file = 'gitbook.json'

jsonfile.readFile(file, function (err, obj) {
    console.dir(err || 'success');
    scraperloop(obj.articles, 0);
    //scraperloopWrong(obj.articles);
})

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        page = scrapeIt.scrapeHTML(body, {
            title: {
                selector: "p:contains('Original Title')",
                convert: function (x) {
                    return x.replace('Original Title: ', '');
                }
            }
        });
        console.log(page);
    }
}

function scraperloop(arr, i) {
    setTimeout(function () {
        var url = arr[i].url;
        request(url, callback)
        scraperloop(arr, ++i)
    }, 2000)
}

function scraperloopWrong(arr) {
    for (var i in arr) {
        var url = arr[i].url;
        request(url, callback)
    }
}


