const fs = require('fs');

function getDataFromFile (path) {
    return new Promise ((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    getDataFromFile
}