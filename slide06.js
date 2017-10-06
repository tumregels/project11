var fs = require("fs");
var open = require("open");
var scrapeIt = require("scrape-it");
var jsonfile = require("jsonfile");
var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;
var chrome = require('selenium-webdriver/chrome');

var file = "datax.json";

var options = new chrome.Options().setChromeBinaryPath("/usr/bin/chromium-browser")//.headless()
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

driver.get('http://localhost:8080/940.html');

function scrape() {
    setTimeout(function () {
        var stop = false;

        driver.sleep(2000).then(function(){
            var nav = driver.findElement(
                By.css('.navigation-next')
            ).then(function (webElement) {
                console.log('Element exists');
                webElement.click();
            }, function (err) {
                if (err.name === "NoSuchElementError")
                    console.log("Element was missing!");
            });
        });

        driver.sleep(2000).then(function () {
            driver.getPageSource().then(function (body) {

                var datax = scrapeIt.scrapeHTML(body, {
                    title: {
                        selector: "p:contains('Original Title')",
                        convert: function (x) {
                            return x.replace('Original Title: ', '');
                        }
                    },
                    end: {
                        selector: "p",
                        convert: function (x) {
                            console.log(x)
                            return '-'
                        }

                    }
                });

                console.log(datax);
                jsonfile.writeFile(file, datax, { flag: 'a' }, function (err) {
                    console.error(err || 'success');
                    scrape();
                });
            });
        });
    }, 1000)
}

scrape();

//driver.quit();
