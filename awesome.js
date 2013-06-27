var queens = function(n){
  // 0,0 is the top left corner
  queens.testCounter = 0;
  queens.solvedCounter = 0;
  queens.testBoard = queens.blankBoard(n);
  queens.solveRow(0);
  // queens.testSpace(n);
  return queens.solvedCounter;
};

queens.blankRow = function(n){
  var blankRow = [];
  blankRow[0] = [];
  for (var i = 0; i < n; i++) {
    blankRow[0][i] = true;
  }
  return blankRow;
};

queens.blankBoard = function(n){
  var blankBoard = [];
  for (var i = 0; i < n; i++) {
    blankBoard[i] = [];
    for (var j = 0; j < n; j++) {
      blankBoard[i][j] = true;
    }
  }
  return blankBoard;
};


queens.removeCollisions = function(x, y){
  var row = function(){
    queens.testBoard[x] = undefined;
  };
  var column = function(){
    for (var i = 0; i < n; i++) {
      queens.testBoard[i][y] = undefined;
    }
  };
  var majorUp = function(){
    while(x < n && y > 0){
      x++; y--;
      queens.testBoard[x][y] = undefined;
    }
  };
  var minorUp = function(){
    while(x > 0 && y > 0){
      x--; y--;
      queens.testBoard[x][y] = undefined;
    }
  };
  var majorDown = function(){
    while(x > 0 && y < n){
      x--; y++;
      queens.testBoard[x][y] = undefined;
    }
  };
  var minorDown = function(){
    while(x < n && y < n){
      x++; y++;
      queens.testBoard[x][y] = undefined;
    }
  };
  testCounter++;
  row();
  column();
  majorUp();
  majorDown();
  minorUp();
  minorDown();
};

queens.solveRow = function(y){
  // original top row
  for (var x = 0; x < n; x++) {
    queens.testBoard[y][x] = undefined;
    queens.removeCollisions(y,x);
    queens.solveRecursive(y);
  }
};

queens.solveRecursive = function(y){
  var nextRow = y + 1;
  for (x = 0; x < n; x++){
    if (queens.testBoard[nextRow][x]) {
      queens.removeCollisions(nextRow, x);
    } else { return; }
    if (queens.testCounter < n){
      queens.solveRow(nextRow);
    }
  }
};


// *********************************************************

queens.nextOpenSpace = function(n, board){
  for (var i = 0; i < n; i++) {
    if (board[i][0]) {
      for (var j = 0; j < n; j++) {
        if (board[i][j]) {
          return [i, j];
        }
      }
    }
  }
};

queens.testSpace = function(n, stop){
  if (stop) { return; }
  var queensPlaced = [];
  // var testBoard = queens.blankBoard(n);

  var testNextSpace = function(n, tempSpace){
    if (!tempSpace){
      tempSpace = queens.nextOpenSpace(n, queens.needToTest);
      if (!tempSpace) {return 'stop';}
      queens.needToTest[tempSpace[0]][tempSpace[1]] = undefined;
    }

    queensPlaced.push(tempSpace);
    testBoard[tempSpace[0]] = undefined;
    for (var i = 0; i < testBoard.length; i++) {
      if (testBoard[i]) {
        testBoard[i][tempSpace[1]] = undefined;
      }
    }
    var nextTempSpace = queens.nextOpenSpace(n, testBoard);
    if (nextTempSpace) {
      testNextSpace(n, nextTempSpace);
    }
  };

  stop = testNextSpace(n);
  if (queensPlaced.length === n) {
    queens.results.push(queensPlaced);
    // for(i = 0; i < n; i++){
    //   queens.needToTest[queensPlaced[i][0]][queensPlaced[i][1]] = undefined;
    // }
  }
  queens.testSpace(n, stop);
};


//PSEUDOCODE: SUBROUTINE
// (1) Place a rook an allowed spot in the top row
// (2) Examine possibilities for the row below you