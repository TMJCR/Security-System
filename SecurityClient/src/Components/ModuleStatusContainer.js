import React from "react";
import "./ModuleStatusContainer.css";
import ModuleStatus from "./ModuleStatus";

export default function KeypadContainer({ data }) {
  return (
    <div className="gridArea ModuleStatusContainer">
      <div className="ModuleStatus">
        <div className="ModuleStatusTitle">SECURITY MODULES STATUS</div>
        <div className="ModuleStatusLoader">O/I.MODULE.STATUS</div>
      </div>
      {data && (
        <div>
          <ModuleStatus
            data={data.cameras}
            type="Cameras"
            lastSync={data.lastSync}
          ></ModuleStatus>
          <ModuleStatus
            data={data.sensors}
            type="Sensors"
            lastSync={data.lastSync}
          ></ModuleStatus>
          <ModuleStatus
            data={data.doorSensors}
            type="DoorSensors"
            lastSync={data.lastSync}
          ></ModuleStatus>

          <ModuleStatus
            data={data.alarms}
            type="Alarms"
            lastSync={data.lastSync}
          ></ModuleStatus>
          <ModuleStatus
            data={data.keypads}
            type="Keypads"
            lastSync={data.lastSync}
          ></ModuleStatus>
        </div>
      )}
    </div>
  );
}
