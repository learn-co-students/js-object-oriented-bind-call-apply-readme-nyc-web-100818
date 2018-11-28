// use this to copy code snippets or use your browser's console

function greet() {
  console.log(`my name is ${this.name}, hi!`);
}

greet(); // my name is , hi!

let person = {
  name: 'Bob',
  greet: greet
};

person.greet(); // my name is Bob, hi!

//

function greet() {
  console.log(`my name is ${this.name}, hi!`);
}

let sally = {
  name: 'Sally'
};

greet.call(sally);
// my name is Sally, hi!

greet.apply(sally);
// my name is Sally, hi!

// Both `call` and `apply` let us set the value of `this` to whatever we pass as the first argument. The difference is how arguments are passed to the function

function greet(customerOne, customerTwo) {
  console.log(`Hi ${customerOne} and ${customerTwo}, my name is ${this.name}!`);
}

// Invoking with `call`

let sally = {
  name: 'Sally'
};

function greet(customerOne, customerTwo) {
  console.log(`Hi ${customerOne} and ${customerTwo}, my name is ${this.name}!`);
}

greet.call(sally, 'Terry', 'George');
// Hi Terry and George, my name is Sally!

greet.call(sally);
// Hi undefined and undefined, my name is Sally!

// Invoking with `apply`, - takes only two arguments => the value of `this` and an Array of Arguments pass to the function

greet.apply(sally, [`Terry`, `George`]);
// Hi Terry and George, my name is Sally!

//Sometimes, we want to take a function, associate it to a context and return a "context-bound" version of the original function
// Once we have the "context-bound" version of the function we can call it with (arg1,arg2,etc...) or call()/apply() without having to manually set the the context

let sally = {
  name: 'Sally'
};

function greet(customer) {
  console.log(`Hi ${customer}, my name is ${this.name}!`);
}

let newGreet = greet.bind(sally); // newGreet is context-bound to sally

newGreet('Bob');
// Hi Bob, my name is Sally!

greet('Bob');
// Hi Bob, my name is !

// Note that the original `greet` function is unchanged. bind does not change it
// Instead bind copies the function and sets the copied function's `this` context to whatever is passed through as an argument
//  Assigning the "context-bound" function to a new variable (like newGreet) - makes this **reusable && transferable**

class Event {
  constructor(title, keywords) {
    this.title = title;
    this.keywords = keywords;
  }
}

class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }

  matchInterests(event) {
    return event.keywords.some(function (word) {
      return this.interests.includes(word);
    });
  }
}

let billy = new User('billy', ['music', 'art', 'movies']);
let freeMusic = new Event('Free Music Show', ['music', 'free', 'outside']);

billy.matchInterests(freeMusic);
// Uncaught TypeError: Cannot read property 'interests' of undefined

class Event {
  constructor(title, keywords) {
    this.title = title;
    this.keywords = keywords;
  }
}

class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }

  matchInterests(event) {
    console.log("'this' is defined: ", this);
    return event.keywords.some(function (word) {
      console.log("'this' is now undefined: ", this);
      return this.interests.includes(word);
    });
  }
}

let billy = new User('billy', ['music', 'art', 'movies']);
let freeMusic = new Event('Free Music Show', ['music', 'free', 'outside']);

billy.matchInterests(freeMusic);
// 'this' is defined:  User {name: "billy", interests: Array(3)}
// 'this' is now undefined:  undefined
// Uncaught TypeError: Cannot read property 'interests' of undefined
// In the first console.log, `this` refers to the billy user instance
// In the second, this is `undefined`. To solve this problem, we can use `bind`

class Event {
  constructor(title, keywords) {
    this.title = title;
    this.keywords = keywords;
  }
}

class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }

  matchInterests(event) {
    return event.keywords.some(
      function (word) {
        return this.interests.includes(word);
      }.bind(this) // added to the and of the callback function
    );
  }
}

let billy = new User('billy', ['music', 'art', 'movies']);
let freeMusic = new Event('Free Music Show', ['music', 'free', 'outside']);

billy.matchInterests(freeMusic);

// Let's see why the above code works. When the matchInterests method is invoked, this refers to the User instance context receiving the method call.
// We are in that context when our callback function is defined. Using bind here lets us keep this referring to the User context.