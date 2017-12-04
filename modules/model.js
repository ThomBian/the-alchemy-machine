const path = require('path');

const loadDBFile = require('./db-access').loadDBFile;

const RECIPES_DB = path.join(__dirname, 'data/recipes.json');
const INVENTORY_DB = path.join(__dirname, 'data/inventory.json');

function init () {
    return Promise.all([
        loadDBFile(RECIPES_DB),
        loadDBFile(INVENTORY_DB)
    ]);
}

module.exports = {
   init
}