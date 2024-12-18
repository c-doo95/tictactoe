const resetBtn = document.querySelector(".reset");

const gameboard = (() => {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const getBoard = () => board;

  const placeToken = (row, column, player) => {
    board[row][column] = player;
  };

  const printBoard = () => {
    console.log(board);
  };

  const clearBoard = () => {
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  };

  return { getBoard, placeToken, printBoard, clearBoard };
})();

function GameController(playerXName = "Player X", playerOName = "Player O") {
  const players = [
    {
      name: playerXName,
      token: "X",
    },
    {
      name: playerOName,
      token: "O",
    },
  ];

  const board = gameboard.getBoard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    gameboard.placeToken(row, column, getActivePlayer().token);

    if (checkWin() === false && checkFull() === false) {
      switchPlayerTurn();
      printNewRound();
    } else if (checkWin() === false && checkFull === true) {
      console.log("Draw!");
    }
  };

  const checkWin = () => {
    let token = activePlayer.token;

    if (
      board[0][0] === token &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      console.log(`${activePlayer.name} wins!`);
      return true;
    } else if (
      board[0][2] === token &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      console.log(`${activePlayer.name} wins!`);
      return true;
    } else {
      for (let i = 0; i < 3; i++) {
        if (
          board[i][0] === token &&
          board[i][0] === board[i][1] &&
          board[i][0] === board[i][2]
        ) {
          console.log(`${activePlayer.name} wins!`);
          return true;
        } else if (
          board[0][i] === token &&
          board[0][i] === board[1][i] &&
          board[0][i] === board[2][i]
        ) {
          console.log(`${activePlayer.name} wins!`);
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const checkFull = () => {
    let x = 0;

    for (let i = 0; i < 3; i++) {
      if (board[i].includes(" ")) {
        x += 1;
      }
    }

    if (x > 0) {
      return false;
    } else {
      console.log("Draw!");
      return true;
    }
  };

  const resetGame = () => {
    activePlayer = players[0];
    gameboard.clearBoard();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer, resetGame, checkWin, checkFull };
}

const screenController = (function () {
  const game = GameController();
  const narrDiv = document.querySelector(".narrator");
  const boardDiv = document.querySelector(".gameboard");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = gameboard.getBoard();
    const activePlayer = game.getActivePlayer();

    if (game.checkWin() === false && game.checkFull() === false) {
      narrDiv.textContent = `${activePlayer.name}s turn`;
    } else if (game.checkWin() === false && game.checkFull() === true) {
      narrDiv.textContent = "Draw! Play again?";
    } else if (game.checkWin() === true) {
      narrDiv.textContent = `${activePlayer.name} wins! Play again?`;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let row = i;
        let column = j;

        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.textContent = board[row][column];

        if (board[row][column] === " ") {
          cell.addEventListener("click", () => {
            game.playRound(row, column);

            cell.textContent = board[row][column];
            updateScreen();
          });
        }

        boardDiv.appendChild(cell);
      }
    }
  };

  updateScreen();

  return { updateScreen };
})();
