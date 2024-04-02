const express = require('express');
const connection = require('./db');

const router = express.Router();


router.post('/twenty48', (req, res) => {
  try {
    const { time,  data, difficulty, score } = req.body;

    const query = `INSERT INTO twenty48 (time, difficulty, score, date, data) VALUES (?, ?, ?, ?, ?)`;
    const values = [time, difficulty, score, new Date(), JSON.stringify(data)];

    // Execute query
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving twenty48 to MySQL:', error);
        res.status(500).json({ message: 'Failed to save twenty48' });
        return;
      }
      res.status(200).json({ message: 'Data saved successfully', id: results.insertId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save twenty48' });
  }
});
router.get('/twenty48', (req, res) => {
  connection.query('SELECT * FROM twenty48', (error, results) => {
    if (error) {
      console.error('Error fetching twenty48 from MySQL:', error);
      res.status(500).json({ message: 'Failed to fetch twenty48' });
      return;
    }
    res.status(200).json(results);
  });
});

router.get('/twenty48/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM twenty48 WHERE id = ?', id, (error, results) => {
    if (error) {
      console.error('Error fetching twenty48 from MySQL:', error);
      res.status(500).json({ message: 'Failed to fetch twenty48' });
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
