const DeviceController = require("../controllers/deviceController");
const FeedbackController = require("../controllers/feedbackController");

module.exports = (app) => {

    // Devices
    app.post("/devices", DeviceController.post);
    app.get("/devices", DeviceController.get);
    app.delete("/devices/:deviceId", DeviceController.delete);
    app.put("/devices/:deviceId", DeviceController.put);

    // feedback
    app.post("/devices/:deviceId/feedbacks", FeedbackController.post);

}