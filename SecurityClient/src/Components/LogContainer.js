import React from "react";
import "./LogContainer.css";

export default function KeypadContainer({ activityLog }) {
  return (
    <div className="gridArea LogContainer">
      <div className="ActivityLog">
        <div className="LogTitle">
          <div className="LogTitleDate">DATE</div>
          <div className="LogTitleDate">TIME</div>
          <div className="LogTitleActivity">ACTIVITY</div>
        </div>
        <ul className="ActivityLogList">
          {activityLog
            .slice(0)
            .reverse()
            .map((log, idx) => (
              <li className={`Log Log${log.type}`} key={log._id}>
                <div>{log.date.slice(0, 10)}</div>
                <div>
                  {new Date(log.date)
                    .toLocaleString("en-GB", { timeZone: "Europe/London" })
                    .slice(12)}
                  :GMT
                </div>
                <div>{log.log}</div>
              </li>
            ))}
        </ul>
        {!activityLog.length && (
          <div className="LoadingText">
            ...PLEASE WAIT, FETCHING ACTIVITY LOG
          </div>
        )}
      </div>
    </div>
  );
}
