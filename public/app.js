const app = angular.module('alchemyApp', []);

const SERVER_URL = 'http://localhost:3000';
const SERVER_API_URL = `${SERVER_URL}/api`;

const SUCCESS_MESSAGE = 'And you have done...';
const FAILURE_MESSAGE = 'Ooops... it did not end well...';

const RESULT_MODAL = $('#resultMingModal');
const RESULT_MODAL_TITLE = RESULT_MODAL.find("#result-title");
const RESULT_MODAL_CONTENT = RESULT_MODAL.find('#result');
let disabled = false;

app.controller('RecipeController', function RecipeController($scope, $http){
 
    /** PUBLIC */
    $scope.basket = [];
    $scope.inventory = [];
    $scope.recipes = [];

    $scope.addToCauldron= function(ingredient) {
        if (!disabled) {
            updateBasket(ingredient.name);
        }
    }

    $scope.resetBasket = function () {
        $scope.basket = [];
        enableAllIngredientsButton();
        disabled = false;
    }

    $scope.make = function () {
        if(disabled) {
            const ingredientsUsed = $scope.basket;
            return getRecipeResult(ingredientsUsed)
                .then(openModal)
                .then(() => {
                    $scope.resetBasket();
                    return updateInventory();
                });
        }
    }


    /** PRIVATE */
    function updateBasket (ingredientName) {
        $scope.basket.push(ingredientName);
        if ($scope.basket.length >= 3) {
            disableAllIngredientsButton();
            disabled = true;
        }
    }

    function onError (e) {
        console.log(e);
    }

    function openModal(data) {
        const title = data.success ? SUCCESS_MESSAGE : FAILURE_MESSAGE;
        const result = data.success ? data.result.toUpperCase() : data.error;
        RESULT_MODAL_TITLE.text(title);
        RESULT_MODAL_CONTENT.text(result);
        RESULT_MODAL.modal({show : true});
    }

    function disableAllIngredientsButton() {
        $('.inventoryItem').addClass('disabled');
        $('#makeBtn').removeClass('disabled');
    }

    function enableAllIngredientsButton() {
        $('.inventoryItem').removeClass('disabled');
        $('#makeBtn').addClass('disabled');
    }

    function request(reqConfig) {
        return $http(reqConfig)
            .then(response => {
                return response.data;
            }, responseWhenFailed => {
                onError(responseWhenFailed.data);
                return undefined;
            })
    }

    function updateInventory () {
        return getInventoryFromServer()
            .then(inventory => {
                $scope.inventory = inventory;
            });
    }

    function updateRecipes () {
        return getRecipesFromServer()
            .then(recipes => {
                $scope.recipes = recipes;
            });
    }

    function getInventoryFromServer () {
        const reqConfig = {
            method: 'GET',
            url: `${SERVER_API_URL}/inventory`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return request(reqConfig).then(data => data.inventory || []);
    }

    function getRecipeResult (ingredientsUsed) {
        const ingredients = JSON.stringify(ingredientsUsed);
        const reqConfig = {
            method: 'POST',
            url: `${SERVER_API_URL}/mix`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { ingredients }
        }
        return request(reqConfig);
    }

    function getRecipesFromServer() {
        var reqConfig = {
            method: 'GET',
            url: `${SERVER_API_URL}/recipes`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return request(reqConfig).then(data => data.recipes || []);
    }

    // on load
    (function () {
        return updateInventory().then(() => updateRecipes());
    })();
});