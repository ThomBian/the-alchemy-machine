const app = angular.module('alchemyApp', []);

const SERVER_URL = 'http://localhost:3000';
const SERVER_API_URL = `${SERVER_URL}/api`;

const SUCCESS_MESSAGE = 'And you have done...';
const FAILURE_MESSAGE = 'Ooops... it has not end well...';

const RESULT_MODAL = $('#resultMingModal');
const RESULT_MODAL_TITLE = RESULT_MODAL.find("#result-title");
const RESULT_MODAL_CONTENT = RESULT_MODAL.find('#result');

app.controller('RecipeController', function RecipeController($scope, $http){
    
    $scope.basket = [];
    let disabled = false;

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
            const reqConfig = {
                method: 'POST',
                url: `${SERVER_API_URL}/mix`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { ingredients : JSON.stringify($scope.basket) }
            }
            return request(reqConfig)
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    const title = data.success ? SUCCESS_MESSAGE : FAILURE_MESSAGE;
                    const result = data.success ? data.result : data.error;
                    RESULT_MODAL_TITLE.text(title);
                    RESULT_MODAL_CONTENT.text(result);
                    RESULT_MODAL.modal({show : true});
                }, response => {
                    console.error(response.data);
                });
        }
    }

    $scope.inventory = [{
        name: 'apple',
        stock: 3
    },{
        name : 'cinnamonStick',
        stock : 6,
    },{
        name : 'grapefruit',
        stock : 7
    },{
        name : 'orange',
        stock : 2
    },{
        name : 'tomatoe',
        stock : 4
    },{
        name : 'ratHead',
        stock : 1
    },{
        name : 'foxTail',
        stock : 12
    },{
        name : 'pea',
        stock : 9
    }];

    /* PRIVATE */
    function updateBasket (ingredientName) {
        $scope.basket.push(ingredientName);
        if ($scope.basket.length >= 3) {
            disableAllIngredientsButton();
            disabled = true;
        }
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
        return $http(reqConfig);
    }

});