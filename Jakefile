const tasks = require('./tasks');
const helpers = require('./helpers');

const knex = require('knex')(require('./knexfile.js'));

jake.addListener('complete', function () {
  process.exit();
});

desc('Import Pubmed Sample Data.');
task('pubmed_sample', { async: true }, async () => {
  console.log('Running Pubmed Sample import.')
  const entries = await tasks.pubmed('sample/pubmedsample.xml');
  const sql = entries.map(helpers.getData('pubmed'))
  await knex('raw').insert(sql);
});

desc('Import Pubmed Data.');
task('pubmed', { async: true }, async () => {
  const time = new Date().getTime();
  console.log('Running Pubmed import.', time)
  const entries = await tasks.pubmed('sample/baseline/pubmed19n0001.xml');
  const done = new Date().getTime();
  console.log('Pasing Done in ' + Math.round((done-time) / 1000) + ' seconds.';
  // const sql = entries.map(helpers.getData('pubmed'))
  // await knex('raw').insert(sql);
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


