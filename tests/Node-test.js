import { expect } from 'chai';
import Node from '../scripts/Node';

describe('Node', () => {
  it('should have a value that defaults to null', () => {
    let node = new Node();

    expect(node.value).to.equal(null);
  });

  it('should have a children property that defaults to an empty object', () => {
    let node = new Node();

    expect(node.children).to.be.an('object');
    expect(node.children).to.deep.equal({});
  });

  it('should have an isWord property that defaults to false', () => {
    let node = new Node();

    expect(node.isWord).to.equal(false);
  });

  it('should accept a value as a parameter', () => {
    let node = new Node('c');

    expect(node.value).to.equal('c');
  });
})
