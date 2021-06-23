import React, { useState } from "react";
import "./KeypadContainer.css";
export default function KeypadContainer({
  data,
  setData,
  setPasscodeMessage,
  setReboot,
}) {
  const [passcode, setPasscode] = useState({
    increment: 0,
    currentPasscode: ["X", "X", "X", "X"],
  });
  const [activeDigit, setActiveDigit] = useState(null);
  const submitPasscode = async () => {
    const submittedPasscode = passcode;
    setPasscode({
      increment: 0,
      currentPasscode: ["X", "X", "X", "X"],
    });
    setActiveDigit(null);
    fetch(`${process.env.REACT_APP_SERVER}/keypad`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passcode: submittedPasscode,
      }),
    })
      .then((response) => response.json())
      .then((JSONresponse) => {
        if (JSONresponse.error) {
          setPasscodeMessage(data && data.testingMode.message);
          console.log(`JSONresponse.error`, JSONresponse.error, data);
        } else {
          setData(JSONresponse);
          setPasscodeMessage("");
          setReboot(true);
        }
      });
  };

  const handlePasscodeInput = (e) => {
    const newPasscode = passcode.currentPasscode.map((num, idx) => {
      return idx === passcode.increment ? e.target.dataset.number : num;
    });
    setActiveDigit(activeDigit === 3 ? 0 : passcode.increment + 1);
    const newIncrement = passcode.increment === 3 ? 0 : passcode.increment + 1;
    setPasscode({
      increment: newIncrement,
      currentPasscode: newPasscode,
    });
  };

  const handleAnswerChange = (e) => {
    const unfilledPasscode = (value) => value === "X";
    if (
      !passcode.currentPasscode.every(unfilledPasscode) &&
      e.key === "Backspace" &&
      activeDigit > 0
    ) {
      setActiveDigit(activeDigit - 1);
      setPasscode({
        increment: passcode.increment - 1,
        currentPasscode: passcode.currentPasscode,
      });
    }
    const validkeys = ["1", "2", "3", "4", "5", "6", "7", "8"];
    if (validkeys.indexOf(e.key) >= 0) {
      const keypadEntryProxy = { target: { dataset: { number: e.key } } };
      handlePasscodeInput(keypadEntryProxy);
    } else if (!passcode.currentPasscode.includes("X") && e.key === "Enter") {
      submitPasscode();
    }
  };

  return (
    <div
      className="
  gridArea
  KeypadContainer"
    >
      <div className="Keypad">
        <div className="KeypadText">
          <div className="KeypadTextUpper">I/O FUNCTION LVL</div>
          <div className="KeypadTextMain">ENTER PASSCODE TO RESET ALARM</div>
          <div className="KeypadTextLower">
            <div>08/243</div>
            <div>BACKUP 49%</div>
          </div>
        </div>
        <div className="KeypadInputs">
          <div
            className={
              activeDigit === 0
                ? "Active Changed KeypadInput"
                : passcode.currentPasscode[0] !== "X"
                ? "Changed KeypadInput"
                : "KeypadInput"
            }
          >
            {passcode.currentPasscode[0]}
          </div>
          <div
            className={
              activeDigit === 1
                ? "Active Changed KeypadInput"
                : passcode.currentPasscode[1] !== "X"
                ? "Changed KeypadInput"
                : "KeypadInput"
            }
          >
            {passcode.currentPasscode[1]}
          </div>
          <div
            className={
              activeDigit === 2
                ? "Active Changed KeypadInput"
                : passcode.currentPasscode[2] !== "X"
                ? "Changed KeypadInput"
                : "KeypadInput"
            }
          >
            {passcode.currentPasscode[2]}
          </div>
          <div
            className={
              activeDigit === 3
                ? "Active Changed KeypadInput"
                : passcode.currentPasscode[3] !== "X"
                ? "Changed KeypadInput"
                : "KeypadInput"
            }
          >
            {passcode.currentPasscode[3]}
          </div>
        </div>
        <div className="KeypadNumbers">
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="1"
          >
            1
          </button>
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="2"
          >
            2
          </button>
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="3"
          >
            3
          </button>
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="4"
          >
            4
          </button>{" "}
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="5"
          >
            5
          </button>{" "}
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="6"
          >
            6
          </button>{" "}
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="7"
          >
            7
          </button>{" "}
          <button
            onClick={(e) => {
              handlePasscodeInput(e);
            }}
            className="KeypadNumber"
            data-number="8"
          >
            8
          </button>{" "}
          <button
            disabled={!(activeDigit === 0 || activeDigit === 3)}
            onClick={(e) => submitPasscode()}
            className="KeypadNumber OK"
          >
            OK
          </button>
          <input
            className="KeypadTextInput"
            autoFocus={true}
            type="text"
            onBlur={({ target }) => target.focus()}
            onKeyDown={handleAnswerChange}
            maxLength="4"
          />
        </div>
      </div>
    </div>
  );
}
