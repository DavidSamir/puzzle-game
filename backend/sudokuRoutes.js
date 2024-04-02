const express = require('express');
const connection = require('./db');

const router = express.Router();

router.post('/sudoku', async (req, res) => {
  try {
    const { time, incorrectCells, emptyCells, data } = req.body;
    const query = `INSERT INTO sudoku (time, incorrect_cells, empty_cells, date, data) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const values = [time, incorrectCells, emptyCells, new Date(), JSON.stringify(data)];

    // Execute query
    const { rows } = await connection.query(query, values);
    const insertedId = rows[0].id;
    res.status(200).json({ message: 'Data saved successfully', id: insertedId });
  } catch (error) {
    console.error('Error saving sudoku to PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to save sudoku' });
  }
});

router.get('/sudoku', async (req, res) => {
  try {
    const { rows } = await connection.query('SELECT * FROM sudoku');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sudoku from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch sudoku' });
  }
});

router.get('/sudoku/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await connection.query('SELECT * FROM sudoku WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching sudoku from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch sudoku' });
  }
});

module.exports = router;
