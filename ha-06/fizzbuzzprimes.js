https://gist.github.com/bogkyu/14b06d16a291194379dbb46244cb65f3

/*
 * Keeping Up With the Javascripts
 * Homework Assignment #6: Loops
 * 
 * Details:
 * 
 * You're about to do an assignment called "Fizz Buzz", which is one of the
 * classic programming challenges. It is a favorite for interviewers, and a
 * shocking number of job-applicants can't get it right. But you won't be one of
 * those people. Here are the rules for the assignment (as specified by Imran
 * Gory):
 * 
 * Write a program that prints the numbers from 1 to 100.
 * 
 * But for multiples of three print "Fizz" instead of the number and for the
 * multiples of five print "Buzz".
 * 
 * For numbers which are multiples of both three and five print "FizzBuzz".
 * 
 * -------------
 * 
 * Extra Credit:
 * 
 * Instead of only printing "fizz", "buzz", and "fizzbuzz", add a fourth print
 * statement: "prime". You should print this whenever you encounter a number that
 * is prime (divisible only by itself and one). As you implement this, don't worry
 * about the efficiency of the algorithm you use to check for primes. It's okay
 * for it to be slow.
 */

// creates a prime list under a maximum value
function primes(n){
  let lst = [] ;
  nextCandidate:
  for( let i = 1; i<=n; ++i ){
    for( p of Array.prototype.slice.call(lst, 1)) {
      if (i % p === 0 ) {
        continue nextCandidate;
      }
    }
    lst.push(i);
  }
  return lst;
}
// console.log(primes(0));


// main function
function homeAssign6Loops (nmax = 100, noprimes=true) {
  let primeslst = primes(noprimes ? 0 : nmax);
  for( let i= 1; i<=nmax; ++i) {
    const prm = primeslst.indexOf(i) >= 0 ; 
    const by3 = i % 3 === 0 ;
    const by5 = i % 5 === 0 ;

    if( prm ) 
      console.log('prime');
    else if( by3 && by5 )
      console.log('FizzBuzz');
    else if ( by3 )
      console.log('Fizz');
    else if( by5 )
      console.log('Buzz');
    else
      console.log(i);
  }
  console.log('------------------------------');
}


// example calls

// as requested from assignment
homeAssign6Loops();

// extra
homeAssign6Loops(100, false);

// lower values
homeAssign6Loops(30);
homeAssign6Loops(30, false);

