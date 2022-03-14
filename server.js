// dependencies
const express = require("express");
const app = express();
var fs = require("fs");
var path = require("path");

const PORT = process.env.PORT || 3001;


// JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

module.exports = function(app) {
    var notes;
// requests
    app.get("/api/notes", function(req, res) {
        
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    });

    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            notes.push(newNote);
            notes.forEach( function(item, i) {
                item.id = 1 + i;
            })
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if(err) throw err;
            })
        })
        res.json(newNote)
    });


    app.delete("/api/notes/:id" , function(req, res) {
        var delNoteId = req.params.id;
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            notes.forEach(function(thisNote, i) {
                if (thisNote.id.toString() === delNoteId) {
                    notes.splice(i, 1)
                }
            })
// concat to file
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if (err) throw err;
            })
        })
        res.send("file")
    })
}

module.exports = function(app) {
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}


// listen for calls
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT)
});