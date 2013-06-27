var queens = function(n){
  queens.boardStorage = makeTree(queens.blankBoard(), -1, 0);
  queens.solvedCount = 0;
  queens.testBoard = null;
  queens.solver(n, 0, queens.boardStorage);
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
    if (queens.testBoard[y][i]){
      if (y === n - 1) {queens.solvedCount++; return;}
      tempboard = queens.testBoard;
      queens.removeCollisions(n, y, i, tempboard);
      queens.testBoard.addChild(tempboard, y, i);
    }
  }
  for (var j = 0; j < n; j++){
    if (queens.testBoard[y][j]){
      queens.solver(n, y + 1, queens.testBoard.children[j]);
    }
  }
};

queens.removeCollisions = function(n, y, x, board){
  var column = function(){
    for (var i = 0; i < n; i++) {
      board[i][x] = undefined;
    }
  };
  var majorDown = function(b, a){
    while(b < n - 1 && a > 0){
      b++; a--;
      board[b][a] = undefined;
    }
  };
  var minorDown = function(b, a){
    while(b < n - 1 && a < n - 1){
      b++; a++;
      board[b][a] = undefined;
    }
  };
  row();
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
    col: col,
    parent: null
  };
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};
treeMethods.addChild = function(val){
  this.children.push(makeTree(val));
  this.children[this.children.length - 1].parent = this;
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

treeMethods.removeFromParent = function(){
  // find and remove link to child in parent
  var newTree = this; // this changes in the each function so use a temp var
  _.each(this.parent.children, function(child, index, children){
    if(newTree === child) {children.splice(index, 1);}
  });
  // remove link to parent and return new tree
  this.parent = null;
  return newTree;
};