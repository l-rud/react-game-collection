import { useState } from 'react';
import './TicTacToe.css';
import confetti from 'canvas-confetti';

const TicTacToe = () => {
  // Initial state for the board, game status, whose turn it is (X or O)
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  const winner = calculateWinner(board);

  // Function to handle the click event on a square
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore the click if the game is over or the square is already filled
    const newBoard = board.slice(); // // Update the board with the current player's move
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to render a single square
  //Each square is clickable and displays the current player's mark (X or O)
  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  // Function to determine the status of the game (winner, draw, or next player)
  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square)) {
      return 'Draw!';
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game">
      {/* <h1>Tic-Tac-Toe</h1> */}
      <br />
      <div className="status">{getStatus()}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  // Possible winning combinations:
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;