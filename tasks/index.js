const fs = require('fs');

const pubmed = (url) => new Promise((ok, nok) => {
  let num = 0;
  let entries = [];
  fs.createReadStream(url)
      .pipe() // Find XML Piper
      .on('data', function (data) {
        num++;
        if (num > 7) entries.push(data);
      })
      .on("end", () => ok(entries))
      .on("error", nok);
});

module.exports = { pubmed };