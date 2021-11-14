require('dotenv').config({ path: './config.env' });

const express = require('express');
const app = express();

const { connectDb } = require('./dbConnect');
const router = require('./routes');

const PORT = 5000;

app.use(express.json());

// app.use('/api');

connectDb();
// inti();

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
