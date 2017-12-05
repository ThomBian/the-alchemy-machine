const express = require('express');
var bodyParser = require('body-parser');

const controller = require('./modules/controller');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app
    .post('/api/mix', mix);

app.listen(3000, () => {
    return controller.init()
        .then(() => {
            console.log('Application is ready, listening on port 3000');
        });
});