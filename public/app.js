const app = angular.module('alchemyApp', []);

const SERVER_URL = 'http://localhost:3000';
const SERVER_API_URL = `${SERVER_URL}/api`;

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
                    console.log(response.data.result);
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