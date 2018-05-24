'use strict';
const library = [
  { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
  { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
  { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
  { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
  { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
  { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
  { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
  { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
  { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
  { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
];

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
  
  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
  
    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  
  find(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  
  count(key, count = 0) {
    if (this.key === key) {                
      return count;
    }
    else if (key < this.key && this.left) {
      count++;
      return this.left.count(key, count)
    } else if (key > this.key && this.right) {
      count++;
      return this.right.count(key, count);
    }
  }
  
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }
  
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dsfPreOrder(arr=[]) {
    // Pre-order
    arr.push(this.key);
    if (this.left) {
      this.left.dsfPreOrder(arr);
    }
    if (this.right) {
      this.right.dsfPreOrder(arr);
    }
    return arr;
  }

  dsfInOrder(arr=[]) {
    if (this.left) {
      this.left.dsfInOrder(arr);
    }
    arr.push(this.key);
    if (this.right) {
      this.right.dsfInOrder(arr);
    }
    return arr;
  }

  dsfPostOrder(arr=[]) {
    if (this.left) {
      this.left.dsfPostOrder(arr);
    }
    if (this.right) {
      this.right.dsfPostOrder(arr);
    }
    arr.push(this.key);
    return arr;
  }
}

const main = () => {
  let bst = new BinarySearchTree();
  bst.insert(25, 25);
  bst.insert(15, 15);
  bst.insert(50, 50);
  bst.insert(10, 10);
  bst.insert(24, 24);
  bst.insert(35, 35);
  bst.insert(70, 70);
  bst.insert(4, 4);
  bst.insert(12, 12);
  bst.insert(18, 18);
  bst.insert(31, 31);
  bst.insert(44, 44);
  bst.insert(66, 66);
  bst.insert(90, 90);
  bst.insert(22, 22);
  console.log(bst.dsfPostOrder());
};

const profit = () => {
  let arr = [128, 97, 121, 123, 98, 97, 105];
  arr.sort((a, b) => a-b);
  return arr[arr.length-1] - arr[0];
};
console.log(profit());