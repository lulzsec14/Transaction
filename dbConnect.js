const mongoose = require('mongoose');
const { requestSchema, clubsSchema } = require('./model');

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error occured: ${err.message}`);
  }
};

module.exports = { connectDb };
