const chai = require('chai');
const chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
chai.should();

const expect = chai.expect;

const path = require('path');

const model = require('../modules/model');

describe('Database access loading tests', function(){
    it('should init the model properly', function(){
        return model.init()
            .then(([recipes, ingredients]) => {
                expect(recipes).to.not.be.undefined;
                expect(ingredients).to.not.be.undefined;
                Array.isArray(recipes).should.be.true;
                recipes[0].name.should.equal('Invisibility potion');
                ingredients['vinegar'].should.equal(14);
            });
    });
});