const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        titlePage: 'Home Page.',
        textBody: 'Welcome to our website.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        titlePage: 'About Page.'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Not found page.'
    });
})

app.listen(3000);