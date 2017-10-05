var request = require('request');
var scrapeIt = require('scrape-it');

var options = {
    url: 'http://localhost:8080',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        obj = scrapeIt.scrapeHTML(body, {
            title: '.normal h1',
            url: {
                selector: '.gitbook-link',
                attr: 'href'
            }
        })
        console.log(obj)
    }
}

request(options, callback);