let board = document.querySelector('.board');
let nextPlayer = document.querySelector('.nextPlayer');
let body = document.querySelector('body');

for (let i = 0; i < 9; i++) {
  let btn = document.createElement('button');
  btn.addEventListener('click', handleClick);
  btn.setAttribute('class', 'square');
  if (i === 3 || i === 6) {
    let br = document.createElement('br');
    board.appendChild(br);
  }
  board.appendChild(btn);
}

function handleClick(e) {
  if (e.target.textContent !== '') {
    return;
  }
  
  if (nextPlayer.textContent.substring(0, 9) === 'Game over') {
    return;
  }

  let player = nextPlayer.textContent[nextPlayer.textContent.length - 1];
  if (player === 'X') {
    e.target.textContent = 'X';
  }
  else {
    e.target.textContent = 'O';
  }

  const winner = calculateWinner();
  if (winner) {
    nextPlayer.textContent = `Game over! Player ${player} won.`
    let reset = document.createElement('button');
    reset.addEventListener('click', resetGame);
    reset.textContent = 'Reset';
    reset.setAttribute('class', 'reset');
    body.appendChild(reset);
  }
  else {
    nextPlayer.textContent = player === 'X' ? 'Next player: O' : 'Next player: X';
  }
}

function calculateWinner() {
  let btns = document.querySelectorAll('.square');
  let moves = [];
  for (let i = 0; i < btns.length; i++) {
    moves.push(btns[i].textContent);
  }

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      return moves[a];
    }
  }
  return null;
}

function resetGame(e) {
  btns = document.querySelectorAll('.square');
  for (const btn of btns) {
    btn.textContent = '';
  }
  nextPlayer.textContent = 'Next player: X';
  e.target.remove();
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];