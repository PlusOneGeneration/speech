const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('plus.application')
  .create({
    dir: __dirname + '/config',
    env: process.env.NODE_ENV || 'dev'
  })
  .wrap(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(require('./routes/router')(app));

app.use((err, req, res, next) => {
  console.log('[ERROR] ', err.message);
  console.log('[ERROR] ', err.stack);
  res.status(500).send();
});

app.listen(
  app.config.get('port'),
  () => console.log(`Application started ${app.config.get('port')}`)
);
