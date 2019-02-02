////////////////////////////////////////////////////////////////////////////////
// JS Part
////////////////////////////////////////////////////////////////////////////////

/*
 * Homework Assignment #7: The DOM
 * 
 * 
 * Details:
 *  
 * Create a very simple webpage, displaying some of your favorite colors. Use
 * HTML, CSS and Javascript.
 * 
 * 1. The top of the page should include a header <h1> tag, with a name for your
 * page, and then an <h2> tag with a description of what's on the page.
 * 
 * 2. Further down the page you should draw 10 rectangles, of any size you wish,
 * and give them each a unique hex-code so they all appear as different colors.
 * Here's a color-picker that might help.
 * 
 * 3. Below each rectangles, list the hex code (in plain text).
 * 
 * 4. Give all of the rectangles the same class, but make sure each rectangle has
 * a unique ID.
 * 
 * 5. Wrap all of the rectangles in an containing element ( a <div> ) and give
 * that element the id "rectangleWrapper". Now give that element 50 pixels of
 * padding on its top, right and left sides. But add zero padding to the bottom.
 * 
 * 6. When the page loads, console.log the messages "Here are the rectangle IDs"
 * and then console.log all the rectangles' IDs, one at a time.
 * 
 * 7. In the <head> of the document, add a <title> tag that matches the text in
 * the <h1> you added in step 1.
 * 
 * 
 * Turning it In:
 * 
 * One of the first slides in this course is called "How to Turn in Homework"
 * review that slide for details on how to send your assignment to us (and
 * receive a grade).
 */


// #1
// The top of the page should include a header <h1> tag,
// with a name for your page, and then an <h2>
// tag with a description of what's on the page.
const h1tag = document.createElement("h1");
h1tag.innerText = "Homework Assignment #7";
const h2tag = document.createElement("h2");
h2tag.innerText = "This is the assignment #7, it plays with colors.  I play instead with how to create a Python zip-like into JS; the version here does not work fine with different array sizes.  But hey! We just want to get a page from JS only.  So I better stop here.";


// #2, 3, and 4
// Further down the page you should draw 10 rectangles
// of any size you wish, and give them each a unique 
// hex-code so they all appear as different colors.
// 
// Below each rectangles, list the hex code (in plain text).
// 
// Give all of the rectangles the same class, but make sure
// each rectangle has a unique ID.
const rectWrapper = document.createElement("div");
const currentColors = getColors();

for( const xy of currentColors ) {
  const [color, nr] = xy;
  const newAtom = document.createElement("div");
  const newColor = document.createElement("div");
  const newText = document.createElement("div");
  const padding = "6px 0px 16px";
  
  newAtom.className = "rectAtom";
  newAtom.id = "id" + nr;
  
  newColor.className = "rectColor";
  newColor.style.backgroundColor = "#" + color;

  newText.className = "rectText";
  newText.innerText = "#" + color;
  newText.style.padding = padding;

  newAtom.appendChild(newColor);
  newAtom.appendChild(newText);
  
  rectWrapper.appendChild(newAtom);
}


// #5
// Wrap all of the rectangles in an containing element
// ( a <div> ) and give that element the id "rectangleWrapper".
// Now give that element 50 pixels of padding on its 
// top, right and left sides. But add zero padding to the bottom

// practice get element by id
// this would not work: rectWrapper still not added to document as its child!!!
// const rwrp = document.getElementById("rectangleWrapper");
// instead use this:
rectWrapper.style.padding = "50px 50px 0px";
rectWrapper.id = "rectangleWrapper";


// #6
// When the page loads, console.log the messages 
// "Here are the rectangle IDs" and then console.log 
// all the rectangles' IDs, one at a time.
// grabbed some code from https://stackoverflow.com/questions/1235985/attach-a-body-onload-event-with-js
function fnOnLoad() {
  console.log("Here are the rectangle IDs");
  currentColors.forEach( x => console.log("Rectangle ID: id" + x[1] + ", has color code: #" + x[0]));
}

window[ 
  addEventListener 
  ? 'addEventListener' 
  : 'attachEvent' ]
( addEventListener
 ? 'load'
 : 'onload', fnOnLoad );


// #7
// In the <head> of the document, add a <title> tag 
// that matches the text in the <h1> you added in step 1.
// console.log("title is:" + document.querySelector("title"));

// suppose we are having no reference to h1
const h1ref = document.querySelector("h1");
const title = document.createElement("TITLE");
title.innerText = h1ref === null ? "No H1 defined" : h1ref.innerText;
document.head.appendChild(title);


// append elements to document, in order to be rendered
[h1tag, h2tag, rectWrapper].forEach(
  x => {
    document.body.appendChild(x);
  }
);

// helper function, 
// returns array of [hexcodedcolor, arrayindex]
function getColors(n) {
  let ret = [];
  n = n && 0 < n && n <= 10 ? n : 10;
  function cc (n) {
    let ret = [];
    const MAXCOLORS= 0xff;
    while( --n >= 0 ) {
      const result = Math.random() * MAXCOLORS;
      ret.push(
        ("00" + (~~result).toString(16)).slice(-2)
      );
    }
    return ret;
  }
  const red = cc(n);
  const grn = cc(n);
  const blu = cc(n);
  // snippet in return expression was grabbed from:
  // https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
  // for python zip-like (still limited) definition
  return (rows => 
          rows[0].map((_,c) => 
                      rows.map(row => 
                               row[c])))(
    [red, grn, blu]
  ).map(([r, g, b], c) => [r + g + b, c]);
}
