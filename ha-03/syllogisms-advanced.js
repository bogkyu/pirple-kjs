/*
Each part is a categorical proposition, 
and each categorical proposition 
 contains two categorical terms.[11]
 
In Aristotle, each of the premises is in the form 

"All A are B,"
"Some A are B",
"No A are B" or
"Some A are not B"
   , where "A" is one term and "B" is another.

"All A are B," and 
"No A are B" 
   are termed universal propositions;
   
"Some A are B" and
"Some A are not B" 
   are termed particular propositions.
   

More modern logicians allow some variation.
Each of the premises has one term in common with the conclusion:
 in a major premise, this is the major term (i.e., the predicate of the conclusion);
 in a minor premise, this is the minor term (i.e., the subject of the conclusion).
 
 
 For example:


'barbara', 'cesare', 'datisi', 'calemes',
'celarent', 'camestres', 'disamis', 'dimatis',
'darii', 'festino', 'ferison', 'fresison',
'ferio', 'baroco', 'bocardo', 'calemos',
'barbari', 'cesaro', 'felapton', 'fesapo',
'celaront', 'camestros', 'darapti', 'bamalip'
*/
// documentation source: https://en.wikipedia.org/wiki/Syllogism

// extracts all vowels from figures' names, by 
// filtering out all consonants from each name
const VALIDSYL = [
'barbara', 'cesare', 'datisi', 'calemes',
'celarent', 'camestres', 'disamis', 'dimatis',
'darii', 'festino', 'ferison', 'fresison',
'ferio', 'baroco', 'bocardo', 'calemos',
'barbari', 'cesaro', 'felapton', 'fesapo',
'celaront', 'camestros', 'darapti', 'bamalip'].map(function(x){
  return x.split("").filter(function(x) {
    return "aeio".indexOf(x) >=0;
  }).join("");
});

// creates a proposition object
// params: premise: one of a, e, i, or o with meanings:
// a - all  is       ( any    SS   is       PP)
// e - none is       (  no    SS   is       PP)
// i - some is       (some    SS   is       PP)
// o - some is not   (some    SS   is not   PP)
function Proposition(premise, subject, predicate) {
  return {
    x: premise,
    s: subject,
    p: predicate
  };
}

function strProp(proposition) {
  let premise = '?';
  let pfx = '';
  let singular = proposition.s.charAt(0).match(/[A-Z]/) !== null;
  switch (proposition.x) {
    case 'a' : [premise, pfx] = singular ? ['is', ''] : ['are', 'all'] ; break;
    case 'e' : [premise, pfx] = singular ? ['is', 'no'] :  ['are', 'no'] ; break;
    case 'i' : [premise, pfx] = singular ? ['is', 'some'] : ['are', 'some'] ; break;
    case 'o' : [premise, pfx] = singular ? ['is not', 'some'] : ['are not', 'some'] ; break;
  }
  return (pfx + ' ' + proposition.s + ' ' + premise + ' ' + proposition.p).trim();
}

function eqprop(p, o) {
  return p.x == o.x &&
    p.s == o.s &&
    p.p == o.p ;
}

function checkConclusion(major, minor, conclusion) {
  const deduced = Proposition(conclusion.x, minor.s, major.p);
  const syltype = major.x + minor.x + conclusion.x;

  if( VALIDSYL.indexOf(syltype) >= 0 ) {
    if( eqprop(conclusion, deduced) ) {
      return "TRUE: " + strProp(conclusion);
    } else { 
      return "FALSE: " + strProp(conclusion) +  ", (hypothesize: " + strProp(deduced) + ")";
    }
  } else {
    VALIDSYL.forEach(x => console.log(x));
    return "ERR: syllogism not defined (" + syltype + ") for: " + strProp(conclusion);
  }
}

function getsyl (majorpremise, minpremise, conclusiontocheck) {}

const ALL_MEN_MORTAL = Proposition('a','man','mortal');
const SOCRATE_IS_MAN = Proposition('a','Socrate','man');
const SOCRATE_MORTAL = Proposition('a','Socrate','mortal');
[
  ALL_MEN_MORTAL,
  SOCRATE_IS_MAN,
  SOCRATE_MORTAL,
].forEach(function(p){
  console.log(strProp(p));
});


console.log(checkConclusion(ALL_MEN_MORTAL, SOCRATE_MORTAL, SOCRATE_MORTAL)) ;
