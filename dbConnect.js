const mongoose = require('mongoose');
const { requestSchema, clubsSchema } = require('./model');

const MONGO_URI = process.env.MONGO_URI;

// async function init() {}

// const inti = async () => {
//   try {
//     const conn = await mongoose.connect(MONGO_URI, {
//       replicaSet: 'rs',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const User = mongoose.model(
//       'User',
//       new mongoose.Schema({
//         accountId: String,
//         name: String,
//         balance: Number,
//       })
//     );
//     User.createCollection();

//     await User.create([
//       { accountId: 'ACC001', name: 'John', balance: 50.0 },
//       { accountId: 'ACC002', name: 'Jane', balance: 50.0 },
//     ]);

//     console.log(`Database connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.log(`Error occured: ${err.message}`);
//   }
// };

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // const opts = { replset: { strategy: 'ping', rs_name: 'testSet' } };
    // const conn = mongoose.createConnection(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    // conn.model('Requests', requestSchema);
    // conn.model('Clubs', clubsSchema);

    // console.log(conn);

    console.log(`Database connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error occured: ${err.message}`);
  }
};

module.exports = { connectDb };
