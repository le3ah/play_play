const favorite = require('../models/favorite')

const index = (request, response) => {
  favorite.all()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}
const show = (request, response) => {
  favorite.find(request.params.id)
    .then((favorite) => {
      if(favorite.length){
        response.status(200).json(favorite);
      } else {
        response.status(404).json({
          error: `Could not find favorite with id ${request.params.id}.`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}
const create = (request, response) => {
  const newFavorite = request.body;
  for (let requiredParameter of ['name', 'artist_name', 'genre', 'rating']) {
    if (!newFavorite[requiredParameter]) {
      return response
      .status(422)
      .send({ error: `Expected format: { name: <String>, artist_name: <String>, genre: <String>, rating: <Integer> }. You're missing a "${requiredParameter}" property.`});
    }
  }
  favorite.create(newFavorite)
    .then(favorite => {
      response.status(201).json({
              id: favorite[0].id,
              name: favorite[0].name,
              artist_name: favorite[0].artist_name,
              genre: favorite[0].genre,
              rating: favorite[0].rating
            });
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

module.exports = {
  index, show, create
}
