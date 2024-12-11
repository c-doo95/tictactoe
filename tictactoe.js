function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    };
  };

  const getBoard = () => board;
  
  const placeToken = (row, column, player) => {
    board[row][column].addToken(player);
  };
  
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };

  return { getBoard, placeToken, printBoard };
};

function Cell() {
  let value = ' ';

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
};

function GameController(
  playerXName = 'Player X',
  playerOName = 'Player O'
) {
  const board = Gameboard();

  const players = [
    {
      name: playerXName,
      token: 'X'
    },
    {
      name: playerOName,
      token: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    board.placeToken(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
};

const game = GameController();
