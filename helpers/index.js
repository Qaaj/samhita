
const uuid = require('uuid/v3');
const moment = require('moment');

const nlp = (text) => {
  let tags = {};
  const has = (txt) => {
    return {
      add: (...rest) => {
        if (text.toUpperCase().indexOf(txt) !== -1) {
          rest.forEach(tag => {
            tags[tag] = true;
          })
        }
      },
      remove: (...rest) => {
        if (text.toUpperCase().indexOf(txt) !== -1) {
          rest.forEach(tag => {
            delete tags[tag];
          })
        }
      }
    }
  }
  has('BOEHRINGER').add('BI', 'PHARMA_COMPANY');

  // has(' EXCEPTION').remove('TAG1', 'TAG2');

  return tags;
}
const getTags = (item) => {
  let tags = nlp(item);
  return Object.keys(tags);
}

const cleanRaw = (raw) => new Promise((ok, nok) => {
  const items = raw.map(item => {
        const date = moment(item.data.tx_date, 'DD.MM.YYYY').toDate();
        // console.log(item.data);
        const { description, amount, debitor } = item.data;
        console.log(amount);
        const { uuid } = item;
        return {
          date,
          uuid,
          description: `${debitor ? `${debitor} - ` : '' }${description}`,
          keywords: JSON.stringify(item),
          meta: {
            tags: getTags(JSON.stringify(item)),
          },
          amount: parseFloat(amount.replace(',','.')),
        }
      }
  );
  ok(items);
});

const getData = (source) => (data) => {
  return ({
    source,
    data,
    uuid: uuid(data.description + data.amount + data.tx_date, uuid.DNS)
  })
};


module.exports = { cleanRaw, getData };