const model = require('./model');
const mixer = require('./mixer');

let recipes;
let inventory;

function init () {
    return model.init()
        .then(([recipesFromDb, inventoryFromDb]) => {
            recipes = recipesFromDb;
            inventory = inventoryFromDb;
        });
}

function reset () {
    inventory = null;
    recipes = null;
}

function getRecipes() {
    return recipes;
}

function getInventory() {
    return inventory;
}

function mix (ingredients) {
    assertDataAreLoaded();
    assertStockAreOk(ingredients);
    decreaseStock(ingredients);
    return mixer.mix(ingredients, recipes);
}

function assertStockAreOk (ingredients) {
    ingredients.map(curIngredient => {
        if (!inventory[curIngredient] || inventory[curIngredient] - 1 < 0) {
            throw new Error(`Stock for ${curIngredient} is empty`);
        }
    })
}

function assertDataAreLoaded() {
    if (!inventory || !recipes) {
        throw new Error('Controller has no data');
    }
}
function decreaseStock (ingredients) {
    ingredients.map(curIngredient => {
        inventory[curIngredient]--;
    });
}

module.exports = {
    init,
    reset,
    getRecipes,
    getInventory,
    mix
}