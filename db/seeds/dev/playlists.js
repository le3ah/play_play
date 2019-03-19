

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playlists').del()
      // Inserts seed entries
    .then(() => {
      return Promise.all([
        knex('playlists').insert({
          name: 'Cleaning House'
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
