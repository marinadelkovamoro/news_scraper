module.exports = function (router) {
    router.get("/", (req, res) => {
        res.render("home");
    });


    router.get("/saved", (req, res) => {
        res.render("saved");
    });
}