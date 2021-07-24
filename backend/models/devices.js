const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    _id: Schema.ObjectId,
    status: {
        type: String,
        enum: ["good", "bad"]
    },
    description: String,
    feedbackTimeStamp: Date
})

const deviceSchema = new Schema({
    _id: Schema.ObjectId,
    device: String,
    os: String,
    manufacturer: String,
    lastCheckedOutDate: Date,
    lastCheckedOutBy: String,
    isCheckedOut: Boolean,
    feedbacks: [FeedbackSchema]
})

const Device = mongoose.model('device', deviceSchema);

module.exports = Device;