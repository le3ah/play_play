const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const favorites = require('./lib/routes/api/v1/favorites')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration);

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Songs';

app.use('/api/v1/favorites', favorites)

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = {
  app: app,
  database: database
}
