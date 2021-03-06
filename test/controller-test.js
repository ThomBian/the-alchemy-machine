const chai = require('chai');
const chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
chai.should();

const expect = chai.expect;

const controller = require('../modules/controller');

describe('Controller tests', function(){
    describe('#init', function(){
        it('should init the recipes and the ingredients in memory', function(){
            // given
            // when
            return controller.init()
            // then
                .then(() => {
                    expect(controller.getInventory()).to.not.be.undefined;
                    expect(controller.getRecipes()).to.not.be.undefined;
                });
        });
    });

    describe('#mix', function(){
        beforeEach(function(){
            return controller.init();
        });

        it('should work and decrease the amount of ingredients properly', function(){
            // given
            const ingredients = ['parsley', 'vinegar', 'foxTail'];
            let inventory = controller.getInventory();
            const nbParsley = inventory['parsley'];
            const nbVinegar = inventory['vinegar'];
            const nbFoxtail = inventory['foxTail'];

            // when
            const recipeNameFound = controller.mix(ingredients);

            // then
            expect(recipeNameFound).to.not.be.undefined;
            recipeNameFound.should.be.equal('Invisibility potion');
            inventory = controller.getInventory();
            expect(inventory['parsley']).to.be.equal(nbParsley - 1);
            expect(inventory['vinegar']).to.be.equal(nbVinegar - 1);
            expect(inventory['foxTail']).to.be.equal(nbFoxtail - 1);
        });

        it('should say the same recipe twice for the same ingredients', function(){
            // given
            const ingredients = ['parsley', 'vinegar', 'foxTail'];

            // when
            const recipeNameFound = controller.mix(ingredients);
            const recipeNameFound2 = controller.mix(ingredients);

            // then
            expect(recipeNameFound).to.be.equal('Invisibility potion');
            expect(recipeNameFound).to.be.equal(recipeNameFound2);

        });

        it('should not return a recipe and should decrease the amount of ingredients', function(){
            // given
            const ingredients = ['parsley', 'vinegar', 'ratHead'];
            let inventory = controller.getInventory();
            const nbParsley = inventory['parsley'];
            const nbVinegar = inventory['vinegar'];
            const ratHead = inventory['ratHead'];

            // when
            expect(() => controller.mix(ingredients)).to.throw('Recipe not found for thoses ingredients');
            
            // then
            inventory = controller.getInventory();
            expect(inventory['parsley']).to.be.equal(nbParsley - 1);
            expect(inventory['vinegar']).to.be.equal(nbVinegar - 1);
            expect(inventory['ratHead']).to.be.equal(ratHead - 1);
        });

        it('should say that the inventory does not have enough ingredient to produce the recipe', function(){
            // given
            const ingredients = ['parsley', 'vinegar', 'carrot'];
            let inventory = controller.getInventory();
            const nbParsley = inventory['parsley'];
            const nbVinegar = inventory['vinegar'];
            const carrot = inventory['carrot'];

            // when
            expect(() => controller.mix(ingredients)).to.throw('Stock for carrot is empty');
            
            // then
            inventory = controller.getInventory();
            expect(inventory['parsley']).to.be.equal(nbParsley);
            expect(inventory['vinegar']).to.be.equal(nbVinegar);
            expect(inventory['carrot']).to.be.equal(carrot);
        });

        it('should say that the inventory does not have enough ingredient to produce the recipe because the ingredient does not exist', function(){
            // given
            const ingredients = ['vinegar', 'grapefruit', 'chicken'];

            // when
            expect(() => controller.mix(ingredients))
            // then 
                .to.throw('Stock for grapefruit is empty');
        });

        it('should fail if the model is not initialized or has been reset', function(){
            const ingredients = ['ing0', 'ing2', 'ing1'];
            controller.reset();
            expect(() => controller.mix(ingredients)).to.throw('Controller has no data');
        });

        it('should get the inventory with proper format [{name: aname, stock: 12}]', function(){
            // given
            const expected = [{ name: 'vinegar', stock: 14 },
            { name: 'ratHead', stock: 13 },
            { name: 'lamaDrool', stock: 10 },
            { name: 'parsley', stock: 9 },
            { name: 'hedgehogThorn', stock: 5 },
            { name: 'foxTail', stock: 8 },
            { name: 'carrot', stock: 0 },
            { name: 'tomatoe', stock: 2 },
            { name: 'asphodel', stock: 40 },
            { name: 'artemesia', stock: 12 },
            { name: 'water', stock: 100 },
            { name: 'cherry', stock: 20 },
            { name: 'pineapple', stock: 8 },
            { name: 'witchesFinger', stock: 4 },
            { name: 'toadSlime', stock: 28 },
            { name: 'snail', stock: 8 },
            { name: 'slug', stock: 32 },
            { name: 'herbesDeProvence', stock: 8 },
            { name: 'nut', stock: 18 },
            { name: 'pumpkin', stock: 2 },
            { name: 'butterfly', stock: 7 },
            { name: 'orange', stock: 8 },
            { name: 'raspberry', stock: 50 },
            { name: 'RJ45Wire', stock: 14 }];
            // when
            const inventory = controller.getFormattedInventory();

            // then
            inventory.forEach((_, currentIdx) => {
                expect(inventory[currentIdx].name).to.be.equal(expected[currentIdx].name);
                expect(inventory[currentIdx].stock).to.be.equal(expected[currentIdx].stock);
            })
        });
    });
});