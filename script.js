const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];

const boardEl = document.getElementById('game-board');
const messageEl = document.getElementById('message');

// Initialize board array and create cells
function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  boardEl.innerHTML = '';

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      boardEl.appendChild(cell);
    }
  }

  boardEl.addEventListener('click', handleClick);
}

function handleClick(e) {
  const col = e.target.dataset.col;
  if (col === undefined) return;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      updateCell(row, col, currentPlayer);
      if (checkWin(row, col)) {
        messageEl.textContent = `${currentPlayer === 'red' ? 'Player 1 🔴' : 'Player 2 🟡'} Wins! 🎉`;
        boardEl.removeEventListener('click', handleClick);
        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      messageEl.textContent = currentPlayer === 'red' ? "Player 1's Turn 🔴" : "Player 2's Turn 🟡";
      break;
    }
  }
}

function updateCell(row, col, player) {
  const cells = document.querySelectorAll('.cell');
  const index = row * COLS + parseInt(col);
  const disc = document.createElement('div');
  disc.classList.add('disc', player);
  cells[index].appendChild(disc);
}

function checkWin(row, col) {
  return checkDirection(row, col, 1, 0) ||  // Vertical
         checkDirection(row, col, 0, 1) ||  // Horizontal
         checkDirection(row, col, 1, 1) ||  // Diagonal /
         checkDirection(row, col, 1, -1);   // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;
  count += countDiscs(row, col, rowDir, colDir);
  count += countDiscs(row, col, -rowDir, -colDir);
  return count >= 4;
}

function countDiscs(row, col, rowDir, colDir) {
  let r = row + rowDir;
  let c = parseInt(col) + colDir;
  let count = 0;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function resetGame() {
  currentPlayer = 'red';
  messageEl.textContent = "Player 1's Turn 🔴";
  createBoard();
}

// Start the game
createBoard();
