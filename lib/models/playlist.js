const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration);

const all = () => database('playlists')
  .join('playlists_favorites', {'playlists.id': 'playlists_favorites.playlist_id'})
  .join('favorites', { 'favorites.id': 'playlists_favorites.favorite_id' })
  .groupBy('playlists.id')
  .select(['playlists.id as id', 'playlists.name as playlist_name',
    database.raw('json_agg(favorites) as favorite')
    ])

module.exports ={
  all
}
