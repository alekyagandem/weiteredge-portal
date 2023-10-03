const User = require("../models/user.model");

exports.userSignUp = async (req, res) => {
  try {
    const {
      user_id,
      role: { role_type, role_name },
      name,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = {
      user_id,
      role: { role_type, role_name },
      name,
      email,
      password,
    };

    await User.create(newUser);
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

exports.userLogin = async (req, res) => {

  const{_id, password} = req.body
  try {
    const user = await User.findOne({
      $or: [{
        "email": _id
      }, {
        "user_id": _id
      }],
      password: password
    });
    console.log(user)
    if (user) {
      res.status(200).json({ message: "Logged In Successfully", data: user });
    } else {
      res.status(500).json({ error: 'user not found', data: user });
    }
  } catch (error) {
    console.log(error, "error");
  }
};
exports.userDetails = async (req, res) => {
  try {
    const userId = req.params.username; // Assuming the user ID is passed as a parameter
    console.log(userId);
    const user = await User.findOne({ username: userId });
    console.log(user);

    if (user) {
      return res.json({ status: "ok", user: user });
    } else {
      return res.json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.log(error, "error");
    return res.json({ status: "error", message: "An error occurred" });
  }
};

exports.changePassword = async (req, res) => {
  const username = req.params.username;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    try {
      if (oldPassword != user.password) {
        return res.json({ status: "error", message: "Incorrect old password" });
      }

      user.password = newPassword;
      await user.save();

      return res.json({
        status: "ok",
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error(error);
      return res.json({ status: "error", message: "An error occurred" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", message: "An error occurred" });
  }
};
