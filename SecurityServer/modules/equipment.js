const ActivityModel = require("../models/activityLog");
const SecuritySystem = require("./securitySystem");

class Equipment {
  constructor(name, type, id, zone, currentStatus = "Ready") {
    this.status = {
      name,
      type,
      id,
      zone,
      currentStatus,
    };
  }
  async logActivity(log) {
    const { activity, type } = log;
    const date = new Date();
    const newLog = new ActivityModel({ date, log: activity, type });
    await newLog.save();
    return true;
  }
  reportStatus() {
    return this.status;
  }
}

class Sensor extends Equipment {
  constructor(
    name,
    type,
    id,
    zone,
    currentStatus,
    range = 2,
    sensitivity = 50,
    connectedCamera = null
  ) {
    super(name, type, id, zone, currentStatus);
    const configuration = { configuration: { range, sensitivity } };
    this.status = {
      ...this.status,
      color: "grey",
      ...configuration,
      connectedCamera,
    };
  }
  async updateSensorStatus(name, newState, message, type) {
    this.status.currentStatus = newState;
    await this.logActivity({
      activity: `${name} ${message}`,
      type,
    });
    // Now activate camera and alarm
    if (this.status.currentStatus === "Alert") {
      this.status.color = "red";
      return true;
    } else {
      this.status.color = "green";
      return false;
    }
  }
}

class DoorSensor extends Equipment {
  constructor(name, type, id, zone, currentStatus, position, color) {
    super(name, type, id, zone, currentStatus);
    this.status = { ...this.status, position, color };
  }
  async updateSensorStatus(name, newState, message, type, color = "red") {
    const newPosition = this.status.position === "Closed" ? "Open" : "Closed";
    this.status.position = newPosition;
    this.status.color = color;
    await this.logActivity({
      activity: `${name} ${message}`,
      type,
    });
    if (this.status.position === "Open") {
      return true;
    }
    return false;
  }
}

class Camera extends Equipment {
  constructor(name, type, id, zone, currentStatus) {
    super(name, type, id, zone, currentStatus);
    this.status.lastRecording = null;
    this.status.color = "green";
  }
  async storeFootage(timeOfTrigger) {
    const durationOfStoredFootageInSeconds = 60;
    const startOfStoredFootage = timeOfTrigger.slice(-8);

    await this.logActivity({
      activity: `Footage from ${this.status.name} Stored: ${startOfStoredFootage}`,
      type: "Success",
    });
  }
  updateCameraStatus = () => {
    this.status.currentStatus = "Recording";
  };
}

class Keypad extends Equipment {
  constructor(name, type, id, zone, currentStatus) {
    super(name, type, id, zone, currentStatus);
    this.status.color = "green";
  }
  async checkKeypadEntry(enteredCode, securitySystemCode) {
    if (enteredCode.join() === securitySystemCode.join()) {
      this.status.color = "green";
      await this.logActivity({
        activity: `Code Entered Correctly, preparing to reset alarm system`,
        type: "Success",
      });
    } else {
      this.status.color = "red";
      await this.logActivity({
        activity: `ALERT: Incorrect Code Entered`,
        type: "Alert",
      });
    }
    return enteredCode.join() === securitySystemCode.join();
  }
}

class Alarm extends Equipment {
  constructor(name, type, id, zone, currentStatus) {
    super(name, type, id, zone, currentStatus);
    this.status.color = "green";
  }
  async alert() {
    await this.logActivity({
      activity: `ALERT: ${this.status.name} has been triggered.`,
      type: "Alert",
    });
  }
  updateAlarmStatus = () => {
    this.status.color = "red";
    this.status.currentStatus = "Alert";
  };
  async resetAlarm() {
    this.status.color = "green";
    this.status.currentStatus = "Ready";
    await this.logActivity({
      activity: `Resetting ${this.status.name}`,
      type: "Warning",
    });

    await this.logActivity({
      activity: `Alarm reset process complete for ${this.status.name}`,
      type: "Success",
    });
  }
}
module.exports = {
  Sensor,
  Camera,
  DoorSensor,
  Keypad,
  Alarm,
};
