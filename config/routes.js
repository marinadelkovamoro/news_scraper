const express = require('express')
const scrape = require("../scripts/scrape");
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");
const db = require("../models/Headline");

const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

// creating a new router using express so that we can hit the routes
const router = express.Router(); 


router.get("/", (req, res) => {
    res.render("home");
});

router.get("/scrape", (req, res) => {
    console.log("inside the scrape route");
   //var data = scrape();
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
        console.log("headlines: "+ JSON.stringify(headlines));
    });
   db.Headline.create(headlines)
   .then(function(dbHeadline){
     // View the added result in the console
     console.log(dbHeadline);
   })
   .catch((err) => {
     // If an error occurred, log it
     console.log(err);
   });
   res.send("complete");
});

router.get("/saved", (req, res) => {
    res.render("saved");
});

router.get("api/fetch", (req, res) => {
    headlinesController.fetch((err, docs) => {
        if (!docs || docs.insertedCount === 0) {
            res.json({
                message: "No new headlines"
            });
        } else {
            res.json({
                message: docs.insertedCount + "new headlines added"
            });
        }
    });
});

router.get("/api/headlines", (req, res) => {
    var query = {};
    if (req.query.saved) {
        query = req.query;
    }

    headlinesController.get(query, function (data) {
        res.json(data);
    });
});

router.delete("/api/headlines/:id", (req, res) => {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function (err, data) {
        res.json(data);
    });
});

router.patch("/api/headlines", (req, res) => {
    headlinesController.update(req.body, function (err, data) {
        res.json(data);
    });
});

router.get("/api/notes/:headline_id?", (req, res) => {
    var query = {};
    if (req.params.healine_id) {
        query._id = req.params.healine_id;
    }

    notesController.get(query, function (err, data) {
        res.json(data);
    });
});

router.delete("/api/notes/:id", (req, res) => {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function (err, data) {
        res.json(data);
    });
});

router.post("/api/notes", (req, res) => {
    notesController.save(req.body, function (data) {
        res.json(data);
    });
});

module.exports = router;