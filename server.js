// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

var notes;

// JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// listen for calls
app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT)
});