const cheerio = require("cheerio");
const request = require("request");

var scrape = function (callback) {
    request("https://sandiegotheatres.org/", (err, res, body) => {

        const $ = cheerio.load(body);

        var headlines = [];

        $("div.post").each(function (i, element) {

            const title = $(element).find("a").attr("title");
            const link = $(element).find("a").attr("href");
            const summary = $(element).find("p").text();

            var headlinesToAdd = {
                title: title,
                link: link,
                summary: summary,
                saved: false
            };
            headlines.push(headlinesToAdd);
        });
        callback(headlines);
    });
};

module.exports = scrape;