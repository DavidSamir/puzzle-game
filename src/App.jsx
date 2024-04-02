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
      <h1>Puzzle Game</h1>
      <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
      <Timer start={showComponent} seconds={seconds} setSeconds={setSeconds} />
      <PuzzleGrid difficulty={difficulty} showComponent={showComponent} setShowComponent={setShowComponent} seconds={seconds} setSeconds={setSeconds} />
    </div>
  );
}

export default App;
