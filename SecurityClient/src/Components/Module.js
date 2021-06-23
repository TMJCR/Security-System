import React from "react";
import "./Module.css";

export default function ModuleStatus({ title, name, status, currentStatus }) {
  return (
    <li className="ModuleStatusList">
      <div className="ModuleStatusName">{name}.STATUS</div>
      <div className={`ModuleStatusText`}>
        {currentStatus}
        <span className={`ModuleStatusStatus ${status}`}>&nbsp;</span>
      </div>
    </li>
  );
}
