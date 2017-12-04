const model = require('./model');

function init () {
    return Promise.all([
        model.loadInventory(),
        model.loadRecipes()
    ]).then();
}