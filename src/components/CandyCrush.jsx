import { useState, useEffect } from 'react';
import './CandyCrush.css';
const CandyCrush = () => {
    const rows = 8;
    const cols = 8; // Number of columns
    const candies = ['🍬', '🍭', '🍫', '🍪', '🍩', '🧁', '🍰'];

    //useState([]) initializes the board state variable as an empty array. 
    //Const board holds the current state of the game board, 
    //and setBoard is the function used to update that state:
    const [board, setBoard] = useState([]);
    const [selectedCandy, setSelectedCandy] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    
    // Function to create a random board
    const createBoard = () => {
        const newBoard = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => candies[Math.floor(Math.random() * candies.length)])
        );
        setBoard(newBoard);
    };

    useEffect(() => {
        createBoard();
    }, []);

    const handleCandyClick = (rowIndex, colIndex) => {
        if (selectedCandy) {
            // If a candy is already selected, swap them:
            swapCandies(rowIndex, colIndex);
        } else {
            // Selecting candy:
            setSelectedCandy(board[rowIndex][colIndex]);
            setSelectedPosition([rowIndex, colIndex]);
        }
    };

    const swapCandies = (rowIndex, colIndex) => {
        const [selectedRow, selectedCol] = selectedPosition;

        // Checking if the swap is valid (adjacent candies):
        const isAdjacent =
            (Math.abs(selectedRow - rowIndex) === 1 && selectedCol === colIndex) ||
            (Math.abs(selectedCol - colIndex) === 1 && selectedRow === rowIndex);

        if (isAdjacent) {
            const newBoard = board.map(row => row.slice());
            // Swapping candies:
            newBoard[selectedRow][selectedCol] = board[rowIndex][colIndex];
            newBoard[rowIndex][colIndex] = selectedCandy;

            setBoard(newBoard);
            checkForMatches(newBoard);

            // Resetting selection:
            setSelectedCandy(null);
            setSelectedPosition(null);
        } else {
            // If not adjacent, selection is resetting:
            setSelectedCandy(null);
            setSelectedPosition(null);
        }
    };

    const checkForMatches = (newBoard) => {
        // Checking for matches (3 or more in a row):
        const matchedCandies = [];

        // Checking rows for matches:
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - 2; col++) {
                if (newBoard[row][col] === newBoard[row][col + 1] && newBoard[row][col] === newBoard[row][col + 2]) {
                    matchedCandies.push([row, col]);
                    matchedCandies.push([row, col + 1]);
                    matchedCandies.push([row, col + 2]);
                }
            }
        }

        // Checking columns for matches:
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows - 2; row++) {
                if (newBoard[row][col] === newBoard[row + 1][col] && newBoard[row][col] === newBoard[row + 2][col]) {
                    matchedCandies.push([row, col]);
                    matchedCandies.push([row + 1, col]);
                    matchedCandies.push([row + 2, col]);
                }
            }
        }

        // Removing matched candies:
        if (matchedCandies.length) {
            matchedCandies.forEach(([r, c]) => {
                newBoard[r][c] = null; 
            });
            refillBoard(newBoard);
        }
    };

    const refillBoard = (newBoard) => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (newBoard[row][col] === null) {
                    newBoard[row][col] = candies[Math.floor(Math.random() * candies.length)];
                }
            }
        }
        setBoard(newBoard);
    };

    return (
        <div className="game">
            {/* <h1>Candy Crush</h1> */}
            <div className="candy-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((candy, colIndex) => (
                            <div
                                key={colIndex}
                                className="candy"
                                onClick={() => handleCandyClick(rowIndex, colIndex)}>
                                {candy}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandyCrush;