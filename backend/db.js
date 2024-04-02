const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12',
    database: 'puzzle_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  
  // Create the sudoku table if it doesn't exist
  connection.query(`
    CREATE TABLE IF NOT EXISTS sudoku (
      id INT AUTO_INCREMENT PRIMARY KEY,
      time INT,
      incorrect_cells INT,
      empty_cells INT,
      date DATETIME,
      data JSON
    )`, (err) => {
    if (err) {
      console.error('Error creating sudoku table:', err);
      return;
    }
    console.log('Data table created or already exists');
  });
});

module.exports = connection;
