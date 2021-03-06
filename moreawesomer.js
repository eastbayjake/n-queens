var queens = function(n){
  queens.boardStorage = makeTree(queens.blankBoard(n), -1, 0);
  queens.solvedCount = 0;
  queens.solver(n, 0, queens.boardStorage);
  return queens.solvedCount;
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

queens.solver = function(n, y, board){
  var tempboard;
  for (var i = 0; i < n; i++){
    if (board.value[y][i]){
      if (y === n - 1) {queens.solvedCount++; return;}
      tempboard = jQuery.extend(true, {}, board);
      queens.removeCollisions(n, y, i, tempboard);
      board.addChild(tempboard.value, y, i);
    }
  }
  var k = 0;
  for (var j = 0; j < n; j++){
    if (board.value[y][j]){
      queens.solver(n, y + 1, board.children[k]);
      k++;
    }
  }
};

queens.removeCollisions = function(n, y, x, board){
  var column = function(){
    for (var i = 0; i < n; i++) {
      board.value[i][x] = null;
    }
  };
  var majorDown = function(b, a){
    while(b < n - 1 && a > 0){
      b++; a--;
      board.value[b][a] = null;
    }
  };
  var minorDown = function(b, a){
    while(b < n - 1 && a < n - 1){
      b++; a++;
      board.value[b][a] = null;
    }
  };
  column();
  majorDown(y, x);
  minorDown(y, x);
};

// Tree Structure written by Gregory Hilkert (who is awesome: Github.com/EpiphanyMachine)

var makeTree = function(val, row, col){
  var newTree = {
    value: val,
    children: [],
    row: row,
    col: col
  };
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};
treeMethods.addChild = function(val){
  this.children.push(makeTree(val));
  return this.children[this.children.length - 1];
};

treeMethods.contains = function(val){
  return this.value === val || _.any(_.invoke(this.children, 'contains', val));
};

treeMethods.traverse = function(func){
  // calls func on each value in a tree
  func.call(this.value);
  _.invoke(this.children, 'traverse', func);
};
