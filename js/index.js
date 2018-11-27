// function greet() {
//     console.log(`my name is ${this.name}, hi!`);
// }
//
// greet(); // my name is , hi!
//
// let person = {
//     name: 'Bob',
//     greet: greet
// };
//
// person.greet(); // my name is Bob, hi!

// function greet() {
//     console.log(`my name is ${this.name}, hi!`);
// }
//
// let sally = { name: 'Sally' };
// //
// // greet.call(sally);
// // // my name is Sally, hi!
// //
// // greet.apply(sally);
//
// function greet(customerOne, customerTwo) {
//     console.log(`Hi ${customerOne} and ${customerTwo}, my name is ${this.name}!`);
// }
//
// greet.apply(sally, ['Terry', 'George']);

let sally = { name: 'Sally' };

function greet(customer) {
    console.log(`Hi ${customer}, my name is ${this.name}!`);
}

let newGreet = greet.bind(sally); // newGreet is context-bound to sally

newGreet('Bob');

greet('Bob');

greet.bind(sally)('Bob');
