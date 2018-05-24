import React, { Component } from 'react';

// function linear(arr, val) {
//   for (let i=0; i<arr.length;i++) {
//     if (arr[i] === val) {
//       App.setState({
//         linear: `Took ${i} steps to find ${val}`
//       });
//       return;
//     }
//   }
//   App.setState({
//     linear: `Value not within the array took ${arr.length} steps`
//   });
// };

// function submitLinear(e) {
//   linear(this.state.data, e.target.linear.value);
// };

// dewey decimal -
//  First find the midpoint, as long as books in library are sorted
//  Compare the book's dewey your looking for with the midpoint's dewey decimal you found
//  if the book's dewey is smaller, repeat the process taking the midpoint of the left side of the library
//  else if the book's dewey is larger, repeat for the right side
//  if books dewey is equal to the midpoint's dewey, we know that the book is at the midpoint's index

class App extends Component {
  constructor() {
    super();
    this.state = {
      linear: ''
    }
  }

  submitLinear(e) {
    this.linear([89, 30, 25, 32, 72, 70, 51, 42, 25, 24,
      53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
       45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93,
       98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16,
       85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97,
       82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31,
       26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43,
       9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39,
       42, 51, 54, 84, 34, 53, 78, 40, 14, 5], e.target.linear.value);
  };

  linear(arr, val) {
    for (let i=0; i<arr.length;i++) {
      if (arr[i] == val) {
        this.setState({
          linear: `Took ${i+1} steps to find ${val}`
        });
        return;
      }
    }
    this.setState({
      linear: `Value not within the array, took ${arr.length} steps`
    });
  };

  submitBinary(e) {
    let store = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24,
      53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
       45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93,
       98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16,
       85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97,
       82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31,
       26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43,
       9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39,
       42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
    store.sort((a, b) => a-b);
    this.binary(store, e.target.binary.value);
  }

  binary(arr, val, start, end, count=0) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? arr.length : end;
    count++;
    if (start > end) {
        this.setState({
          linear:`Value not within the array, took ${count} steps`
        })
        return;
    }

    const index = Math.floor((start + end) / 2);
    const item = arr[index];

    console.log(start, end);
    if (item == val) {
      this.setState({
        linear:`Value is in index ${index}, took ${count} steps`
      })
    }
    else if (item < val) {
        return this.binary(arr, val, index + 1, end, count);
    }
    else if (item > val) {
        return this.binary(arr, val, start, index - 1, count);
    }
  }

  render() {

    return (
      <div>
      <form className="linearSearch" onSubmit={ (e) => {
        e.preventDefault();
        this.submitLinear(e);
        }
        }>
        <input type="number" name="linear" />
        <button type="submit">Linear Search</button>
      </form>
      <form className="binarySearch" onSubmit={ (e) => {
        e.preventDefault();
        this.submitBinary(e);
        }
        }>
        <input type="number" name="binary" />
        <button type="submit">Binary Search</button>
      </form>
        <div>
          {this.state.linear}
        </div>
      </div>
    );
  }
}

export default App;
