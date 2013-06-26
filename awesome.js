var rooks = function(n){
  this.blankBoard = function(n){
    var blankBoard = [];
    for (var i = 0; i < n; i++) {
      blankBoard[i] = [];
      for (var j = 0; j < n; j++) {
        blankBoard[i][j] = true;
      }
    }
    return blankBoard;
  }

  this.nextTestSpace = function(){
    for (var i = 0; i < n; i++) {
      if (!blankBoard[i]) {
        for (var j = 0; j < n; j++) {
          if (blankBoard[i][j]) {
            return [i, j];
          }
        }
      }
    }
  };

  // these are storage variables
  var needToTest = this.blankBoard(n);

};