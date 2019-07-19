const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

const router = express.Router();

require("./config/routes")(router);

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(router);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sandiegotheatreHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })


app.listen(PORT, function () {
    console.log("App running and server listening on port:" + PORT);
});
