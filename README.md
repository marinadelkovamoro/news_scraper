# news_scraper

A web app that lets users view and leave comments on the latest headlines scraped from a website

## How it works:

When a user visits the site, the app scrapes headlines from https://www.sandiegotheatres.org/ and displays them for the user. Each scraped headline and accompanying headline information are saved to the application's database. 

The app scrapes and display the following information for each headline:

 * Headline - the title of the headline
 * Summary - a short summary of the headline
 * URL - the url to the original headline

Users are also able to leave comments on the headlines displayed and revisit them later. The comments are saved to the database as well and associated with their headlines. 

Lastly, users can delete comments left on headlines.

All stored comments are visible to the user.

## Technologies used:

* node.js
* express
* express-handlebars
* mongoose
* cheerio
* axios

## Deployed website on HEROKU:
https://guarded-waters-78630.herokuapp.com/
