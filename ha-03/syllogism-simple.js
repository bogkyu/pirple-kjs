/* 
 * Keeping Up With the Javascripts - Home assignment #3
 * 
 * Let's look at a popular logical argument (a syllogism)
 *    All men are mortal
 *    Socrates is a man.
 *    Therefore, socrates is mortal.
 * 
 * Using "if statements" and any other logical operators and data-types you see
 * fit, recreate this logical argument. Your code should make clear that
 * "socrates" is part of a collection of items referred to as "men", and that
 * all members of this collection are mortal. You should also then demonstrate
 * that since Socrates is part of this collection, it follows that he is mortal
 * as well.
 */

// All men are mortal
function areMortal(men) {
  return true;
} 

var men = ['Aristotel', 'Socrates', 'Tales', 'Homer'];

// All men are mortal AND Socrates is a man
if( areMortal(men) && men.indexOf('Socrates') ) {
  // Therefore, socrates is mortal.
  console.log('Socrates is mortal');
}

/*
 * Extra Credit:
 * 
 * Got the hang of creating a logical argument? Want to try another one? Try this one as well:
 * 
 * This cake is either vanilla or chocolate.
 * This cake is not chocolate.
 * Therefore, this cake is vanilla.
 */

var vanillaCake = { ingredient : 'vanilla' };
var chocolateCake = { ingredient : 'chocolate' };

var thisCake = vanillaCake;

if( thisCake.ingredient != chocolateCake.ingredient ) {
  console.log('This cake is vanilla');
}
