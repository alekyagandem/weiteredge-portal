const User = require("../models/user.model");

exports.addUser = async (req, res) => {
  try {
    const {
      _id,
      name,
      age,
      DOB,
      address,
      standard,
      section,
      height,
      weight,
      BMI,
      enrollment_number,
      admission_number,
      userType: { userType_id, userType_name },
      gender,
      subject_area,
      email,
      password
    } = req.body;

    console.log(userType_id,userType_name)
    const existingUser = await User.findOne({enrollment_number});

    if (existingUser) {
      throw new Error("User already exists");
    } 
      const newUser = {
        username: enrollment_number,
        _id,
        name,
        email,
        password,
        age,
        DOB,
        address,
        standard,
        section,
        height,
        weight,
        BMI,
        admission_number,
        userType: { userType_id, userType_name },
        gender,
        subject_area
      };

    await User.create(newUser);

    res.status(201).json({ message: 'User added successfully', user: newUser });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};
