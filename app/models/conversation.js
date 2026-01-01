const { default: mongoose, model } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
    sender: {type: ObjectId , ref: "user" , required: false},
    message: {type: String},
    dateTime: {type: Number}
})

const roomSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages: {type: [messageSchema] , }
})

const ConversationSchema = new mongoose.Schema({
    title: {type: String , required: true},
    endpoint: {type: String , required: true},
    rooms: {type: [roomSchema] , default: []}
} , {
    timestamps: true
});

const ConversationModel = model("conversation" , ConversationSchema);
module.exports = ConversationModel;