const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

const router = express.Router();

app.use(express.static("public"));
app.use(router);

app.listen(PORT, function () {
    console.log("App running and server listening on port:" + PORT);
});

