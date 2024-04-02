import React, { useState, useEffect } from 'react';

const TicTacToe = ({ difficulty, seconds, setShowComponent, setSeconds }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!xIsNext && winner === null) {
      const timeout = setTimeout(() => {
        makeComputerMove();
      }, 1);
      return () => clearTimeout(timeout);
    }
  }, [board, xIsNext, winner]);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
  };

  const makeComputerMove = () => {
    const availableMoves = board.reduce((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);
    let computerMove;
    if (difficulty === 'easy') {
      computerMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === 'medium') {
      computerMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === 'hard') {
      computerMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    const newBoard = [...board];
    newBoard[computerMove] = 'O';
    setBoard(newBoard);
    setXIsNext(true);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className='flex'>
        <p onClick={() => { setShowComponent(undefined); setSeconds(0) }} className='btn'> Back </p>
        <p onClick={() => { saveScore() }} className='btn'> save </p>
      </div>

    </div>
  );
};

const calculateWinner = (squares) => {
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
