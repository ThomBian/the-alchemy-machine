const express = require('express');

const controller = require('./modules/controller');

const app = express();

app.listen(3000, () => {
    return controller.init()
        .then(() => {
            console.log('Application is ready, listening on port 3000');
        });
});