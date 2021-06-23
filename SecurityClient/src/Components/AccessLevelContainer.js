import React, { useState } from "react";
import "./AccessLevelContainer.css";
import PasscodeMessage from "./PasscodeMessage";
export default function AccessLevelContainer({
  data,
  setData,
  passcodeMessage,
  setPasscodeMessage,
  seconds,
  setSeconds,
}) {
  const handleAccessLevel = (e) => {
    fetch(`${process.env.REACT_APP_SERVER}/accessLevel`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessLevel: e.target.dataset.accessLevel }),
    })
      .then((response) => response.json())
      .then((JSONresponse) => {
        setData(JSONresponse);
      });
  };

  return (
    <div
      className="
  gridArea
  AccessLevelContainer"
    >
      <div className="Console">
        <div className="ConsoleType">
          {">"} SELECT LEVEL OF ACCESS AND INTERACT WITH MAP TO TEST SECURITY
          SYSTEM...
        </div>
      </div>
      <div className="AccessLevelButtonContainer">
        <div className="AccessLevelButtons">
          <button
            onClick={(e) => handleAccessLevel(e)}
            data-access-level="FullAccess"
            className="AccessButton FullAccessButton"
          >
            <div className="AccessButtonSubText">Access Level</div>
            <div className="AccessButtonText">Full Access</div>
          </button>
          <button
            onClick={(e) => handleAccessLevel(e)}
            data-access-level="Restricted"
            className="AccessButton RestrictedAccessButton"
          >
            <div className="AccessButtonSubText">Access Level</div>
            <div className="AccessButtonText">Restricted</div>
          </button>
          <button
            onClick={(e) => handleAccessLevel(e)}
            className="AccessButton NoAccessButton"
            data-access-level="NoAccess"
          >
            <div className="AccessButtonSubText">Access Level</div>
            <div className="AccessButtonText">No Access</div>
          </button>
        </div>
        <div>
          <PasscodeMessage
            data={data}
            passcodeMessage={passcodeMessage}
            setPasscodeMessage={setPasscodeMessage}
            seconds={seconds}
            setSeconds={setSeconds}
          ></PasscodeMessage>
        </div>
      </div>
    </div>
  );
}
