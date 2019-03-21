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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/favorites', (request, response) => {
  database('favorites').select()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/favorites/:id', (request, response) => {
  database('favorites').where('id', request.params.id).select()
    .then(favorite => {
      if (favorite.length) {
        response.status(200).json(favorite);
      } else {
        response.status(404).json({
          error: `Could not find favorite with id ${request.params.id}.`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;
  for (let requiredParameter of ['name', 'artist_name', 'genre', 'rating']) {
    if (!favorite[requiredParameter]) {
      return response
      .status(422)
      .send({ error: `Expected format: { name: <String>, artist_name: <String>, genre: <String>, rating: <Integer> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  database('favorites').insert(favorite, ['id', 'name', 'artist_name', 'genre', 'rating'])
    .then(favorite => {
      response.status(201).json({
        id: favorite[0].id,
        name: favorite[0].name,
        artist_name: favorite[0].artist_name,
        genre: favorite[0].genre,
        rating: favorite[0].rating
      })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/favorites/:id', (request, response) => {
  database('favorites').where({id: request.params.id }).del()
  .then(favoriteId => {
    if(favoriteId) {
      response.status(204).json(favoriteId);
    } else {
      response.status(404).json({
        error: `Unsuccessful deletion of favorite song with id ${request.params.id}.`
      })
    }
  }).catch(error => {
    response.status(500).json({ error })
  })
});

module.exports = {
  app: app,
  database: database
}
