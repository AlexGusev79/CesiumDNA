

let elevation = {
  startValue: 0.,
  endValue: 20.,

  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      start :  this.startValue,
      current: this.startValue,
      last: this.endValue,

      next() {
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (this.last - this.start)/60. };
        } else {
            return { done: false, value: this.current = this.start };
        }
      }
    };
  }
};

let azimuth = {
  startValue: -45.,
  endValue: 45.,


  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      start :  this.startValue,
      current: this.startValue,
      last: this.endValue,

      // next() is called on each iteration by the for..of loop
      next() { // (2)
        // it should return the value as an object {done:.., value :...}
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (this.last - this.start)/60. };
        } else {
          return { done: false, value: this.current = this.start  };
        }
      }
    };
  }
};

let range = {
  startValue: 3.,
  endValue: 200000.,

  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      start :  this.startValue,
      current: this.startValue,
      last: this.endValue,

      next() {
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (this.last - this.start)/60. };
        } else {
          return { done: false, value: this.current = this.start };
        }
      }
    };
  }
};


export {elevation, azimuth, range}
