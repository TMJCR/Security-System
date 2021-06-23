const express = require("express");
const router = express.Router();
const SecuritySystem = require("../modules/securitySystem");

// Boot-up Security System
const securitySystem = new SecuritySystem();
securitySystem.bootUpSecuritySystem();
// const Keypad = require("../public/javascripts/keypad.js");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
const Equipment = require("../models/equipment");

const openDoor = async (triggeredDoor) => {
  const door = securitySystem.status.doorSensors.find(
    (door) => door.status.name === triggeredDoor.name
  );

  if (triggeredDoor.restriction) {
    await securitySystem.processSensorDetection(triggeredDoor);
    return true;
  } else {
    const logMessage = `was ${
      door.status.position === "Closed" ? "Opened" : "Closed"
    }`;
    const color = door.status.position === "Closed" ? "green" : "grey";
    await door.updateSensorStatus(
      triggeredDoor.name,
      door.currentState,
      logMessage,
      "Informational",
      color
    );
    return true;
  }
};

router.get("/", (req, res, next) => {
  res.send(JSON.stringify(securitySystem.reportStatus()));
});

router.get("/create", (req, res, next) => {
  res.render("create");
});
// POST method route
router.post("/create", async (req, res) => {
  try {
    const { type, name, range, sensitivity, connectedCamera, zone } = req.body;
    let equipmentAttributes = { type, name, zone };
    switch (type) {
      case "Sensor":
        equipmentAttributes = {
          ...equipmentAttributes,
          configuration: { range, sensitivity },
          connectedCamera,
        };
        break;
      case "Camera":
        break;
      case "DoorSensor":
        break;
      case "Alarm":
        break;
      case "Keypad":
        break;
    }
    const newEquipment = await new Equipment(equipmentAttributes);
    await newEquipment.save();
    await securitySystem.rebootSystem();
    res.send("Success");
  } catch (error) {
    console.log(error);
  }
});

router.put("/triggerSensor", async (req, res) => {
  await securitySystem.processSensorDetection(req.body);
  const status = await securitySystem.reportStatus();
  res.send(status);
});

router.put("/proximityWarning", async (req, res) => {
  const log = `WARNING: MOTION DETECTED NEAR SENSOR${
    req.body.name.split("Sensor")[1]
  }`;
  await securitySystem.logActivity({
    activity: log,
    type: "Warning",
  });
  const status = await securitySystem.reportStatus();
  res.send(status);
});

router.put("/openDoor", async (req, res) => {
  await openDoor(req.body);
  const status = await securitySystem.reportStatus();
  res.send(status);
});

router.put("/accessLevel", async (req, res) => {
  await securitySystem.logActivity({
    activity: `Processing Access Level update request...`,
    type: "Informational",
  });
  await securitySystem.changeAccessLevel(req.body.accessLevel);
  const status = await securitySystem.reportStatus();
  res.send(status);
});

router.get("/log", async (req, res) => {
  const log = await securitySystem.fetchActivityLog();
  res.send(log);
});

router.get("/cameraMessage", async (req, res) => {
  const message = await securitySystem.reportStatus().cameraMessage;
  res.send({ message });
});

router.put("/keypad", async (req, res) => {
  const correctPassword =
    await securitySystem.status.keypads[0].checkKeypadEntry(
      req.body.passcode.currentPasscode,
      securitySystem.passcode
    );

  if (correctPassword) {
    const response = await securitySystem.rebootSystem();
    res.send(response);
  } else {
    res.send({ error: "Incorrect Code Entered" });
  }

  // const response = await securitySystem.reportStatus();
});

module.exports = router;
