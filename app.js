const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fallback = require('express-history-api-fallback');
const fs = require('fs');
const passport = require('passport');

const app = express();

require('now-logs')('tl8CXu5HkLBNSvxNdpl21FrN');

app.use(passport.initialize());

require('plus.application')
    .create({
        dir: __dirname + '/config',
        env: process.env.NODE_ENV || 'dev'
    })
    .wrap(app);

const FileService = app.container.get('FileService');
FileService.checkAndCreateDir(__dirname + '/resources')
    .then(() => fs.chmod(__dirname + '/resources', 511))
    .catch((err) => console.log('[ERROR]', err.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(require('./routes/router')(app));

app.use((err, req, res, next) => {
    if (err && err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'Invalid token'});
    } else {
        console.log('[ERROR] ', err.message);
        console.log('[ERROR] ', err.stack);
        res.status(500).send();
    }

});

const staticDir = path.join(__dirname, './client/dist');
app.use(express.static(staticDir));
app.use(fallback('index.html', {root: staticDir}));

app.listen(
    app.config.get('port'),
    () => console.log(`Application started ${app.config.get('port')}`)
);