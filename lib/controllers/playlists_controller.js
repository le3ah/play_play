const playlist = require('../models/playlist')

const index = (request, response) => {
  playlist.all()
    .then((playlists) => {
      response.status(200).json(playlists);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
}

module.exports = {
  index,
}
