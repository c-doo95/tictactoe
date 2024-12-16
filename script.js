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

function Cell() {
  let value = " ";

  const addToken = (player) => {
    value = player;
  };

  return { addToken };
}

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

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();
