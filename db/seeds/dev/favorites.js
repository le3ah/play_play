
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
      // Inserts seed entries
    .then(() => {
      return Promise.all([
        knex('favorites').insert({
          name: 'Crazy',
          artist_name: 'Patsy Cline',
          genre: 'Country',
          rating: 98
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
