const tasks = require('./tasks');
const helpers = require('./helpers');

const knex = require('knex')(require('./knexfile.js'));

jake.addListener('complete', function () {
  process.exit();
});

desc('Import Pubmed Sample Data.');
task('pubmed_sample', { async: true }, async () => {
  console.log('Running CC import.')
  const entries = await tasks.pubmed('data/_2018-CC.csv');
  const sql = entries.map(helpers.getData('CC'))
  await knex('transactions_raw').insert(sql);
});

desc('Deleta all data.');
task('clear', async () => {
  await knex.table('transactions_raw').truncate();
});


desc('Import All Data.');
task('import', ['pubmed_sample']);

desc('Delete and import all Data.');
task('reload', ['clear', 'import']);

desc('Export from transactions_raw to transactions');
task('export', async () => {
  await knex('transactions').truncate();
  const raw_entries = await knex.select().table('transactions_raw');
  const entries = await helpers.cleanRaw(raw_entries);
  await knex('transactions').insert(entries);
});


desc('Run from start to finish');
task('all', ['reload', 'export']);


