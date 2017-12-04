const app = angular.module('alchemyApp', []);

app.controller('RecipeController', function RecipeController($scope){
    
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

    $scope.inventory = [{
        name: 'apple',
        stock: 3
    },{
        name : 'cinnamon stick',
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
        name : 'rat head',
        stock : 1
    },{
        name : 'fox tail',
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
    }

    function enableAllIngredientsButton() {
        $('.inventoryItem').removeClass('disabled');
    }

});