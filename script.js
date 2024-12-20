const board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

// Create game board cells
function createBoard() {
  gameBoard.innerHTML = '';
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Check for a winner or a draw
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      return board[a];
    }
  }

  if (board.every(cell => cell)) {
    isGameActive = false;
    return 'Draw';
  }

  return null;
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  
  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');

  const winner = checkWinner();
  if (winner) {
    gameStatus.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = 'X';
  isGameActive = true;
  gameStatus.textContent = "Player X's turn";
  createBoard();
});

// Initialize the game
createBoard();
