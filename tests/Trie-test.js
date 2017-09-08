import fs from 'fs';
import { expect } from 'chai';
import Trie from '../scripts/Trie';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
  it('should have a root property that defaults to a new Node', () => {
    let trie = new Trie();

    expect(trie.root).to.deep.equal({ value: null, children: {}, isWord: false, frequency: 0 });
  });

  it('should begin with a word count of 0', () => {
    let trie = new Trie();

    expect(trie.wordCount).to.equal(0);
  });

  it('should be able to add a new node if the letter does not exist', () => {
    let trie = new Trie();

    expect(trie.wordCount).to.equal(0);
    trie.insert('a');

    expect(trie.wordCount).to.equal(1);
    expect(trie.root.children).to.deep.equal({a: { value: 'a',
      children: {}, isWord: true, frequency: 0 }});
  });

  it('should add an entire library, for a wordCount of 235886', (done) => {
    let trie = new Trie();

    trie.populate(dictionary);

    expect(trie.wordCount).to.equal(235886);

    done();
  }).timeout(25000);

  it('should return an empty array if the prefix is not in the Trie', () => {
    let trie = new Trie();

    trie.insert('apple');
    let suggestions = trie.suggest('b');

    expect(suggestions).to.deep.equal([]);
  });

  it('should return an array of suggested words', () => {
    let trie = new Trie();

    trie.insert('apple');
    trie.insert('application');
    trie.insert('adam');
    trie.insert('alice');
    trie.insert('allison');
    trie.insert('alex');
    trie.insert('amazing');
    let suggestions = trie.suggest('ap');

    expect(suggestions).to.deep.equal(['apple', 'application']);

    suggestions = trie.suggest('al');

    expect(suggestions).to.deep.equal(['alice', 'allison', 'alex']);
  });

  it('should return an array of suggested words, sorted by frequently selected', () => {
    let trie = new Trie();

    trie.insert('apple');
    trie.insert('application');
    trie.insert('adam');
    trie.insert('alice');
    trie.insert('allison');
    trie.insert('alex');
    trie.insert('amazing');

    trie.select('alice');

    let suggestions = trie.suggest('al');
    
    expect(suggestions).to.deep.equal(['alice', 'allison', 'alex']);

    trie.select('allison');
    trie.select('allison');


    suggestions = trie.suggest('al');

    expect(suggestions).to.deep.equal(['allison', 'alice', 'alex']);
  });

})
