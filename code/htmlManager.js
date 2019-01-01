function HTMLManager () {
  this.boardContainer    = document.querySelector(".board-container");
  this.scoreContainer   = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
}

HTMLManager.prototype.update = function (board, data) {
  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.childNodes[r].childNodes[c]
      tile.click(function() {
        board.flip(r, c);
      });
    }
  }
}

