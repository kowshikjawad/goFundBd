const express = require('express');
const { Request, Response } = require('express');
import db from './config/database';

const app = express();
app.use(express.json());


db.on('error', (err) => {
  console.error('Error connecting to database:', err);
  // Handle the error appropriately (e.g., log, retry, exit)
}); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
