function HTMLManager () {
  this.boardContainer = document.querySelector(".board-container");
  this.scoreContainer = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.rowsInfoContainer = document.querySelector(".info_rows");
  this.colsInfoContainer = document.querySelector(".info_cols");
}

HTMLManager.prototype.setBoard = function (manager) {
  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.children[r].children[c];
      tile.pos = {row:r, col:c};
      tile.classList.remove("is-flipped");
      //remove the pre-existing classes for the tile back
      tile.addEventListener("click", function () {
        this.classList.add('is-flipped');
        if ((value = manager.flip(this.pos)) == 0) {
          this.children[1].classList.add("tile_back_bomb");
        } else {
          this.children[1].classList.add("tile_back_"+value.toString());
        }
      });
    }
  }

  for (i = 0; i < 5; i++) {
    Rinfo = this.rowsInfoContainer.children[i];
    Rinfo.children[0].innerHTML = this.toTwoDigits(manager.board.rowsInfo[i].points);
    Rinfo.children[1].innerHTML = manager.board.rowsInfo[i].bombs.toString()

    Cinfo = this.colsInfoContainer.children[i];
    Cinfo.children[0].innerHTML = this.toTwoDigits(manager.board.colsInfo[i].points);
    Cinfo.children[1].innerHTML = manager.board.colsInfo[i].bombs.toString()
  }
}

HTMLManager.prototype.toTwoDigits = function (n) {
  return (n > 9 ? "" : "0") + n.toString();
}

