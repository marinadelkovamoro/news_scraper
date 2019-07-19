const scrape = require("../scripts/scrape");

const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");


module.exports = function (router) {
    router.get("/", (req, res) => {
        res.render("home");
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
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post("/api/notes", (req, res) => {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
}