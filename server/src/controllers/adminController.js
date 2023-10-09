const User = require("../models/user.model");
const CheckIn = require('../models/timeManagement.model')

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

exports.getAllDetails = async(req,res) => {

  try {
    const uniqueIds = await User.find()
    //console.log(uniqueIds)
    res.status(200).json({ message: 'got unique ids', data: uniqueIds})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'an error occured', data: error})
  }
}

exports.getEmployeeDetails = async(req, res) => {
  try {

    const user_id = req.params.user_id;

    const isUser = await User.findOne({ user_id });


    if (isUser) {
      const user_objectId = isUser._id;

      const employeeDetails = await CheckIn.aggregate([
        {
          $match: { user_id: user_objectId },
        },
      ]);

     // console.log(employeeDetails)
      res.status(200).json({ message: 'got unique ids', data: employeeDetails})
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'an error occured', data: error})
  }
}

exports.getbyuserId=async(req,res)=>{
  try {

    const user_id = req.params.user_id;

    const isUser = await User.findOne({ user_id });
      res.status(200).json({ message: 'identified user', data: isUser})
    }
    
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'an error occured', data: error})
  }
}
