function HTMLManager () {
  this.boardContainer = document.querySelector(".board-container");
  this.scoreContainer = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.rowsInfoContainer = document.querySelector(".info_rows");
  this.colsInfoContainer = document.querySelector(".info_cols");

  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.children[r].children[c];
      tile.pos = {row:r, col:c};
    }
  }
}

HTMLManager.prototype.setBoard = function (manager) {
  $(".tile").removeClass("is-flipped")
  $(".tile_back").removeClass("tile_back_bomb tile_back_1 tile_back_2 tile_back_3");
  $(".tile").each(function () {
    if ((value = manager.getTile(this.pos)) == 0) {
      this.children[1].classList.add("tile_back_bomb");
    } else {
      this.children[1].classList.add("tile_back_"+value.toString());
    }
  });
  $(".tile").off()
  $(".tile").on("click", function () {
    this.classList.add('is-flipped');
    manager.flip(this.pos)
  });

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

HTMLManager.prototype.gameWon = function (score, manager) {
  this.messageContainer.innerHTML = "Game clear! You received " + score.toString() + " Coin(s)!";
  // this.messageContainer.classList.remove("hidden");
  // this.messageContainer.classList.add("fadeInDown", "animated");
  // this.messageContainer.classList.toggle("fadeInDown", "animated", "hidden");
  $(".game-message").toggleClass("fadeInDown animated hidden");
  $(".game-message").on("click", function () {
    $(".game-message").off();
    // $(".game-message").removeClass("fadeInDown animated");
    // $(".game-message").addClass("hidden");
    $(".game-message").toggleClass("fadeInDown animated hidden");
    $(".tile").addClass("is-flipped");
    setTimeout(manager.nextLevel, 1000);
  });
}
