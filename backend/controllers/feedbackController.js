const DeviceModel = require("../models/devices");
const mongoose = require("mongoose")
const APIError = require("../utils/error/apiError");


module.exports = {
    async post(req, res, next) {
        try {
            const deviceId = req.params.deviceId;
            const { status, description } = req.body;
            let selectedDevice = await DeviceModel.findById(deviceId);
            if (!selectedDevice) {
                throw APIError("device is not found", 404)
            }
            selectedDevice = addNewFeedback(selectedDevice, status, description);
            const updatedDevice = await selectedDevice.save();
            const response = generateFeedbackResponse(updatedDevice.feedbacks[updatedDevice.feedbacks.length - 1]);
            res.status(201).json(response);
        }
        catch (err) {
            if (err instanceof APIError) {
                next(err);
            }
            next(new APIError(err.message, 400));
        }
    }
}

function addNewFeedback(device, status, description) {
    if (!device.feedbacks) {
        device.feedbacks = [];
    }
    device.feedbacks.push({
        status,
        description,
        feedbackTimeStamp: Date.now()
    })
    return device;
}

function generateFeedbackResponse(feedback) {
    return feedback;
}