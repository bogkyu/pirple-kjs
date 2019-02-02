/* 
 * Keeping Up With the Javascripts - Home assignment #4
 * 
 * Let's look at a popular logical argument (a syllogism)
 *    All men are mortal
 *    Socrates is a man.
 *    Therefore, socrates is mortal.
 * 
 * Let's go back to your syllogism (logical argument) examples from Homework #3.
 * Now it's time to turn those loose bits of logic into functions. Rather than
 * having procedure that demonstrates that Socrates is mortal, you should create
 * a function that accepts a name and returns a boolean (True or False)
 * representing whether that name identifies a man who is mortal or not. Your
 * function to gracefully handle unexpected inputs (such as an unrecognized name
 * or a name that is a not a string at all) without throwing an exception.
 */

console.log(' ---------- Socrates Part ------------');
const OUR_GUY = 'Socrates' ;

// Shallowly consider that we could hava ALL MEN into men array
// for the sake of appartenance checking
function areMortal(men) {
  return true;
}

// provides the men's list, composed at least by 'Socrates'
function getAllMen (...persons) {
  lst = Array.prototype.slice.call(persons, 0);
  if( !isIncluded(OUR_GUY, lst) )
    lst.push(OUR_GUY); // make sure our case is inside
  return lst;
}

// helper function
function isIncluded(a, lst) {
  a = a || '' ;  // quick default
  lst = lst || [] ; // quick default
  return lst.indexOf(a) >= 0;
}

// checks if aMan is included in menList
function isAMan(aMan = OUR_GUY, menList = [OUR_GUY]) {
  return isIncluded(aMan, menList);
}

const men = ['Aristotel', 'Socrates', 'Tales', 'Homer'];

// All men are mortal AND Socrates is a man
if( areMortal(men) && isAMan('Socrates', men)) {
  // Therefore, socrates is mortal.
  console.log('Socrates is mortal');
} else {
  console.log('Socrates is not mortal');
}

/*
 * Extra Credit:
 * 
 * Extra Credit:
 * If you did the extra credit on Homework #3, let's turn that example into a
 * function as well. It should accept in 2 arguments:
 * 1. An array of all cake possibilities (vanilla or chocolate)
 * 2. A boolean representing whether or not the cake is chocolate.
 * It should return a string indicating the actual flavor of the cake.
 */
console.log(' ------------ Cake Part --------------');
let tastes = ['vanilla', 'chocolate'] ;

// test key is an index into the possible tastes' array
let cake_one = {taste: 1};
let cake_two = {taste: 0};
let cake_nil = {taste: -1};


function cakeType (cake, tastes)  {
  let taste = "" + tastes [cake.taste]; // works fine if taste is undefined
  console.log("aeiouAEIOU".indexOf(taste.charAt(0)));
  // should we not use the coincidence of "undefined" semantics (for missing
  // array element and for taste not defined), we could use:
  // let taste = "" + (tastes [cake.taste] || '<<my-undefined-word>>');
  return "This is a" + ("aeiouAEIOU".indexOf(taste.charAt(0))<0? "" : "n") +  " " + taste +  " cake";
}

console.log(cakeType(cake_one,tastes));
console.log(cakeType(cake_two, tastes));
console.log(cakeType(cake_nil, tastes));

