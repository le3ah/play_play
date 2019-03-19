
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('favorites', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('artist_name');
      table.string('genre');
      table.integer('rating');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('playlists_favorites', function(table) {
      table.increments('id').primary();
      table.integer('favorite_id').unsigned().references('favorites.id');
      table.integer('playlist_id').unsigned().references('playlists.id');
    }),


  ])
};

exports.down = function(knex, Promise) {

};
