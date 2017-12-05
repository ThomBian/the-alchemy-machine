function mix (ingredients, recipes) {
    if (ingredients.length !== 3) {
        throw new Error('Number of ingredients does not match the requirements, need 3');
    }
    for (let i = 0; i < recipes.length; ++i) {
        const curRecipe = recipes[i];
        let ingredientsToTest = curRecipe.ingredients.slice();
        let found = true;
        for (let j = 0; j < ingredients.length; ++j) {
            const curIngredient = ingredients [j];
            const idx = ingredientsToTest.indexOf(curIngredient);
            const foundCurrent = idx >= 0;
            if (foundCurrent) {
                ingredientsToTest[idx] = '';
            }
            found = found & foundCurrent;
        };
        if (found) {
            return curRecipe.name;
        }
    };
    throw new Error('Recipe not found for thoses ingredients')
}

module.exports = {
    mix
}