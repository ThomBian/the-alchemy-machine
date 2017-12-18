const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const controller = require('./modules/controller');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const PUBLIC_DIR = `${__dirname}/public`;

function mix (req, res) {
    try {
        const ingredientsToMix = JSON.parse(req.body.ingredients);
        const recipeFound = controller.mix(ingredientsToMix);
        res.send({
            success: true,
            result: recipeFound
        });
    } catch(e) {
        res.send({
            success: false,
            error: e.message
        });
    }
}

function getInventory (req, res) {
    const inventory = controller.getFormattedInventory();
    res.send({
        inventory
    });
}

function getRecipes (req, res) {
    const recipes = controller.getRecipes();
    res.send({
        recipes
    });
}

function home (_, res) {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
}

app
    .get('/', home)
    .post('/api/mix', mix)
    .get('/api/inventory', getInventory)
    .get('/api/recipes', getRecipes);

app.listen(3000, () => {
    return controller.init()
        .then(() => {
            console.log('Application is ready, listening on port 3000');
        });
});
