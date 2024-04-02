const db = require('./db');

const sudokuController = {};

sudokuController.createData = (timeTaken, incorrectCells, emptyCells, grid, callback) => {
  const query = 'INSERT INTO sudoku (time, incorrect_cells, empty_cells, date, data) VALUES (?, ?, ?, ?, ?)';
  const values = [timeTaken, incorrectCells, emptyCells, new Date(), JSON.stringify(grid)];
  db.query(query, values, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results.insertId);
  });
};

sudokuController.getAllData = (callback) => {
  db.query('SELECT * FROM sudoku', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};


module.exports = sudokuController;
