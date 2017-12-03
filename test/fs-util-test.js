const chai = require('chai');
const chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
chai.should();

const expect = chai.expect;

const path = require('path');

const fsUtil = require('../modules/fs-util');

const VALID_PATH = path.join(__dirname, 'data/valid.json');
const INVALID_PATH = 'invalid-path.json';

describe('fs-util module tests', function(){
    it('should load the data properly using a correct path', function(){
        return fsUtil.getDataFromFile(VALID_PATH)
            .then(data => {
                expect(data).to.not.be.undefined; 
            });
    });
    it('should fail with the proper error using an invalid path', function(){
        return expect(fsUtil.getDataFromFile(INVALID_PATH))
            .to.eventually.be.rejectedWith(`ENOENT: no such file or directory, open '${INVALID_PATH}'`);
    });
});