
exports.seed = function(knex, Promise) {
  return knex('playlists_favorites').del()
  .then(() => knex('playlists').del())
  .then(() => knex('favorites').del())
    .then(() => {
      return Promise.all([
        knex('favorites').insert([{
          name: 'Crazy',
          artist_name: 'Patsy Cline',
          genre: 'Country',
          rating: 98
        }, {
          name: 'Soy Anormal',
          artist_name: 'Residente',
          genre: 'Rap',
          rating: 100
        }
      ], 'id')
        .then((favorites) => {
          return knex('playlists').insert([
            { name: 'Cleaning House' },
            { name: 'Party Time' }
          ], 'id')
          .then((playlists) => {
            return knex('playlists_favorites').insert([
              { playlist_id: playlists[0], favorite_id: favorites[0]},
              { playlist_id: playlists[1], favorite_id: favorites[0]}
            ])
          })
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
