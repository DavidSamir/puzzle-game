const express = require('express');
const sudokuRoutes = require('./sudokuRoutes');
const twenty48Routes = require('./twenty48Routes');
const cors = require('cors');



const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Mount sudoku routes
app.use('/api/v1', sudokuRoutes);
app.use('/api/v1', twenty48Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});