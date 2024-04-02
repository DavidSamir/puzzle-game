const express = require('express');
const connection = require('./db');

const router = express.Router();

router.post('/ticTacToe', async (req, res) => {
  try {
    const { time, data, difficulty, winner } = req.body;
    const query = `INSERT INTO ticTacToe (time, difficulty, winner, date, data) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const values = [time, difficulty, winner, new Date(), JSON.stringify(data)];

    // Execute query
    const { rows } = await connection.query(query, values);
    const insertedId = rows[0].id;
    res.status(200).json({ message: 'Data saved successfully', id: insertedId });
  } catch (error) {
    console.error('Error saving ticTacToe to PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to save ticTacToe' });
  }
});

router.get('/ticTacToe', async (req, res) => {
  try {
    const { rows } = await connection.query('SELECT * FROM ticTacToe');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching ticTacToe from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch ticTacToe' });
  }
});

router.get('/ticTacToe/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await connection.query('SELECT * FROM ticTacToe WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching ticTacToe from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch ticTacToe' });
  }
});

module.exports = router;
