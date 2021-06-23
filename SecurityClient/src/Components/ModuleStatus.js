import React from "react";
import "./ModuleStatus.css";
import Module from "./Module";

export default function ModuleStatus({ data, type, lastSync }) {
  return (
    <div className="ModuleContainer">
      <div className="ModuleTypeUpperText">Primary Module Type</div>
      <div className="ModuleType">
        {type === "DoorSensors" ? "Doors" : type}
      </div>
      <div className="ModuleTypeLowerText">LAST SYNCED: {lastSync}</div>
      {data.map((item) => {
        return (
          <Module
            key={item.status.name}
            name={item.status.name}
            status={item.status.color}
            currentStatus={
              item.status.type === "DoorSensor"
                ? item.status.position
                : item.status.currentStatus
            }
          ></Module>
        );
      })}
    </div>
  );
}
