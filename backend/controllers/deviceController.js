const DeviceModel = require("../models/devices");
const mongoose = require("mongoose")
const APIError = require("../utils/error/apiError");
const CommonHelper = require("../utils/helper/commonHelper");


module.exports = {
    async post(req, res, next) {
        try {
            let { device: deviceName, os, manufacturer } = req.body;
            const newDevice = createNewDevice(deviceName, os, manufacturer);
            const savedDevice = await newDevice.save();
            const responseBody = generateDevicesResponse(savedDevice);
            res.status(201).json(responseBody);
        }
        catch (err) {
            next(new APIError(err.message, 400));
        }
    },
    async get(req, res, next) {
        try {
            const deviceList = await DeviceModel.find();
            const response = []
            for (let device of deviceList) {
                response.push(generateDevicesResponse(device))
            }
            res.status(200).send(response);
        }
        catch (err) {
            next(new APIError(err.message, 400));
        }
    },
    // DELETE /devices/:deviceId
    async delete(req, res, next) {
        try {
            const deviceId = req.params.deviceId;
            const selectedDevice = await DeviceModel.findByIdAndDelete(deviceId);
            if (selectedDevice) {
                res.status(200).send();
            }
            else {
                throw new APIError("device Not found", 404)
            }
        }
        catch (err) {
            if (err instanceof APIError) {
                next(err);
            }
            next(new APIError(err.message, 400));
        }
    },
    // PUT /devices/:deviceId
    async put(req, res, next) {
        try {
            let deviceId = req.params.deviceId;
            let { action } = req.body;
            let responseBody = {};
            if (action === "check-out") {
                // validate the required parameters name
                let { name } = req.body;
                if (name) {
                    // action 
                    responseBody = await checkOutAsync(name, deviceId)
                }
                else {
                    throw new APIError("name is required in body when 'check-out' action is selected", 400);
                }
            }
            else if (action === "check-in") {
                responseBody = await checkInAsync(deviceId)
            } else {
                // should be checked already. 
                throw new APIError("action field can only be either 'check-in' or 'check-out'", 400);
            }
            res.status(200).json(responseBody);
        }
        catch (err) {
            if (err instanceof APIError) {
                next(err);
            }
            next(new APIError(err.message, 400));
        }

    }

}


function createNewDevice(deviceName, os, manufacturer) {
    return new DeviceModel({
        _id: new mongoose.Types.ObjectId(),
        device: deviceName,
        os: os,
        manufacturer: manufacturer,
        lastCheckedOutDate: null,
        lastCheckedOutBy: null,
        isCheckedOut: false
    })
}

function generateDevicesResponse(device) {
    return {
        id: device._id,
        device: device.device,
        os: device.os,
        manufacturer: device.manufacturer,
        lastCheckedOutDate: device.lastCheckedOutDate !== null ? device.lastCheckedOutDate : "null",
        lastCheckedOutBy: device.lastCheckedOutBy !== null ? device.lastCheckedOutBy : "null",
        isCheckedOut: device.isCheckedOut,
        feedbacks: device.feedbacks
    }
}


async function checkOutAsync(name, deviceId) {
    try {
        if (!CommonHelper.isTimeBetween9to17()) {
            throw new APIError("device can only be checkout during 9:00am to 17:00pm", 400);
        }
        let selectedDevice = await DeviceModel.findById(deviceId);
        if (!selectedDevice) {
            throw new APIError("device is not found", 404);
        }
        if (selectedDevice.isCheckedOut === true) {
            throw new APIError("device is already checked out", 400);
        }
        selectedDevice.lastCheckedOutBy = name;
        selectedDevice.lastCheckedOutDate = Date.now();
        selectedDevice.isCheckedOut = true;
        const updatedDevice = await selectedDevice.save();
        const responseBody = generateDevicesResponse(updatedDevice);
        return responseBody;
    }
    catch (err) {
        throw (err)
    }
}


async function checkInAsync(deviceId) {
    try {
        let selectedDevice = await DeviceModel.findById(deviceId);
        if (!selectedDevice) {
            throw new APIError("device is not found", 404);
        }
        if (selectedDevice.isCheckedOut === false) {
            throw new APIError("device is still in the garage", 400);
        }
        selectedDevice.isCheckedOut = false;
        const updatedDevice = await selectedDevice.save();
        const responseBody = generateDevicesResponse(updatedDevice);
        return responseBody;
    }
    catch (err) {
        throw (err)
    }
}