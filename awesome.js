var queens = function(n){
  // 0,0 is the top left corner
  queens.testQueensCounter = 0;
  queens.testRowCounter = 0;
  queens.solvedCounter = 0;
  queens.solveTopRow(n);
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

// do we need to switch the x and y in this function?
queens.removeCollisions = function(n, y, x){
  var row = function(){
    queens.testBoard[y] = [];
  };
  var column = function(){
    for (var i = 0; i < n; i++) {
      queens.testBoard[i][x] = undefined;
    }
  };
  // var majorUp = function(){
  //   while(y < n - 1 && x > 0){
  //     y++; x--;
  //     queens.testBoard[y][x] = undefined;
  //   }
  // };
  // var minorUp = function(){
  //   while(y > 0 && x > 0){
  //     y--; x--;
  //     queens.testBoard[y][x] = undefined;
  //   }
  // };
  var majorDown = function(b, a){
    while(b < n - 1 && a > 0){
      b++; a--;
      queens.testBoard[b][a] = undefined;
    }
  };
  var minorDown = function(b, a){
    while(b < n - 1 && a < n - 1){
      b++; a++;
      queens.testBoard[b][a] = undefined;
    }
  };
  queens.testQueensCounter++;
  row();
  column();
  // majorUp();
  majorDown(y, x);
  // minorUp();
  minorDown(y, x);
};

queens.solveTopRow = function(n) {
  for (var x = 0; x < n; x++){
    queens.testBoard = queens.blankBoard(n);
    queens.removeCollisions(n, 0, x);
    queens.testRowCounter++;
    queens.solveRecursive(n, 0, x);
  }
};

queens.solveRow = function(n, y, x){
  if (x) {
    if (queens.testBoard[y][x]) {
      queens.removeCollisions(n, y, x);
      queens.testRowCounter++;
      queens.solveRecursive(n, y, x);
    }
  } else {
    for (var i = 0; i < n; i++) {
      if (queens.testBoard[y][i]) {
        queens.removeCollisions(n, y, i);
        queens.testRowCounter++;
        queens.solveRecursive(n, y, x);
      }
    }
  }
};

queens.solveRecursive = function(n, y, tempX){
  var nextRow = y + 1;
  for (var x = 0; x < n; x++){
    if (queens.testBoard[nextRow][x]) {
      queens.removeCollisions(n, nextRow, x);
      if (queens.testRowCounter < n){
        queens.solveRow(n, nextRow);
      } else if (queens.testQueensCounter === n) {
        queens.solvedCounter++;
        queens.testBoard = queens.blankBoard();
        return;
      } else {
        queens.testBoard = queens.blankBoard();
        queens.solveRow(n, y, tempX + 1);
      }
    }
    if (queens.testRowCounter < n){
    queens.testBoard = queens.blankBoard();
    }
  }
};


// *********************************************************

// queens.nextOpenSpace = function(n, board){
//   for (var i = 0; i < n; i++) {
//     if (board[i][0]) {
//       for (var j = 0; j < n; j++) {
//         if (board[i][j]) {
//           return [i, j];
//         }
//       }
//     }
//   }
// };

// queens.testSpace = function(n, stop){
//   if (stop) { return; }
//   var queensPlaced = [];
//   // var testBoard = queens.blankBoard(n);

//   var testNextSpace = function(n, tempSpace){
//     if (!tempSpace){
//       tempSpace = queens.nextOpenSpace(n, queens.needToTest);
//       if (!tempSpace) {return 'stop';}
//       queens.needToTest[tempSpace[0]][tempSpace[1]] = undefined;
//     }

//     queensPlaced.push(tempSpace);
//     testBoard[tempSpace[0]] = undefined;
//     for (var i = 0; i < testBoard.length; i++) {
//       if (testBoard[i]) {
//         testBoard[i][tempSpace[1]] = undefined;
//       }
//     }
//     var nextTempSpace = queens.nextOpenSpace(n, testBoard);
//     if (nextTempSpace) {
//       testNextSpace(n, nextTempSpace);
//     }
//   };

//   stop = testNextSpace(n);
//   if (queensPlaced.length === n) {
//     queens.results.push(queensPlaced);
//     // for(i = 0; i < n; i++){
//     //   queens.needToTest[queensPlaced[i][0]][queensPlaced[i][1]] = undefined;
//     // }
//   }
//   queens.testSpace(n, stop);
// };


//PSEUDOCODE: SUBROUTINE
// (1) Place a rook an allowed spot in the top row
// (2) Examine possibilities for the row below you