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
            recipeNameFound.should.be.equal('invisibility');
            inventory = controller.getInventory();
            expect(inventory['parsley']).to.be.equal(nbParsley - 1);
            expect(inventory['vinegar']).to.be.equal(nbVinegar - 1);
            expect(inventory['foxTail']).to.be.equal(nbFoxtail - 1);
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
    });
});