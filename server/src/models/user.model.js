const mongoose = require('mongoose')

// generates unique id for breaks

var generateObjectId = function() {
    var ObjectId = mongoose.Types.ObjectId;
    return new ObjectId
}

//creating schema for user details

const User = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        role: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: generateObjectId
            },
            role_name: {
                type: String,
                required: true,
                allowNull: false
            }
        },
        name: { type: String, required: true },
        email: { type: String, required: true},
        password: { type: String, required: true },
    },
    { collection: 'user-data' }
);

// exporting the model

const model = mongoose.model("UserData", User)

module.exports = model