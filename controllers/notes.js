const Note = require("../models/Note");

module.exports = {
    get: function (data, callback) {
        Note.find({
            _headlineId: data._id
        }, callback);
    },
    save: function (data, callback) {
        var newNote = {
            _headlineId: data._id,
            // what the user types
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                callback(doc);
            }
        });
    },
    delete: function(data, callback) {
        Note.remove({
            _id: data._id
        }, callback);
    }
};