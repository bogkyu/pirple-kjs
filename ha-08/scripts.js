// page content
const CONTENT = [] ;
const SIDES = [
    [1, 'X', 'clsx'],
    [2, '0', 'clszero']  ];
const EMPTY = -1;

let game;

drawPage();

// board page
function drawPage() {
  let boardSize = 3;
  game = newGame(boardSize);

  CONTENT.forEach(x => re(document.body, x));
  CONTENT.length = 0;

// setup header
  const h1 = ne("h1");
  h1.innerText = "Tic Tac Toe";
  CONTENT.push(h1);
  
  // draws game board
  const divBoard = redrawBoard(game);
  CONTENT.push(divBoard);

  const undoButton = ne("button");
  undoButton.innerText = "Undo";
  undoButton.addEventListener("click", e => {
    if (game.record.length <= 0 ) 
      return;
    const id = game.record.pop();
    const cell = document.getElementById(id);
    console.log(cell);
    drawMove(cell, EMPTY);
    game.board[id] = 0;
    game.turn = ++game.turn % 2;
  });
  CONTENT.push(undoButton);
  // create the page
  CONTENT.forEach(x => ae(document.body, x));
}

function redrawBoard(game) {
  const size = game.size;
  const board = game.board;
  const divBoard = ne("div");
  for(let i=0; i<size; ++i ) {
    // one row
    const divRow = ne("div");
    for(let j=0; j<size; ++j ) {
      const divCell = ne("div");
      divCell.id= i * size + j;
      drawMove(divCell, EMPTY);
      ae(divRow, divCell);
    }
    divRow.classList.add("divRow");
    ae(divBoard, divRow);
  }
  divBoard.addEventListener("click", clickAction);
  divBoard.classList.add("divBoard");
  return divBoard;
}

function drawMove(e, side, symbol, strclass) {
  if (side < 0 ) {
    e.className = "divCell";
    e.innerHTML = "&nbsp;";
  } else {
    e.classList.add(strclass);
    e.innerText = symbol;
  }
}

// events
function clickAction(e) {
  //console.log(e.target + ": " + e.target.id);
  const id = e.target.id;
  const size = game.size;
  const board = game.board;
  const record = game.record;
  switch(board[id]) {
  case 0:
    const [code, symbol, strclass] = SIDES[game.turn];
    record.push(id);
    board[id] = code;
    drawMove(e.target, game.turn, symbol, strclass);
    game.turn = ++game.turn % 2;
    if( game.checkSolution(code) ) {
      setTimeout(() => {
        alert(symbol + " has won!");
        drawPage();
      } , 50);
    } else if( record.length === size * size ) {
      setTimeout(() => {
        alert("Game end, cat's game!");
        drawPage();
      } , 50);
    }
    break;
  }
}

// game
function newGame(size) {
  const board = new Array(size*size).fill(0);
  const solutions = ((size) => {
    function gen(start, step) {
      const ret = [];
      for(let i=0; i<size; ++i )
        ret.push(start + step * i);
      return ret;
    }
    const ret = [] ;
    // horizontals
    for(let i=0; i<size * size; i += size )
      ret.push(gen(i, 1));
    // verticals
    for(let i=0; i<size ; ++i ) 
      ret.push(gen(i, size));
    // diagonals
    ret.push(gen(0, size + 1));
    ret.push(gen(size - 1, size - 1));

    return ret;
  })(size);

  // returns game object
  return {
    size : size ,
    board : board ,
    record : [] ,
    turn : 0 ,
    checkSolution : side => {
      nextsolution: for ( a of solutions ) {
        let ok = true;
        for( b of a) {
          ok = board[b] === side;
          if( !ok ) continue nextsolution;
        }
        console.log("solution: " + a);
        return true;
      }
      return false;
    },
  };
}

// helpers
function ne(what) {
  return document.createElement(what);
}
function ae(where, what) {
  return where.appendChild(what);
}
function re(where, what) {
  return where.removeChild(what);
}
