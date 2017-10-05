var fs = require("fs");
var open = require("open");
var scrapeIt = require("scrape-it");
var jsonfile = require("jsonfile");
var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;
var chrome = require('selenium-webdriver/chrome');

var file = "datax.json";

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    //.setChromeOptions( new chrome.Options().headless())
    .build();

function scrape() {
    driver.get('http://localhost:8080');

    driver.sleep(2000).then(() => {
        driver.findElement(
            By.css('.navigation-next')
        ).click();
    });

    driver.sleep(2000).then(function () {
        driver.getPageSource().then(function (body) {

            //console.log(html)
            f = 'file.html'
            fs.writeFile(f, body, function (err) {
                if (err) { throw (err); };
                console.log(__dirname + f);
                open('file://' + __dirname + '/' + f);
            });

            var datax = scrapeIt.scrapeHTML(body, {
                title: {
                    selector: "p:contains('Original Title')",
                    convert: function (x) {
                        return x.replace('Original Title: ', '');
                    }
                }
            });
            
            console.log(datax);
            jsonfile.writeFile(file, datax, { spaces: 2 }, function (err) {
                console.error(err)
            });
        });
    });
}

scrape()

driver.quit();
