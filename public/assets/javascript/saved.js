$(document).ready(function () {
    var headlinesContainer = $(".article-container");
    $(document).on("click", "btn.delete", deleteHeadline);
    $(document).on("click", "btn.notes", showHeadlineNotes);
    $(document).on("click", "btn.save", saveNote);
    $(document).on("click", "btn.note-delete", deleteNote);

    initPage();

    function initPage() {
        headlinesContainer.empty();
        $.get("/api/headlines?saved=true")
            .then(function (data) {
                if (data && data.length) {
                    renderHeadlines(data);
                } else {
                    alert("No new headlines");
                }
            });
    }

    function renderHeadlines(headlines) {
        var headlinePanels = [];
        for (var i = 0; i < headlines.length; i++) {
            headlinePanels.push(createPanel(headlines[i]));
            headlinesContainer.append(headlinePanels);
        }
    }

    function createPanel(headline) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                headline.title,
                "<a class='btn btn-success save'>",
                "Save Headline",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-link'>",
                headline.link,
                "</div>",
                "<div class='panel-body'>",
                headline.summary,
                "</div>",
                "</div>"
            ].join(""));
        panel.data("_id", headline._id);
        return panel;
    }
    function deleteHeadline() {
        var headlineToDelete = $(this).parents(".panel").data();
        $.ajax({
            method: "DELETE",
            url: "/api/headlines" + headlineToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function showHeadlineNotes() {
        var currentHeadline = $(this).parents(".panel").data();
        $.get("/api/notes" + currentHeadline._id).then(function (data) {
            var modalText = [
                "<div class='container-fluid text-container'>",
                "<h4>Notes",
                currentHeadline._id,
                "</h4>",
                "<br>",
                "<ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentHeadline._id,
                notes: data || []
            };
            $(".btn.save").data("headline", noteData);
            renderNotesList(noteData);
        });
    }

    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "There are no notes for this headline.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>X</button>",
                    "</li>"
                ].join(""));
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
            $(".note-container").append(notesToRender);
        }
    }

    function saveNote() {
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function () {
                bootbox.hideAll();
            });
        }
    }

    function deleteNote() {
        var noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function () {
            bootbox.hideAll();
        });
    }

});

