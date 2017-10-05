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


driver.get('http://localhost:8080');

function scrape() {
    setTimeout(function () {

        driver.sleep(2000).then(() => {
            driver.findElement(
                By.css('.navigation-next')
            ).click();
        });

        driver.sleep(2000).then(function () {
            driver.getPageSource().then(function (body) {

                var datax = scrapeIt.scrapeHTML(body, {
                    title: {
                        selector: "p:contains('Original Title')",
                        convert: function (x) {
                            return x.replace('Original Title: ', '');
                        }
                    }
                });

                console.log(datax);
                jsonfile.writeFile(file, datax, { flag: 'a' }, function (err) {
                    console.error(err);
                    scrape();
                });
            });
        });
    }, 1000)
}

scrape();

//driver.quit();
