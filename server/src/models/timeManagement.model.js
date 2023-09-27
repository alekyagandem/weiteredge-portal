const mongoose = require("mongoose");

// generates unique id for breaks
var generateObjectId = function () {
  var ObjectId = mongoose.Types.ObjectId;
  return new ObjectId();
};

//creating schema for checkIn time

const checkIn = new mongoose.Schema(
  {
    checkIn_time: { type: Date, default: null },
    checkOut_time: { type: Date, default: null },
    breaks: [
      {
        break_start: { type: Date, default: null },
        break_end: { type: Date, default: null },
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
    },
  },
  { collection: "checkIn-data" }
);

// exporting the model
const model = mongoose.model("CheckInData", checkIn);

module.exports = model;
