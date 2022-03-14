// dependencies
const express = require("express");
const app = express();
var fs = require("fs");
var path = require("path");

const PORT = process.env.PORT || 5000;


// JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// route files
require("./routes/apiRoutes")(app);
require("./.routes/HTMLRoutes")(app);

// listen for calls
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT)
});