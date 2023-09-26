const CheckIn = require("../models/timeManagement.model");
const User = require("../models/user.model");

exports.checkIn = async (req, res) => {
  try {
    const { user_id } = req.body;

    // checking id given user is there in user collection
    const isUser = await User.findOne({ user_id });

    if (isUser) {
      console.log(isUser._id);
      const user_objectId = isUser._id;

      //attached user object id to the user id
      const isCheckedIn = {
        user_id: user_objectId,
      };

      console.log(isCheckedIn);

      // updated with user_id
      await CheckIn.create(isCheckedIn);

      // updated checkIn time to now
      const checkInUpdate = await CheckIn.find({ user_id: user_objectId });

      const new_time = new Date();

      const ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes
      const offset = ISToffSet * 60 * 1000;
      const ISTTime = new Date(new_time.getTime() + offset);
      console.log(ISTTime)

      checkInUpdate.checkIn_time = ISTTime;
      console.log(checkInUpdate.checkIn_time)
      await checkInUpdate.save();

      res.status(200).json({ message: "checked in successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to checkIn" });
  }
};

exports.breakStart = async (req, res) => {
  try {
  } catch (error) {}
};
