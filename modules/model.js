const path = require('path');

const loadDBFile = require('./db-access').loadDBFile;

const RECIPES_DB = path.join(__dirname, 'data/recipes.json');
const INVENTORY_DB = path.join(__dirname, 'data/inventory.json');

let inventory;
let recipes;

function loadInventory () {
    return loadDBFile(INVENTORY_DB).then(data => inventory = data);
}

function loadRecipes () {
    return loadDBFile(RECIPES_DB).then(data => recipes = data);
}

function getInventory () {
    return inventory;
}

function getRecipes () {
    return recipes;
}

module.exports = {
    loadInventory,
    loadRecipes,
    getInventory,
    getRecipes
}