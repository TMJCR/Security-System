import React from "react";
import "./CameraContainer.css";
import camera from "../Camera.png";
export default function CameraContainer({ cameraMessage }) {
  return (
    <div
      className="
  gridArea
  CameraContainer"
    >
      {/* <img className="CameraImage" src={camera} /> */}
      <div className="CameraText">{cameraMessage.message}...</div>
    </div>
  );
}
