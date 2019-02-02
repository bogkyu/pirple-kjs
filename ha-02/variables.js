/* 
 * Keeping Up With the Javascripts - Home assignment #2: Variables and Constants
 * 
 * PIRPLE ASKS:
 * What are the differences between let, const and var?
 * In your own words, write 1 - 2 paragraphs explaining the different use-cases for each. 
 **

MY ANSWER:

Before noting the differences between them, 'var', 'let', and 'const' are all
used to declare variables.  There are two key aspects to discuss:  
- reassignment
- scope

Reassignment

'var' and 'let' both allow the reasignment, thus we could say 
```
    var myVar = 'a string';
    let myLet = 'also a string';
    // ... later on change it
    myVar = 'a new string'
    mylet = 'changed this also';
```

Also, it is possible to leave undefined a var:
    var myUndefinedVar;
    
and later assign it a value.


This is not the case with 'const':
```
    const myConst = 'forever';
    // any further attempt to change this triggers an error:
    // THIS WILL NOT WORK:
    myConst = 'changed my mind, though';
```

Also, const declaration must provide always the definition, too
    const mtUndefinedConst ; // WRONG, error
    const myConst  = 'right'; // OK

Scope

'var' declarations are 'hoisted' in the function scope they are defined in, or in the
global scope otherwise;  there are NO SUBSCOPES into a function or any statements.

(hoisted: see below for my explanation on the term)

On the other hand, 'let' and 'const' are imposing a block level scope, as such
there is no more possible to use a variable outside of the scope the variable
was declared in, which was possible (and still is) if we are using 'var'.

 **
 * PIRPLE ASKS:
 * When would each be appropriate too use? 
 **

MY ANSWER:

We could use generally 'let' and 'const' and leave 'var' out.
'var' and 'let' are used on mutable references, const over immutable references (no further reassign).
Object-s and Array-s assigned to const still remain mutable, though.

 **
 * PIRPLE ASKS:
 * Create a file called variables.js and add your explanation as comments at the top of the page.
 * Then, within the document write 3 code examples (1 for var, 1 for const and 1
 * for let) showcasing the use-cases you explained above.
 */

// MY ANSWER:
//
// synthetic example
//

var condition1 = true;
var condition2 = true;


function fn () {
  // practically, hoisted stuff var will be placed here, at the begining of this function block
  // stuff var is accessible but undefined
  console.log("var: undefined: fn scope: " + stuff);
  
  if (condition1) {
    // stuff var is accessible but undefined
    console.log("var: undefined: outer if: " + stuff);
    let let_me_out = 'kinda'; // let or const have the same scope rule
    if(condition2) {
        // stuff var is accessible but undefined
        console.log("undefined: inner if before var line: " + stuff);
        let let_me_in = 'kinda2';
        var stuff = 'stuff';
        // let_me_in IS accessible
        console.log("let_me_in: OK inner if: " + let_me_in);
        // stuff var is accessible and defined
        console.log("var: OK-inner if and so forth: " + stuff);
    }
    // let_me_out IS accessible
    console.log("let_me_out: OK outer if: " + let_me_out);
    // let_me_in IS NOT accessible
  }
  // let_me_out IS NOT accessible
}

fn();

///////////////////

//
// var example
//
fnvar();  // this is OK, fnvar definition was hoisted, too

function fnvar() {
  var fnlevelvar = 'fnlevelvar';
  console.log("----fnlevel-----");
  console.log(fnlevelvar);
  console.log(outerif);
  console.log(innerif);
  if( condition1 ) {
    var outerif = 'outerif' ;
    console.log("----outerif-----");
    console.log(fnlevelvar);
    console.log(outerif);
    console.log(innerif);
    if( condition1 ) {
      var innerif = 'innerif' ;
      console.log("----innerif-----");
      console.log(fnlevelvar);
      console.log(outerif);
      console.log(innerif);
    }
  }
  // all var-s are defined
  console.log("----finally-----");
  console.log(fnlevelvar);
  console.log(outerif);
  console.log(innerif);
}


///////////////////

//
// let example (applies also to const)
//

fnlet();

function fnlet() {
  let fnlevellet = 'fnlevellet';
  console.log("----fnlevel-----");
  console.log(fnlevellet);
  // error console.log(outerif);
  // error console.log(innerif);
  if( condition1 ) {
    let outerif = 'outerif' ;
    console.log("----outerif-----");
    console.log(fnlevellet);
    console.log(outerif);
    // error console.log(innerif);
    if( condition1 ) {
      let innerif = 'innerif' ;
      console.log("----innerif-----");
      console.log(fnlevellet);
      console.log(outerif);
      console.log(innerif);
    }
  }
  // all let-s are defined
  console.log("----finally-----");
  console.log(fnlevellet);
  // error console.log(outerif);
  // error console.log(innerif);
}

///////////////////

//
// const example
//
fnconst();

function fnconst () {
  // ERROR: 
  // const illegal; // must be defined also

  // OK, declard and defined
  const okvar = 'ok';
  // non primitives are mutable:
  const okarr = ['ok'];
  const okobj = { status : 'ok' };
  console.log(okvar);
  console.log(okarr);
  console.log(okobj);

  // ERROR:
  // okvar = 'still ok?';  // const means constant reference!
  okarr.push('still ok');  // now const is ['ok', 'still ok'];
  okobj.description = 'imagine something';
  okobj.status = 'still ok';
  console.log(okvar);
  console.log(okarr);
  console.log(okobj);

}   

/*
 * PIRPLE ASKS:
 * To earn extra credit, add an explanation of "hoisting" to the top of your
 * document. What is hoisting? What does the word mean, and how does hoisting
 * work in Javascript?
 **

// MY ANSWER:

Hoisting is the process by which the JS interpreter rises up / elevates the position 
of var declarations or function definitions (this way we can execute function calls 
in lines of code ahead their definition.)  Thus, one might use a variable BEFORE it is
declared.  For variables, hoisting elevates only the declaration, leaving the definition
or value assignment in the original place.

 ** 
 */

