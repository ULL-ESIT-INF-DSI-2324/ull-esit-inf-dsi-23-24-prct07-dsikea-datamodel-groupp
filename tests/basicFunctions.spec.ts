import 'mocha';
import {expect} from 'chai';
import {add} from '../src/basicFunctions'

describe(`Add tests`, () => {
  it(`add(1, 2) equals to 3`, () => {
    expect(add(1,2)).to.be.equal(3);
  });
  it(`add(1, 2) equals to 3`, () => {
    expect(add(1,2)).not.to.be.equal(5);
  });
});