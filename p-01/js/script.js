const APP_NAME = 'TODO Application';
const WELCOME_MSG = 'Welcome to this TODO aplication, please sign up, or log in'

//abe(ne("h1", {'innerText' : APP_NAME}, {'style' : { 'color' : 'red'}}));
//abe(ne("p", {'innerText' : 'Some paragraph'}));

const FIRST_PAGE = [
  neTextStyle('h1', APP_NAME, 'clsTitle'),
  neTextStyle('h2', WELCOME_MSG, 'clsWelcome'),
  ae(neTextStyle('div', '', 'clsSLButtons'),
    [neTextStyle('a', 'Sign up', 'clsButton'),
    neTextStyle('a', 'Log in', 'clsButton')]),
];

FIRST_PAGE.forEach(x=> abe(x));

////  helpers ////

// create new element with associated style
function neTextStyle(tag, text, styleClass) {
  //return ne(tag, {'innerText': text}, {'style': {'className': styleClass}});
  return ne(tag, {'innerText': text}, {'className': styleClass});
}

// create new elemment
function ne(what, ...rest) {
  const el = document.createElement(what);
  for(p of rest) {
    // console.log('param', p);
    elattb(el, p);
  }
  return el;
}

// setup attributes to el node
function elattb(el, obj, slot) {
  let fel = e =>  {
    let ret ;
    if( ! slot )
      ret = el;
    else {
      ret = el[slot];
      if( !ret )
        ret = el[slot] = {}; // array ?
    }
    return ret;
  }
  // console.log('param', obj);
  const keys = Object.keys(obj);
  for( k of keys) {
    const prop = obj[k];
    // console.log('----- key/value -----');
    // console.log(k, '/', prop);
    // console.log(slot);
    const xel = fel(el);
    switch( typeof(prop)) {
      case 'string':
        xel[k] = prop;
        break;
      default:
      // console.log('ignored', prop);
        if( prop instanceof Array ) {
          console.log("array ignored", prop);
        } else {
          // console.log(el.nodeName);
          // console.log(el[k]);
          elattb(xel, prop, k);
        }
        break;
    }
  }
  return el;
}

// append nodes
function abe(what) { return ae(document.body, what); }
function ae(where, what) {
  if( ! (what instanceof Array) )
    what = [what];
  what.forEach( x => where.appendChild(x));
  return where;
}

// remove nodes
function rbe(what) { return re(document.body, what); }
function re(where, what) {
  if( ! (what instanceof Array) )
    what = [what];
  what.forEach( x => where.removeChild(x));
  return where;
}
