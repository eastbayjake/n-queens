var rooks = function(n){
  var needToTest = this.blankBoard();
  var results = [];

  this.blankBoard = function(){
    var blankBoard = [];
    for (var i = 0; i < n; i++) {
      blankBoard[i] = [];
      for (var j = 0; j < n; j++) {
        blankBoard[i][j] = true;
      }
    }
    return blankBoard;
  };

  this.nextTestSpace = function(board){
    for (var i = 0; i < n; i++) {
      if (!board[i]) {
        for (var j = 0; j < n; j++) {
          if (board[i][j]) {
            return [i, j];
          }
        }
      }
    }
  };

  this.testSpace = function(){

    var rooksPlaced = [];
    var testBoard = this.blankBoard();

    var testNextSpace = function(tempSpace){
      tempSpace = tempSpace || this.nextTestSpace(needToTest);
      rooksPlaced.push(tempSpace);
      testBoard[tempSpace[0]] = undefined;
      for (var i = 0; i < testBoard.length; i++) {
        if (testBoard[tempSpace[0]] !== undefined) {
          testBoard[i][tempSpace[1]] = undefined;
        }
      }
      var nextTempSpace = this.nextTestSpace(testBoard);
      if (nextTempSpace) {
        testNextSpace(nextTempSpace);
      }
    };

    testNextSpace();

    if (rooksPlaced.length === n) {
      results.push(rooksPlaced);
    }

  };

  // these are storage variables
};