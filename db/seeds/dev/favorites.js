
exports.seed = function(knex, Promise) {
  return knex('playlists_favorites')
  .then(() => knex('playlists'))
  .then(() => knex('favorites'))
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
        }, {
          name: 'Ruben and Cherise',
          artist_name: 'Jerry Garcia',
          genre: 'Esoteric',
          rating: 100
        }, {
          name: 'Under Pressure',
          artist_name: 'Queen',
          genre: 'Rock',
          rating: 87
        }, {
          name: 'Trouble in the Country',
          artist_name: 'Corb Lund',
          genre: 'AgTrag',
          rating: 55
        }, {
          name: 'Back Pocket',
          artist_name: 'Vulfpeck',
          genre: 'Funk',
          rating: 80
        }, {
          name: 'The Waker',
          artist_name: 'Widespread Panic',
          genre: 'Jam Band',
          rating: 40
        }, {
          name: 'Despacito',
          artist_name: 'Luis Fonsi',
          genre: 'Magical',
          rating: 43
        }, {
          name: 'Epic',
          artist_name: 'Faith No More',
          genre: 'Rock',
          rating: 23
        }, {
          name: "Nobody's Fool",
          artist_name: 'Shakey Graves',
          genre: 'Rock',
          rating: 62
        }
      ], 'id')
        .then((favorites) => {
          return knex('playlists').insert([
            { name: 'Cleaning House' },
            { name: 'Party Time' },
            { name: 'Leah & Mary Had a Little Beer' },
            { name: 'Code Party' }
          ], 'id')
          .then((playlists) => {
            return knex('playlists_favorites').insert([
              { playlist_id: playlists[0], favorite_id: favorites[0]},
              { playlist_id: playlists[0], favorite_id: favorites[1]},
              { playlist_id: playlists[0], favorite_id: favorites[2]},
              { playlist_id: playlists[1], favorite_id: favorites[0]},
              { playlist_id: playlists[1], favorite_id: favorites[1]},
              { playlist_id: playlists[3], favorite_id: favorites[9]},
              { playlist_id: playlists[3], favorite_id: favorites[8]},
              { playlist_id: playlists[3], favorite_id: favorites[7]},
              { playlist_id: playlists[3], favorite_id: favorites[5]},
              { playlist_id: playlists[4], favorite_id: favorites[0]},
              { playlist_id: playlists[4], favorite_id: favorites[1]},
              { playlist_id: playlists[4], favorite_id: favorites[2]},
              { playlist_id: playlists[4], favorite_id: favorites[3]},
              { playlist_id: playlists[4], favorite_id: favorites[4]},
              { playlist_id: playlists[4], favorite_id: favorites[5]},
              { playlist_id: playlists[4], favorite_id: favorites[6]}
            ])
          })
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
