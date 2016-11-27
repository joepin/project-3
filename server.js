'use strict';
require('dotenv').config({ silent: true });
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');

const app          = express();
const PORT         = process.argv[2] || process.env.port || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1', require('./routes/api.js'));


// import some new stuff
const React = require('react');
// we'll use this to render our app to an html string
const { renderToString } = require('react-dom/server');
// and these to match the url to routes and then render
const { match, RouterContext } = require('react-router');
const routes = require('./src/routes.js');

// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!DOCTYPE html>
    <!--[if lt IE 7 ]>             <html class="ie6" lang="en"> <![endif]-->
    <!--[if IE 7 ]>                <html class="ie7" lang="en"> <![endif]-->
    <!--[if IE 8 ]>                <html class="ie8" lang="en"> <![endif]-->
    <!--[if IE 9 ]>                <html class="ie9" lang="en"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
      <head>
        <meta charset="utf-8">
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <title>ReactJS Hello World</title>
        <link href="/css/main.css" rel="stylesheet">
      </head>
      <body>
        <div id="root-container">${appHtml}</div>
        <script src="/js/main.js" type="text/javascript"></script>
      </body>
    </html>
   `
}


app.listen(PORT, () => console.warn(`Server here! Listening on port ${PORT}!`));
