import fs from 'fs';
import { expect } from 'chai';
import Node from '../scripts/Node';
import Trie from '../scripts/Trie';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
  it('should have a root property that defaults to a new Node', () => {
    let trie = new Trie();

    expect(trie.root).to.deep.equal({ value: null, children: {}, isWord: false });
  });

  it('should begin with a word count of 0', () => {
    let trie = new Trie();

    expect(trie.wordCount).to.equal(0);
  });

  it('should be able to add a new node if the letter does not exist', () => {
    let trie = new Trie();

    trie.insert('a');

    expect(trie.root.children).to.deep.equal({a: { value: 'a', children: {}, isWord: true }});
  });

  it('should add an entire library, for a wordCount of 235886', () => {

    let trie = new Trie();

    trie.populate(dictionary);

    expect(trie.wordCount).to.equal(235886);
  });
})
