const scrape = require("../scripts/scrape");

const Headline = require("../models/Headline");

module.exports = {
    fetch: function (callback) {
        scrape(function (data) {
            var headlines = data;
            for (var i = 0; i < headlines.lenght; i++) {
                headlines[i].saved = false;
            }
            // mongo syntax for inserting many headlines without stopping the code even if there is an error in some of the data that gets scraped; the code will skip over this data 
            Headline.collection.insertMany(headlines, function (error, response) {
                callback(error, response);
            });
        });
    },
    delete: function (query, callback) {
        Headline.remove(query, callback);
    },
    get: function (query, callback) {
        Headline.find(query)
            .exec((err, doc) => callback(doc));
    },
    // updates new headlliness with relevant id
    // updates any information that is passed with these new headlines
    update: function (query, callback) {
        Headline.update({ _id: query._id }, {
            $set: query
        }, {}, callback);
    }
}
