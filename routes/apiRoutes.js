
var fs = require("fs");


module.exports = function(app) {
    var notes;
// requests
    app.get("/api/notes", function(req, res) {
        // THIS READS OUR db.json FILE...
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