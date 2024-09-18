import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div className="game">
      {/* <h1>Tic-Tac-Toe</h1> */}
      <br />
      <div className="status">{getStatus()}</div>
      <div className="board">
      </div>
    </div>
  );
};

export default TicTacToe;