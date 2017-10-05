const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');

var file = 'gitbook.json'

var options = {
    url: 'http://localhost:8080/',
    headers: {
        'User-Agent': 'request'
    }
};

var data = {
    // Fetch the articles
    articles: {
        listItem: "li.chapter:not(.active)", 
        data: {
            url: {
                selector: "a",
                attr: "href",
                convert: function(x){
                    return options.url + x;
                }
            },
            title: "a"
        }
    }
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        page = scrapeIt.scrapeHTML(body, data);

        jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
            console.error(err || 'success')
        });
    }
}

request(options, callback);
