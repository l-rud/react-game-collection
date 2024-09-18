import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

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