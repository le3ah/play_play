const playlist = require('../models/playlist')

const index = (request, response) => {
  playlist.all()
  .then((all) => {
    all.forEach( list => {
      list.favorite.forEach( fave => {
        delete fave.created_at;
        delete fave.updated_at
      });
    });
    response.status(200).json(all);
  })
    .catch((error) => {
      response.status(500).json({ error });
    })
}

module.exports = {
  index,
}
