import React from "react";
import "./MapContainer.css";
// import { ReactComponent as Map3 } from "../Map.svg";
import Map from "./Map";
export default function MapContainer({
  data,
  setData,
  setPasscodeMessage,
  seconds,
  setSeconds,
  reboot,
  setReboot,
}) {
  return (
    <div
      className="
  gridArea
  MapContainer"
    >
      <Map
        data={data}
        setData={setData}
        setPasscodeMessage={setPasscodeMessage}
        seconds={seconds}
        setSeconds={setSeconds}
        reboot={reboot}
        setReboot={setReboot}
      ></Map>
    </div>
  );
}
