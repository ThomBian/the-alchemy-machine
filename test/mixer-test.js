const chai = require('chai');
const chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
chai.should();

const expect = chai.expect;

const mixer = require('../modules/mixer');

describe('Controller tests', function(){
    describe('Mixing ingredients to get reicpe', function() {
        const recipes = [{
            name : 'bolognese',
            ingredients : ['tomato', 'beef', 'basile']
        },{
            name : 'carbonara',
            ingredients : ['yolk', 'creem', 'bacon']
        },{
            name : 'pesto',
            ingredients : ['basile', 'pinion', 'olive oil']
        },{
            name : 'all olive oil', 
            ingredients : ['olive oil', 'olive oil', 'olive oil']
        }];

        it('should mix ingredients and say that a recipe is found', function(){
            // given 
            const ingredients = ['yolk', 'creem', 'bacon'];
            
            // when 
            const result = mixer.mix(ingredients, recipes);

            // then
            expect(result).to.not.be.undefined;
            result.should.equal('carbonara');
        });

        it('should mix ingredients and say that a recipe is found', function(){
            // given 
            const ingredients = ['olive oil', 'olive oil', 'olive oil'];
            
            // when 
            const result = mixer.mix(ingredients, recipes);

            // then
            expect(result).to.not.be.undefined;
            result.should.equal('all olive oil');
        });

        it('should throw an Error because any recipe matches the given ingredients', function(){
            // given
            const ingredients = ['tomato', 'creem', 'olive oil'];

            // when
            expect(() => mixer.mix(ingredients, recipes))
            //then
                .to.throw('Recipe not found for thoses ingredients');
        });

        it('should throw an Error because any recipe matches the given ingredients', function(){
            // given
            const ingredients = ['olive oil', 'olive oil', 'creem'];

            // when
            expect(() => mixer.mix(ingredients, recipes))
            //then
                .to.throw('Recipe not found for thoses ingredients');
        });

        it('should throw an Error because the number of given ingredients does not equal 3', function(){
            // given
            const ingredients = ['ing1', 'ing2'];

            // when
            expect(() => mixer.mix(ingredients, recipes))
            //then
                .to.throw('Number of ingredients does not match the requirements, need 3');
        });
        
    });
});