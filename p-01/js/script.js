// TERMINAL ELEMENTS
function E_HOME_TITLE() {
  return ae(neTextStyle('div', '', 'title'), [
    ae(neTextStyle('div', '', 'tleft'), [
      neTextStyle('div', 'TODO Application', 'home'),
      neTextStyle('div', '', 'navbar')
    ]),
    ae(neTextStyle('div', '', 'tright'), [
      neTextStyle('div', '', 'settings'),
      neTextStyle('div', '', 'logout')
    ]),
  ]);
}

function E_HOME_MESSAGE() {
  return neTextStyle('div'
  , 'Welcome to this TODO aplication, please sign up, or log in', 'homemsg');
}

function E_USERFORM (tos) {
  const userform = ae(neTextStyle('div', '', 'userdata'), [
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'First Name:', 'label'),
      ne('input', {'type': 'text', 'className': 'textedit'})
    ]),
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'Last Name:', 'label'),
      ne('input', {'type': 'text', 'className': 'textedit'})
    ]),
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'E-mail:', 'label'),
      ne('input', {'type': 'email', 'className': 'textedit'})
    ]),
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'Password:', 'label'),
      ne('input', {'type': 'password', 'className': 'textedit'})
    ]),
  ]);
  if( tos ) {
    ae(userform,
      ae(neTextStyle('div', '', 'input'), [
        neTextStyle('span', 'Agree ToS:', 'label'),
        ne('input', {'type': 'checkbox', 'className': 'textedit'})
      ])
    );
  }
  return userform;
}

function E_BUTTONS(firstB, secondB) {
  return ae(neTextStyle('div', '', 'buttons'), [
    neTextStyle('a', firstB, 'signbutton'),
    neTextStyle('a', secondB, 'signbutton')]
  );
}

function E_LOGINFORM () {
  return ae(neTextStyle('div', '', 'userdata'), [
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'E-mail:', 'label'),
      ne('input', {'type': 'email', 'className': 'textedit'})
    ]),
    ae(neTextStyle('div', '', 'input'), [
      neTextStyle('span', 'Password:', 'label'),
      ne('input', {'type': 'password', 'className': 'textedit'})
    ])
  ]);
}

function E_DASHBOARD () {
  return ae(neTextStyle('div', '', ''), [
    neTextStyle('ul', '', 'todolist')
  ]);
}

function E_LISTDESCR () {
  return ae(neTextStyle('div', '', ''), [
    neTextStyle('input', '', 'listdescr'),
    neTextStyle('button', '', 'renamebutton')
  ]);
}

function E_ITEMSLIST () {
  return ae(neTextStyle('div', '', ''), [
    neTextStyle('ul', '', 'todoitems')
  ]);
}

function E_ITEM () {
  return ae(neTextStyle('div', '', ''), [
    neTextStyle('input', '', 'itemdescr'),
    ne('input', {'type': 'checkbox', 'className': 'tododone'})
  ]);
}

// PAGES
function FIRST_PAGE () {
  return [E_HOME_TITLE(), E_HOME_MESSAGE(),E_BUTTONS("Sign up", "Sign in")];
}

function SIGNUP_PAGE() {
  return [E_HOME_TITLE(), E_USERFORM("tos"), E_BUTTONS("Submit", "Cancel")];
}

function SIGNIN_PAGE () {
  return [E_HOME_TITLE(), E_LOGINFORM(), E_BUTTONS("Log in", "Cancel")];
}

function ACCSET_PAGE () {
  return [E_HOME_TITLE(), E_USERFORM(), E_BUTTONS("Save", "Cancel")];
}

function DASHBOARD_PAGE () {
  return [E_HOME_TITLE(), E_DASHBOARD(), ] ;
}

function ITEMS_PAGE () {
  return [E_HOME_TITLE() , E_LISTDESCR(), E_ITEMSLIST()
    , E_BUTTONS('Save', 'Reset')] ;
}

ITEMS_PAGE().forEach(x=> abe(x));

/**
 * DATA MODEL: data in localStorage:
 * each user has an entry based on key 'email'
 * the object stored is a stringified JSON image of the data
 * object structure:
 * firstName, lastName, email, (encrypted) password,
 * and an array of todo lists;
 * each list has a description and an array of items
 * each item is an object formed by
 * a description, checked status (DONE or not).
 */

function setupItem(obj, itemDescr, checked) {
   obj.itemDescr = itemDescr;
   obj.checked = checked;
}
function createItem() {
   return {
     checked : false,
     itemDescr: ""
   };
 }

function setupList(obj, listDescr, items) {
  obj.listDescr = listDescr;
  obj.items = items;
}
function createList() {
  return {
    listDescr: "",
    items: []
  };
}

function setupUser(obj, firstName, lastName, email, password) {
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.email = email;
  obj.password = password;
}
function createUser() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    lists: []
  };
}

////  helpers ////

// create new element with associated style
function neTextStyle(tag, text, styleClass) {
  //return ne(tag, {'innerText': text}, {'style': {'className': styleClass}});
  return ne(tag, {'innerText': text}, {'className': styleClass});
}

// create new elemment
// ex: abe(ne("h1", {'innerText' : APP_NAME}, {'style' : { 'color' : 'red'}}));
// ex: abe(ne("p", {'innerText' : 'Some paragraph'}));
function ne(what, ...rest) {
  const el = document.createElement(what);
  for(p of rest) {
    // console.log('param', p);
    elattb(el, p);
  }
  el.id = Math.floor(Math.random()*100000);
  el.addEventListener('click', e => {
    console.log('event:', e.srcElement.id, e.srcElement.innerText, e.target);
    // console.log('event:', e);
    if( e.target.tagName === 'BUTTON') {
      //console.log('Data:', '<<', data, '>>');
      console.log(localStorage.length);
      let test = {
        email: "mail@example.com",
        firstName: "John",
        lastName: "Doe",
        password: 'this issa mine passwort'
      };
      const data = e.target.parentNode.getElementsByTagName("input");
      const input = parseInt(data[0].value);
      switch(input){
        case 1:
        localStorage.setItem(test.email, JSON.stringify(test));
        break;
        case 2:
        test = localStorage.getItem(test.email);
        if( test ) {
          test = JSON.parse(test);
          console.log(test);
        }
        break;
        case 3:
        clog('before: ', localStorage.length);
        localStorage.removeItem(test.email);
        clog(' after: ', localStorage.length);
        break;

      }
    }
    //if( e.target.)
    // console.log('event:', e,srcElement.id, e.srcElement.innerText);
  });
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

// to be tested
// remove all elements of a node
function rall(node) {
  if( typeof(node.hasChildNodes) === 'function' )
    while (node.hasChildNodes())
      node.removeChild(node.lastChild);
}

function clog(...rest) {
  console.log(...rest);
}
