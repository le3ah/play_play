const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Songs';

app.get('/api/v1/favorites', (request, response) => {
  database('favorites').select()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = {
  app: app,
  database: database
}
