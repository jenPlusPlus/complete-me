import fs from 'fs';
import { expect } from 'chai';
import Node from '../scripts/Node';
import Trie from '../scripts/Trie';

describe('Trie', () => {
  it('should have a root property that defaults to null', () => {
    let trie = new Trie();

    expect(trie.root).to.equal(null);
  });

  it('should begin with a word count of 0', () => {
    let trie = new Trie();

    expect(trie.wordCount).to.equal(0);
  });
})
