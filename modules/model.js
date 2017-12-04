const path = require('path');

const loadDBFile = require('./db-access').loadDBFile;

const RECIPES_DB = path.join(__dirname, 'data/recipes.json');
const INVENTORY_DB = path.join(__dirname, 'data/inventory.json');

let inventory;
let recipes;

function loadInventory () {
    return loadDBFile(INVENTORY_DB).then(data => {
        inventory = data;
        return inventory;
    });
}

function loadRecipes () {
    return loadDBFile(RECIPES_DB).then(data => {
        recipes = data;
        return recipes;
    });
}

function init () {
    return Promise.all([
        loadRecipes(),
        loadInventory()
    ]);
}

module.exports = {
   init
}