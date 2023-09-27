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
      const checkInUpdate = await CheckIn.findOne({ user_id: user_objectId });

      const new_time = new Date();

      const ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes
      const offset = ISToffSet * 60 * 1000;
      const ISTTime = new Date(new_time.getTime() + offset);
      console.log(ISTTime.getDay(), "time");

      checkInUpdate.checkIn_time = ISTTime;
      console.log(checkInUpdate.checkIn_time);
      await checkInUpdate.save();

      res.status(200).json({ message: "checked in successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to checkIn" });
  }
};

exports.breakStartAndEnd = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { break_start, break_end } = req.body;

    const isUser = await User.findOne({ user_id });

    if (isUser) {
      const user_objectId = isUser._id;
      console.log(break_start);

      const getUserWithDate = await CheckIn.aggregate([
        {
          $match: { user_id: user_objectId },
        },
      ]);

      // const valuePair = Object.values(getUserWithDate);
      // console.log(valuePair, "valuePair")

      for (const item of getUserWithDate) {
        if (item.hasOwnProperty("checkIn_time")) {
          const checkIn_date = item.checkIn_time.toISOString().split("T")[0];
          const current_day = break_start.split("T")[0];
          console.log(current_day);
          if (current_day === checkIn_date) {
            try {
              
              const addBreak = await CheckIn.findById({_id: item._id})

              addBreak.breaks.push({
                break_start: break_start,
                break_end: break_end
              })

              addBreak.save()

              res
                .status(200)
                .json({
                  message: "checked in successfully",
                  data: addBreak,
                });
            } catch (error) {
              console.log(error);
            }
            
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to add break", data: error });
  }
};

// exports.breakEnd = async (req, res) => {
//   try {


//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "An error occured" });
//   }
// };

exports.checkOut = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { checkout_date } = req.body;

    const isUser = await User.findOne({ user_id });

    if (isUser) {
      const user_objectId = isUser._id;
      console.log(checkout_date);

      const getUserWithDate = await CheckIn.aggregate([
        {
          $match: { user_id: user_objectId },
        },
      ]);
      for (const item of getUserWithDate) {
        if (item.hasOwnProperty("checkOut_time")) {
          const checkIn_date = item.checkIn_time.toISOString().split("T")[0];
          const current_day = checkout_date.split("T")[0];
          console.log(current_day);
          if (current_day === checkIn_date) {
            try {
              console.log(item.breaks, typeof item.breaks);
              console.log(checkIn_date);

              await CheckIn.findOneAndUpdate(
                { checkIn_time: item.checkIn_time },
                { $set: { checkOut_time: checkout_date } }
              );
              res
                .status(200)
                .json({
                  message: "checked out successfully",
                });
            } catch (error) {
              console.log(error);
              res.status(500).json({error: "An error occured"})
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "An error occured" });
  }
};
