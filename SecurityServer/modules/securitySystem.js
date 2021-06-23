const EquipmentModel = require("../models/equipment");

const { Sensor, Camera, DoorSensor, Keypad, Alarm } = require("./equipment");
const ActivityModel = require("../models/activityLog");
// Fetch all the previous activity
// Create a new log for each interaction
// Push it onto the log

module.exports = class SecuritySystem {
  constructor() {
    this.status = this.setDefaultStatus();
    this.setRestrictedZones();
    this.passcode = this.generatePasscode();
    this.interval = null;
    this.timer = null;
  }

  generatePasscode = () => {
    clearInterval(this.timer);
    this.status.testingMode.timeElapsed = 15;
    const newPasscode = Array.from([0, 0, 0, 0], (num) =>
      Math.floor(Math.random() * (8 - 1) + 1).toString()
    );
    this.passcode = newPasscode;

    if (this.status.alert) {
      this.startCountdown();
    }

    return newPasscode;
  };

  startCountdown = () => {
    this.timer = setInterval(() => {
      if (this.status.testingMode.timeElapsed > 0) {
        this.status.testingMode.timeElapsed -= 1;
      } else {
        this.status.testingMode.timeElapsed = 15;
      }
    }, 1000);
  };

  beginAutogeneratePasscode() {
    this.interval = setInterval(this.generatePasscode, 15000);
    this.generatePasscode();
  }

  setDefaultStatus() {
    return {
      zones: {
        zone1: { status: "Normal", camera: "Camera1", alarm: "Alarm1" },
        zone2: { status: "Normal", camera: "Camera2", alarm: "Alarm2" },
        zone3: { status: "Normal", camera: "Camera3", alarm: "Alarm3" },
        zone4: { status: "Normal", camera: "Camera4", alarm: "Alarm4" },
      },
      accessLevel: "NoAccess",
      alert: false,
      testingMode: { message: "", timeElapsed: 15 },
      cameraMessage: "Camera Ready",
      lastSync: new Date()
        .toLocaleString("en-GB", { timeZone: "Europe/London" })
        .slice(-9),
    };
  }

  setRestrictedZones() {
    if (this.status.accessLevel === "Restricted") {
      this.restrictedZoneMessage = `Current Access Level: Zone 1 and Zone 3 are restricted`;
      this.status.restrictedZones = [1, 3];
      this.status.zones.zone1.status = "Normal";
      this.status.zones.zone2.status = "Unrestricted";
      this.status.zones.zone3.status = "Normal";
      this.status.zones.zone4.status = "Unrestricted";
    } else if (this.status.accessLevel === "FullAccess") {
      this.restrictedZoneMessage = `Current Access Level: Access is granted to all zones`;
      this.status.restrictedZones = [];
      this.status.zones.zone1.status = "Unrestricted";
      this.status.zones.zone2.status = "Unrestricted";
      this.status.zones.zone3.status = "Unrestricted";
      this.status.zones.zone4.status = "Unrestricted";
    } else {
      this.restrictedZoneMessage = `Current Access Level: All zones are restircted`;
      this.status.restrictedZones = [1, 2, 3, 4];
      this.status.zones.zone1.status = "Normal";
      this.status.zones.zone2.status = "Normal";
      this.status.zones.zone3.status = "Normal";
      this.status.zones.zone4.status = "Normal";
    }

    return true;
  }

  async changeAccessLevel(accessLevel) {
    this.status.accessLevel = accessLevel;
    this.setRestrictedZones();
    await this.logActivity({
      activity: `Access Level to be updated to ${accessLevel}`,
      type: "Informational",
    });
    await this.logActivity({
      activity: this.restrictedZoneMessage,
      type: "Success",
    });
  }

  async bootUpSecuritySystem() {
    await this.logActivity({
      activity: "Preparing to reboot system...",
      type: "Informational",
    });
    await this.fetchAllSystemEquipment(this.status.accessLevel);
    await this.fetchActivityLog();
    await this.logActivity({
      activity: "System reboot successful",
      type: "Success",
    });
    return this.reportStatus();
  }

  async rebootSystem() {
    await this.logActivity({
      activity: "Beginning full system reset...",
      type: "Informational",
    });
    clearInterval(this.interval);
    this.status = await this.setDefaultStatus();
    this.setRestrictedZones();
    await this.logActivity({
      activity: "System successfully reset",
      type: "Success",
    });
    await this.logActivity({
      activity: "Assigning Restricted Zones...",
      type: "Informational",
    });
    return this.bootUpSecuritySystem();
  }

  async fetchActivityLog() {
    const log = await ActivityModel.find();
    this.status.activityLog = log;
    return this.status.activityLog;
  }

  async fetchAllSystemEquipment(accessLevel) {
    await this.logActivity({
      activity: "Registering equipment",
      type: "Informational",
    });
    const equipmentList = await EquipmentModel.find();
    const sensorList = equipmentList.filter((item) => item.type === "Sensor");
    const cameraList = equipmentList.filter((item) => item.type === "Camera");
    const doorSensorList = equipmentList.filter(
      (item) => item.type === "DoorSensor"
    );
    const keypadList = equipmentList.filter((item) => item.type === "Keypad");
    const alarmList = equipmentList.filter((item) => item.type === "Alarm");

    // Register sensors
    const sensors = sensorList.map((sensor) => {
      return new Sensor(
        sensor.name,
        sensor.type,
        sensor._id,
        sensor.zone,
        sensor.currentStatus,
        sensor.configuration.range,
        sensor.configuration.sensitivity,
        sensor.connectedCamera
      );
    });

    this.status.sensors = sensors;

    // Register cameras
    this.status.cameras = cameraList.map((camera) => {
      return new Camera(
        camera.name,
        camera.type,
        camera._id,
        camera.zone,
        "Ready"
      );
    });

    // // Register door sensors
    this.status.doorSensors = doorSensorList.map((doorSensor) => {
      return new DoorSensor(
        doorSensor.name,
        doorSensor.type,
        doorSensor._id,
        doorSensor.zone,
        "Ready",
        "Closed",
        "grey"
      );
    });

    // // Register keypads
    this.status.keypads = keypadList.map((keypad) => {
      return new Keypad(keypad.name, keypad.type, keypad._id, keypad.zone || 1);
    });

    // // Register alarms
    this.status.alarms = alarmList.map((alarm) => {
      return new Alarm(alarm.name, alarm.type, alarm._id, alarm.zone || 1);
    });

    await this.logActivity({
      activity: "Equipment registration process complete",
      type: "Success",
    });
  }

  alertZone(zone) {
    zone.status = "Alert";
  }

  activateZoneCamera(zone) {
    const Camera = this.status.cameras.find(
      (camera) => camera.status.name === zone.camera
    );
    this.status.cameraMessage = `${zone.camera} recording...`;
    Camera.updateCameraStatus();
    const timeOfTrigger = new Date();
    Camera.storeFootage(timeOfTrigger);
  }

  async activateZoneAlarm(zone) {
    const Alarm = this.status.alarms.find(
      (alarm) => alarm.status.name === zone.alarm
    );
    await Alarm.updateAlarmStatus();
    Alarm.alert();
  }

  async triggerAlert(zone) {
    if (!this.status.alert) {
      clearInterval(this.interval);
      this.status.alert = true;
      this.beginAutogeneratePasscode();
    }
    await this.alertZone(zone);
    await this.activateZoneCamera(zone);
    await this.activateZoneAlarm(zone);
  }

  processSensorDetection = async (triggeredSensor) => {
    const correctSensorList =
      triggeredSensor.type === "DoorSensor" ? "doorSensors" : "sensors";

    const logMessage =
      correctSensorList === "doorSensors"
        ? "was breached"
        : "detected movement in restricted zone";

    try {
      const extractedSensor = await this.status[correctSensorList].find(
        (sensor) => sensor.status.name === triggeredSensor.name
      );

      const sensorZone =
        this.status.zones[`zone${extractedSensor.status.zone}`];
      const raiseAlert = await extractedSensor.updateSensorStatus(
        triggeredSensor.name,
        triggeredSensor.currentState,
        logMessage,
        "Alert"
      );

      if (raiseAlert) {
        this.triggerAlert(sensorZone);
      }
    } catch (error) {
      console.log(error);
    }
  };

  reportStatus() {
    if (this.status.alert) {
      this.status.testingMode.message = this.passcode;
    }
    return this.status;
  }

  async logActivity(log) {
    const { activity, type } = log;
    const date = new Date();
    const newLog = new ActivityModel({ date, log: activity, type });

    await newLog.save();
  }
};
