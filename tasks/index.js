const fs = require('fs');
const XmlStream = require('xml-stream');
const pubmed = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  const stream = fs.createReadStream(url);
  var xml = new XmlStream(stream);
  xml.on('endElement: PubmedArticle', function(item) {
    // console.log(item.MedlineCitation.PMID['$text']);
    entries.push(item);
  });
  xml.on('error', function(message) {
    nok(message);
  });
  xml.on('end', function(message) {
   ok(entries);
  });
});

module.exports = { pubmed };