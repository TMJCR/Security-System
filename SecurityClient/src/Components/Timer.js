import React, { useEffect, useState } from "react";

export default function Timer({ setPasscodeMessage, seconds, setSeconds }) {
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_SERVER}/`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((JSONresponse) => {
        setPasscodeMessage(JSONresponse.testingMode.message);
        setSeconds(JSONresponse.testingMode.timeElapsed);
      });
  };
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((seconds) => {
        const newSeconds = seconds - 1;
        if (newSeconds < 1) {
          fetchData();
          window.clearInterval(this);

          return;
        }
        return newSeconds;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="PasscodeMessageSubText">
      <div>Refreshing in {seconds} secs...</div>
    </div>
  );
}
