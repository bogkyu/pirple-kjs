
abe(ne("h1", {'innerText' : 'TODO Application'}, {'style' : { 'color' : 'red'}}));

////  helpers ////

// create new elemment
function ne(what, ...rest) {
  const el = document.createElement(what);
  for(p of rest) {
    // console.log('param', p);
    const keys = Object.keys(p);
    for( k of keys) {
      // console.log('key', k);
      const prop = p[k];
      switch( typeof(prop)) {
        case 'string':
          el[k] = prop;
          break;
        default:
          // console.log('ignored', prop);
          break;
      }
    }
  }
  return el;
}

// append nodes
function abe(what) { return ae(document.body, what); }
function ae(where, what) { return where.appendChild(what); }

// remove nodes
function rbe(what) { return re(document.body, what); }
function re(where, what) { return where.removeChild(what); }
