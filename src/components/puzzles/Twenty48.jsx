import React, { useState, useEffect } from 'react';

const TILE_SIZE = 100;

const Game2048 = ({ difficulty }) => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        initializeBoard();
    }, [difficulty]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowUp') move('up');
            else if (event.key === 'ArrowDown') move('down');
            else if (event.key === 'ArrowLeft') move('left');
            else if (event.key === 'ArrowRight') move('right');
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [board]);

    const initializeBoard = () => {
        let size;
        switch (difficulty) {
            case 'easy':
                size = 4;
                break;
            case 'medium':
                size = 5;
                break;
            case 'hard':
                size = 6;
                break;
            default:
                size = 4;
                break;
        }

        const newBoard = Array.from({ length: size }, () =>
            Array.from({ length: size }, () => 0)
        );

        addRandomTile(newBoard);
        // addRandomTile(newBoard);

        setBoard(newBoard);
        setScore(0);
    };

    const addRandomTile = (currentBoard) => {
        const availableTiles = [];
        currentBoard.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === 0) {
                    availableTiles.push({ x: rowIndex, y: cellIndex });
                }
            });
        });

        if (availableTiles.length > 0) {
            const { x, y } = availableTiles[Math.floor(Math.random() * availableTiles.length)];
            currentBoard[x][y] = Math.random() > 0.8 ? 4 : 2;
        }
    };

    const move = (direction) => {
        const newBoard = [...board];
        let moved = false;
        switch (direction) {
            case 'up':
                for (let col = 0; col < newBoard.length; col++) {
                    for (let row = 1; row < newBoard.length; row++) {
                        if (newBoard[row][col] !== 0) {
                            let newRow = row;
                            while (newRow > 0 && (newBoard[newRow - 1][col] === 0 || newBoard[newRow - 1][col] === newBoard[row][col])) {
                                newRow--;
                            }
                            if (newRow !== row) {
                                newBoard[newRow][col] += newBoard[row][col];
                                newBoard[row][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case 'down':
                for (let col = 0; col < newBoard.length; col++) {
                    for (let row = newBoard.length - 2; row >= 0; row--) {
                        if (newBoard[row][col] !== 0) {
                            let newRow = row;
                            while (newRow < newBoard.length - 1 && (newBoard[newRow + 1][col] === 0 || newBoard[newRow + 1][col] === newBoard[row][col])) {
                                newRow++;
                            }
                            if (newRow !== row) {
                                newBoard[newRow][col] += newBoard[row][col];
                                newBoard[row][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case 'left':
                for (let row = 0; row < newBoard.length; row++) {
                    for (let col = 1; col < newBoard.length; col++) {
                        if (newBoard[row][col] !== 0) {
                            let newCol = col;
                            while (newCol > 0 && (newBoard[row][newCol - 1] === 0 || newBoard[row][newCol - 1] === newBoard[row][col])) {
                                newCol--;
                            }
                            if (newCol !== col) {
                                newBoard[row][newCol] += newBoard[row][col];
                                newBoard[row][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case 'right':
                for (let row = 0; row < newBoard.length; row++) {
                    for (let col = newBoard.length - 2; col >= 0; col--) {
                        if (newBoard[row][col] !== 0) {
                            let newCol = col;
                            while (newCol < newBoard.length - 1 && (newBoard[row][newCol + 1] === 0 || newBoard[row][newCol + 1] === newBoard[row][col])) {
                                newCol++;
                            }
                            if (newCol !== col) {
                                newBoard[row][newCol] += newBoard[row][col];
                                newBoard[row][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
        if (moved) {
            addRandomTile(newBoard);
            setBoard(newBoard);
        }
    };


    return (
        <div className="game-container" tabIndex="0">
            <div className="score">Score: {score}</div>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex} className={`cell cell-${cell}`}>{cell !== 0 && cell}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game2048;
