const express = require('express');
const connection = require('./db');

const router = express.Router();


router.post('/sudoku', (req, res) => {
  try {
    const { time, incorrectCells, emptyCells, data } = req.body;
    const query = `INSERT INTO sudoku (time, incorrect_cells, empty_cells, date, data) VALUES (?, ?, ?, ?, ?)`;
    const values = [time, incorrectCells, emptyCells, new Date(), JSON.stringify(data)];

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

module.exports = router;
