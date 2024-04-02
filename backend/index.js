const express = require('express');
const sudokuRoutes = require('./sudokuRoutes');


const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount sudoku routes
app.use('/sudoku', sudokuRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});