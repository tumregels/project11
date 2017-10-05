const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');

var file = 'gitbook.json'

var options = {
    url: 'http://localhost:8080',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        page = scrapeIt.scrapeHTML(body, {
            title: '.normal h1',
            url: {
                selector: '.gitbook-link',
                attr: 'href'
            }
        })
        jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
            console.error(err || 'success')
        });
    }
}

request(options, callback);

