const express = require('express');
const sudokuController = require('./sudokuController');

const router = express.Router();


router.post('/sudoku', (req, res) => {
  try {
    const { timeTaken, incorrectCells, emptyCells, grid } = req.body;
    const query = `INSERT INTO sudoku (time, incorrect_cells, empty_cells, date, sudoku) VALUES (?, ?, ?, ?, ?)`;
    const values = [timeTaken, incorrectCells, emptyCells, new Date(), JSON.stringify(grid)];

    // Execute query
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving sudoku to MySQL:', error);
        res.status(500).json({ message: 'Failed to save sudoku' });
        return;
      }
      res.status(200).json({ message: 'Data saved successfully', id: results.insertId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save sudoku' });
  }
});
router.get('/sudoku', (req, res) => {
  connection.query('SELECT * FROM sudoku', (error, results) => {
    if (error) {
      console.error('Error fetching sudoku from MySQL:', error);
      res.status(500).json({ message: 'Failed to fetch sudoku' });
      return;
    }
    res.status(200).json(results);
  });
});

router.get('/sudoku/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM sudoku WHERE id = ?', id, (error, results) => {
    if (error) {
      console.error('Error fetching sudoku from MySQL:', error);
      res.status(500).json({ message: 'Failed to fetch sudoku' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Data not found' });
      return;
    }
    res.status(200).json(results[0]);
  });
});

router.put('/sudoku/:id', (req, res) => {
  const id = req.params.id;
  const { timeTaken, incorrectCells, emptyCells, grid } = req.body;
  const query = 'UPDATE sudoku SET time = ?, incorrect_cells = ?, empty_cells = ?, date = ?, sudoku = ? WHERE id = ?';
  const values = [timeTaken, incorrectCells, emptyCells, new Date(), JSON.stringify(grid), id];
  connection.query(query, values, (error) => {
    if (error) {
      console.error('Error updating sudoku in MySQL:', error);
      res.status(500).json({ message: 'Failed to update sudoku' });
      return;
    }
    res.status(200).json({ message: 'Data updated successfully' });
  });
});

router.delete('/sudoku/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM sudoku WHERE id = ?', id, (error) => {
    if (error) {
      console.error('Error deleting sudoku from MySQL:', error);
      res.status(500).json({ message: 'Failed to delete sudoku' });
      return;
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  });
});


module.exports = router;
