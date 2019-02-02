// KJS HA5
/*
 * Keeping Up With the Javascripts
 * Homework assignment #5: Switch Statements
 *
 * Details:
 * Create a function called "timeAdder" that can add two time values together.
 * For example, it should be able to add 25 hours and 3 days together. 
 * 
 * The function should accept 4 parameters:
 * 
 * value1, label1, value2, label2
 * 
 * - value1 and value2 should accept positive integers  
 * 
 * - label1 and label2 should accept any of the following strings: "seconds",
 *   "minutes", "hours", "days", "second", "minute", "hour", "day"
 * 
 * For example your function may be called in any of the following ways:
 * 
 * timeAdder(1,"minute",3,"minutes")
 * 
 * timeAdder(5,"days",25,"hours")
 * 
 * timeAdder(1,"minute",240,"seconds")
 * 
 * Requirements:
 * 
 * 1. Your function should include at least one switch
 * 
 * 2. Your function must accept any possible combination of inputs 
 * 
 * 3. If the inputs are valid, it should return an array with 2 variables inside
 *    of it: value3, and  label3. For example:
 * 
 *         return [5,"minutes"]; 
 * 
 *    The exact label you choose to return for label3 ("minutes" for example) 
 *    is up to you.
 * 
 * 4. If the inputs are invalid or impossible, it should return false. Here are
 *    examples of impossible and invalid inputs:
 * 
 *    timeAdder(5,"hour",5,"minutes") // This is impossible because "hour" is singular and 5 is plural
 * 
 *    timeAdder(false,false,5,"minutes") // This is invalid because the first 2 arguments are not the correct types
 *   
 *    timeAdder({},"days",5,"minutes") // This is invalid because the first argument is the wrong type
 * 
 * Extra Credit:
 * 
 * Rather than returning an arbitrary label for label3, return the largest label
 * that can be used with an integer value
 * 
 * For example if someone calls:
 *     timeAdder(20,"hours",4,"hours")
 * 
 * You could return: 
 *     [1,"day"] rather than [24,"hours"]
 * 
 * But if they called
 *     timeAdder(20,"hours",5,"hours")
 * 
 * You would return 
 *     [25,"hours"] 
 * 
 * because you could not use "days" with an integer 
 * value to represent 25 hours.
 * 
 * 
 * Turning it In:
 * 
 * One of the first slides in this course is called "How to Turn in Homework" review that slide for details on how to send your assignment to us (and receive a grade).
 * 
 * 
 * 
*/
//KJS HA5


// function generator, returns list of
//   boolean (check ok) and 
//   string (current type, used if boolean were false)
let checktemplate = ss => (v) => [typeof v == ss, typeof v, ss];
let checkNumber = checktemplate('number');  // doesn't sense Nan-s
let checkString = checktemplate('string');

/*
// TEST BED #1 see results from checking types
[
  'string', 4, {}, '', undefined, NaN, true, [],
].forEach(x => {
  console.log(x + ': ' + checkString(x));
  console.log(x + ': ' + checkString(x));
});
*/

// declared order is important, strictly from largest to smallest
const VALID_UNITS = [
  "day",
  "hour", 
  "minute", 
  "second",
];

// pure fun :)
function checkPlurals(val, lab) {
  const startstop = ['^', '$'];
  const grouping = ['(', ')'];
  const re = new RegExp(
    startstop.join(
      grouping.join(
        VALID_UNITS.join("|")
      )
      + (Math.abs(val) == 1 ? "" : "s")
    )
  );
  return re.exec(lab) == null ? [val, lab] : null;
}
/*
// TEST BED #2 see results from checking types
[
  [3, 'minutes'],
  [1, 'year'],
  [1, 'second'],
  [44, 'hours'],
  [44, 'hour'],
  
].forEach(([x, s]) => {
  console.log(x + ' ' + s + ": " + (checkPlurals(x, s) == null ? "OK" : "FAILED"));
});
*/

function checkTypes(val1, lab1, val2, lab2) {
  let error = '' ;
  [[val1, checkNumber],
   [lab1, checkString],
   [val2, checkNumber],
   [lab2, checkString],
  ].forEach(([v, f]) => {
    const [isOk, actualType, requiredType] = f(v);
    if( ! isOk ) {
      error += (error ? '\n' : '' )
        + '  wrong type for value: ' + v 
        + ', found ' + actualType 
        + ', required ' + requiredType;
    }
    return error;
  });
}
/*
// TEST BED #3 checkTypes
[
  [[3, 'seconds', 5, 'minutes'], true],
  [[4555, 'second', 423, 'sedconde'], true],
  [[{}, 'seconds', 5, null], false],
  [[3,4,5,6], false],
  [['3','4','5','6'], false],
].forEach(([params, rightResult]) => {
  const [ v1, l1, v2, l2] = params;
  const realResult = checkTypes(v1, l1, v2, l2) == null ;
  console.log((realResult === rightResult ? "OK   " : "FAILED" ) + ' testing value set:' + JSON.stringify(params));
});
*/


// HA5 Time adder.
// Takes four mandatory parameters, grouped by pairs of time
// descrpitors to be added, explained as below:
// val1, val2 - the amounts of time
// lab1, lab2 - the time units
// time unit should be one of the following strings:
//    "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"
// return value is the time we got by adding the two parameters, maintaining 
//   or false if wrong  parameters
//   extra credit for returning the largest label that can be used with
//   an integer value
function timeAdder(val1, lab1, val2, lab2){
  let retval = false;
  let error = 
      checkTypes(val1, lab1, val2, lab2)
    || checkPlurals(val1, lab1)
    || checkPlurals(val2, lab2) ;
  
  if( !error ) {
    // calculus and result
    let time1 = normalize(val1, lab1);
    let time2 = normalize(val2, lab2);
    let timef = time1 + time2;
    for( x in VALID_UNITS) {
      let [unit, mult] = [VALID_UNITS[x], multiplier(VALID_UNITS[x])] ;
      if( timef % mult === 0 ) {
        const newval = timef / multiplier(unit);
        retval = [newval, unit + (Math.abs(newval) === 1 ? "" : "s") ]; 
        break;
      }
    }
    
  } else {
    console.log("Error: unexpected or incorrect parameters: " + error);
  }
  
  return retval;
}

// get the normalized (_in seconds_) time value
function normalize(val, lab) {
  return val * multiplier(lab);
}

// returns the multiplier to seconds
// Pirple require a switch statement
//   otherwise I would have implemented the functionality 
//   augmenting the VALID_UNITS
function multiplier(lab) {
  switch(lab) {
      
    case 'day':
    case 'days':
      return 60 * 60 * 24 ;
      
    case 'hour':
    case 'hours':
      return 60 * 60;
      
    case 'minute':
    case 'minutes':
      return 60;
      
    // assumes default seconds
    default:
      return 1;    
  }
}

// TEST BED #4
[
  [[23, 'minutes',  1, 'minute' ], [  24, 'minutes']],
  [[23, 'hours'  ,  1, 'hour'   ], [   1, 'day'    ]],
  [[59, 'minutes',  2, 'minutes'], [  61, 'minutes']],
  [[59, 'minutes',  2, 'seconds'], [3542, 'seconds']],
  [[ 3, 'days'   ,  1, 'hour'   ], [  73, 'hours'  ]],
  [[ 0, 'hours'  ,  0, 'hours'  ], [   0, 'days'   ]],
  [[23, 'seconds', -1, 'minute' ], [ -37, 'seconds']],
 ].forEach( ([param, expectedResult]) => {
  function formatOutput(result, val1, lab1, val2, lab2, valf, labf) {
    const eqop = result ? '===' : '!==';
    return      val1 + ' ' + lab1 
      + ' + ' + val2 + ' ' + lab2
      + ' ' + eqop
      + ' ' +   valf + ' ' + labf;
  }
  const [val1, lab1, val2, lab2] = param;
  const actualResult = timeAdder(val1, lab1, val2, lab2);
  if( actualResult ) {
    const [actval, actlab] = actualResult;
    const [expval, explab] = expectedResult;
    const testOK = actval === expval && actlab == explab;
    console.log("TEST " + (testOK ? 'OK:   ' : 'FAILED:')
                , formatOutput(true, val1, lab1, val2, lab2, expval, explab) );
  } else {
    console.log("TEST FAILED: incorrect input values");
  }
});
