import React, { useState } from 'react';
import PuzzleGrid from './components/PuzzleGrid';
import Timer from './components/Timer';
import DifficultySelector from './components/DifficultySelector';
import Scoreboard from './components/Scoreboard';
import './App.css'


function App() {
  const [difficulty, setDifficulty] = useState('easy');
  
  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    // Handle difficulty change logic here (e.g., generate new puzzle)
  };

  return (
    <div className="App">
      <h1>Puzzle Game</h1>
      <DifficultySelector
        difficulty={difficulty}
        onChange={handleDifficultyChange}
      />
      <Timer />
      <PuzzleGrid difficulty={difficulty} />
      <Scoreboard />
    </div>
  );
}

export default App;
