const ActivityModel = require("../models/activityLog");

class ActivityLog {
  constructor() {
    this.log = this.fetchActivityLog();
  }
  async fetchActivityLog() {
    const activityLog = await ActivityModel.find();
    this.log = activityLog;
    return this.log;
  }
  async logActivity(activity) {
    const newLog = await new ActivityModel(activity);
    newLog.save();
  }
  async report() {
    await this.fetchActivityLog();
    return this.log;
  }
}

module.exports = ActivityLog;
