const chai = require('chai');
const chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
chai.should();

const expect = chai.expect;

const path = require('path');

const model = require('../modules/model');

describe('Database access loading tests', function(){
    it('should load the recipe properly', function(){
        return model.loadRecipes()
            .then(() => {
                const recipes = model.getRecipes();
                expect(recipes).to.not.be.undefined;
                Array.isArray(recipes).should.be.true;
                recipes.length.should.equal(2);
                recipes[0].name.should.equal('invisibilty');
                recipes[0].ingredients.length.should.equal(3);
            });
    });

    it('should load the inventory properly', function(){
        return model.loadInventory()
            .then(() => {
                const inventory = model.getInventory();
                expect(inventory).to.not.be.undefined;
                Array.isArray(inventory).should.be.true;
                inventory.length.should.equal(6);
            });
    });
});