import Node from './Node.js';

export default class Trie {
  constructor () {
    this.root = new Node();
    this.wordCount = 0;
  }
  insert (word) {

    let currNode = this.root;

    let letters = [...word.toLowerCase()];


    for (let i = 0; i < letters.length; i++) {
      if (!currNode.children[letters[i]]) {
        currNode.children[letters[i]] = new Node(letters[i]);
      }

      currNode = currNode.children[letters[i]];
      if (i === letters.length - 1) {
        if (!currNode.isWord) {
          currNode.isWord = true;
          this.wordCount += 1;
        }
      }
    }
  }
  count () {
    return this.wordCount;
  }
  getPrefixNode (letters) {
    let currNode = this.root;

    if (!currNode.children[letters[0]]) {
      return null;
    }
    for (let i = 0; i < letters.length; i++) {
      if (currNode.children[letters[i]]) {
        currNode = currNode.children[letters[i]];
      }
    }
    return currNode;
  }
  suggest (prefix) {
    let letters = [...prefix.toLowerCase()];
    let suggestions = [];
    let currNode = this.getPrefixNode(letters);

    if (currNode) {
      let traverse = (prefix, node) => {
        let keys = Object.keys(node.children);

        for (let j = 0; j < keys.length; j++) {
          let child = node.children[keys[j]];
          let newString = prefix + child.value;

          if (child.isWord) {
            suggestions.push( {word: newString, frequency: child.frequency} );
          }
          traverse(newString, child);
        }
      };

      traverse(prefix, currNode);
    }
    return suggestions.sort( (a, b) => {
      return b.frequency - a.frequency;
    }).reduce( (newArray, object) => {
      newArray.push(object.word);
      return newArray;
    }, []);
  }
  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
  select(selection) {
    const newString = [...selection];
    let node = this.getPrefixNode(newString);

    node.isWord ? node.frequency++ : null;
  }
}
