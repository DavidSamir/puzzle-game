const express = require('express');
const connection = require('./db');

const router = express.Router();

router.post('/twenty48', async (req, res) => {
  try {
    const { time, data, difficulty, score } = req.body;

    const query = `INSERT INTO twenty48 (time, difficulty, score, date, data) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const values = [time, difficulty, score, new Date(), JSON.stringify(data)];

    const { rows } = await connection.query(query, values);
    const insertedId = rows[0].id;
    res.status(200).json({ message: 'Data saved successfully', id: insertedId });
  } catch (error) {
    console.error('Error saving twenty48 to PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to save twenty48' });
  }
});

router.get('/twenty48', async (req, res) => {
  try {
    const { rows } = await connection.query('SELECT * FROM twenty48');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching twenty48 from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch twenty48' });
  }
});

router.get('/twenty48/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await connection.query('SELECT * FROM twenty48 WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching twenty48 from PostgreSQL:', error);
    res.status(500).json({ message: 'Failed to fetch twenty48' });
  }
});


module.exports = router;
