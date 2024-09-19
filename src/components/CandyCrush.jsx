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


    return (
        <div className="game">
            {/* <h1>Candy Crush</h1> */}
            <div className="candy-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((candy, colIndex) => (
                            <div key={colIndex} className="candy">
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