const { default: mongoose, model } = require("mongoose");

const OTPSchema = new mongoose.Schema({
    code: {type: Number , required: false , default: undefined},
    expiresIn: {type: Number , required: false , default: 0}
})

const UserSchema = new mongoose.Schema({
    first_name: {type: String , required: false},
    last_name: {type: String , required: false},
    username: {type: String , required: false},
    mobile: {type: String , required: true , unique: true},
    otp: {type: OTPSchema}
} , {
    timestamps: true
});

const UserModel = model("user" , UserSchema);
module.exports = UserModel;