const mongoose = require('mongoose');

const clubsSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  requestArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
    },
  ],
});

const requestSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'Please enter the ClubName to be joined'],
  },
  studentName: {
    type: String,
  },
});

const Club = mongoose.model('Club', clubsSchema);
const Request = mongoose.model('Request', requestSchema);

module.exports = { Club, Request, clubsSchema, requestSchema };
