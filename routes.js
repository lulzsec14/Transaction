const express = require('express');
const mongoose = require('mongoose');
const { Club, Request } = require('./model');
const router = express.Router();

const register = async (req, res, next) => {
  const data = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const requestCreated = await Request.create(
      [{ clubName: data.clubName, studentName: data.name }],
      {
        session: session,
      }
    );

    const requestId = requestCreated[0]._id;

    const findRequest = Request.findOne({ clubName: 'CSI' }).session(session);
    if (findRequest) {
      console.log('Request Created');
    }

    const clubAdded = await Club.findOneAndUpdate(
      { clubName: data.clubName },
      { $addToSet: { requestArray: requestId } },
      { new: true }
    ).session(session);

    // to commit the transaction
    await session.commitTransaction();
    // res
    //   .status(201)
    //   .json({ success: true, message: 'Transaction committed successfully' });

    // to test the abort transaction
    // await session.abortTransaction();
    res
      .status(201)
      .json({ success: true, message: 'Transaction aborted successfully' });
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
  session.endSession();
};

const createClub = async (req, res, next) => {
  const data = req.body;
  try {
    const clubCreated = await Club.create({ clubName: data.clubName });
    // console.log(clubCreated);
    res.status(201).json({ success: true, data: clubCreated });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err });
  }
};

router.route('/addTask').post(register);
router.route('/addClub').post(createClub);

module.exports = router;
