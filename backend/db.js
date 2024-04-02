const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'puzzle_db',
  password: '00',
  port: 5432, 
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Connected to PostgreSQL');

  // Array of queries to create tables if they do not exist
  const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS sudoku (
      id SERIAL PRIMARY KEY,
      time INT,
      incorrect_cells INT,
      empty_cells INT,
      difficulty TEXT,
      date TIMESTAMP,
      data JSONB
    )`,
    `CREATE TABLE IF NOT EXISTS twenty48 (
      id SERIAL PRIMARY KEY,
      time INT,
      difficulty TEXT,
      score INT,
      date TIMESTAMP,
      data JSONB
    )`
    // Add more create table queries if needed
  ];

  // Run each create table query
  createTableQueries.forEach((query) => {
    client.query(query, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Table created or already exists');
    });
  });

  release(); // Release the client back to the pool
});


module.exports = pool;
