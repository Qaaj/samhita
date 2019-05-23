
exports.up = function(knex) {
  return knex.schema.createTable('pubmed', function (table) {
    table.increments('id');
    table.uuid('uuid');
    table.string('abstract');
    table.datetime('date');
    table.text('keywords');
    table.float('author');
    table.timestamp('imported').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pubmed');
};
