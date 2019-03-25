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
module.exports = {
  index,
}
