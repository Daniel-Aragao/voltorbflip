function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.level = 1
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
  this.totalCoins = 0;
  this.currentCoins = 0;
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    this.gameLost();
  } else if (result != null) {
    this.currentCoins = (this.currentCoins ? this.currentCoins * result : result);
    this.htmlManager.setCurrentCoins(this.currentCoins);
    if (this.currentCoins == this.board.totalCoins) {
      this.gameWon();
    }
  }
  return result;
}

GameManager.prototype.getTile = function (pos) {
  return this.board.tiles[pos.row][pos.col].value
}

GameManager.prototype.gameWon = function () {
  this.htmlManager.gameWon(this.currentCoins, this.level + 1, this);
}

GameManager.prototype.levelUp = function () {
  this.totalCoins += this.currentCoins;
  this.htmlManager.setTotalCoins(this.totalCoins);
  this.currentCoins = 0;
  this.level = Math.min(this.level+1, 7);
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
}

GameManager.prototype.relative = function (x, n) {
  return -Math.sqrt(x)+Math.sqrt(n)+1
}

GameManager.prototype.gameLost = function () {
  nextlevel = chance.weighted(
    Array.from({ length: this.level }, (_, i) => i+1), 
    Array.from({ length: this.level }, (_, i) => this.relative(i+1, this.level))
    );
  this.htmlManager.gameLost(nextlevel, this);
}

GameManager.prototype.levelDown = function (nextlevel) {
  this.currentCoins = 0;
  this.level = nextlevel;
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
}