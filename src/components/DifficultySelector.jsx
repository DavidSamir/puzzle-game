// components/DifficultySelector.js
import React from 'react';

function DifficultySelector({ difficulty, onChange }) {
  const handleDifficultyChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;
