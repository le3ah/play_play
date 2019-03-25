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


module.exports = {
  index, show
}
