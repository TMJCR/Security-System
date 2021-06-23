import React, { useEffect } from "react";
import Timer from "./Timer";
import "./PasscodeMessage.css";
export default function PasscodeMessage({
  data,
  passcodeMessage,
  setPasscodeMessage,
  seconds,
  setSeconds,
}) {
  useEffect(() => {
    setPasscodeMessage(data && data.testingMode.message);
  }, [data]);
  return (
    <div className="PasscodeMessageContainer">
      {data && data.alert && (
        <div>
          <div className="PasscodeMessageTitle">Testing Mode </div>
          <div className="PasscodeMessageText">
            Enter keypad code to reset alarm
          </div>
          <div className="PasscodeMessagePasscode">{passcodeMessage}</div>

          <Timer
            seconds={seconds}
            setSeconds={setSeconds}
            setPasscodeMessage={setPasscodeMessage}
          ></Timer>
        </div>
      )}
    </div>
  );
}
