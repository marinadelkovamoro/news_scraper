$(document).ready(function () {
    var headlinesContainer = $(".article-container");
    $(document).on("click", "btn.save", saveHeadlines);
    $(document).on("click", ".scrape-new", scrapeHeadines);

    initPage();

    function initPage() {
        headlinesContainer.empty();
        $.get("/api/headlines?saved=false")
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

    function saveHeadlines() {
        var headlineToSave = $(this).parents(".panel").data();
        headlineToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: headlineToSave
        })
        .then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function scrapeHeadines() {
        $.get("/api/fetch")
        .then(function(data) {
            initPage();
            alert(data.message);
        });
    }

})