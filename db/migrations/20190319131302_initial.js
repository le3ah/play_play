
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
      table.integer('favorite_id').unsigned().references('favorites.id').onDelete('CASCADE');
      table.integer('playlist_id').unsigned().references('playlists.id').onDelete('CASCADE');
    }),

    knex.schema.createTable('playlists', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    knex.schema.dropTable('playlists_favorites'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('playlists')
  ])
};
