import React, { useState } from 'react';
import PuzzleGrid from './components/PuzzleGrid';
import Timer from './components/Timer';
import DifficultySelector from './components/DifficultySelector';
import Scoreboard from './components/ScoreSudoku';
import './App.css'


function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [showComponent, setShowComponent] = useState(undefined);
  const [seconds, setSeconds] = useState(0);


  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
    <div className="App">
      <header>
        <h4>Puzzle Game</h4>
        <div>
          <p onClick={() => { setShowComponent(2) }}>2048</p>
          <p onClick={() => { setShowComponent(0) }}>Sudoku</p>
          <p onClick={() => { setShowComponent(1) }}>Tic-Tac-Toe</p>
        </div>
      </header>
      <div className='body'>
        <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
        <Timer start={showComponent} seconds={seconds} setSeconds={setSeconds} />
        <PuzzleGrid difficulty={difficulty} showComponent={showComponent} setShowComponent={setShowComponent} seconds={seconds} setSeconds={setSeconds} />
      </div>
    </div>
  );
}

export default App;
