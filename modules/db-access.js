const fs = require('./fs-util');

function loadDBFile (dbFile) {
    return fs.getDataFromFile(dbFile)
    .then(data => {
        return JSON.parse(data);
    }).catch(e => console.error(e));
}

module.exports = {
    loadDBFile
}