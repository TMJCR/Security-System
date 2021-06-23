import React, { useState } from "react";
import "./Map.css";
export default function Map({
  data,
  setData,
  setPasscodeMessage,
  seconds,
  setSeconds,
  reboot,
  setReboot,
}) {
  const [doorMessage, setDoorMessage] = useState({
    doorLabel1: false,
    doorLabel2: false,
    doorLabel3: false,
    doorLabel4: false,
    doorLabel5: false,
    doorLabel6: false,
    doorLabel7: false,
  });

  const request = (url, body) => {
    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((JSONresponse) => {
        setData(JSONresponse);
        setPasscodeMessage(JSONresponse.testingMode.message);
        setSeconds(JSONresponse.testingMode.timeElapsed);
        setReboot(false);
      });
  };
  const triggerSensor = async (e, state = "Alert") => {
    const url = `${process.env.REACT_APP_SERVER}/triggerSensor`;
    const body = JSON.stringify({
      name: e.currentTarget.id,
      type: e.currentTarget.dataset.type,
      currentState: state,
    });
    request(url, body);
  };

  const proximityWarning = (e) => {
    // const zoneNumber = e.currentTarget.id.slice(-1);
    // if (data.zones[`zone${zoneNumber}`].status === "Alert") {
    //   return;
    // }
    const url = `${process.env.REACT_APP_SERVER}/proximityWarning`;
    const body = JSON.stringify({
      name: e.currentTarget.id,
    });
    request(url, body);
  };

  const tryToOpenDoor = (e) => {
    const doorNumber = e.target.id.slice(-1);
    const doorLabel = `doorLabel${doorNumber}`;
    const doorColorLabel = `door${doorNumber}`;
    const door = findDoor(e);
    const restricted = checkRestriction(door, data.restrictedZones);
    const zone = `zones[zone${door.status.zone}].status`;

    if (restricted) {
      setDoorMessage({
        ...doorMessage,
        [doorLabel]: !doorMessage[doorLabel],
      });
    } else {
      openDoor(e.target.id, e.currentTarget.dataset.type, restricted);
    }
  };

  const openDoor = async (name, type, restricted) => {
    const doorNumber = name.slice(-1);
    // if (data.zones[`zone${doorNumber}`].status === "Alert") {
    //   return;
    // }
    fetch(`${process.env.REACT_APP_SERVER}/openDoor`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        restriction: restricted,
      }),
    })
      .then((response) => response.json())
      .then((JSONresponse) => {
        setData(JSONresponse);
      });
  };

  const findDoor = (e) => {
    const equipment = e.target.id;
    const door = data.doorSensors
      .filter((door) => door.status.name === equipment)
      .reduce((accumulator) => accumulator);
    return door;
  };

  const checkRestriction = (equipment, restrictedZones) => {
    const restricted = restrictedZones.includes(equipment.status.zone);
    return restricted;
  };

  const forceOpenDoor = (e) => {
    const door = findDoor(e);
    const restricted = checkRestriction(door, data.restrictedZones);
    if (restricted) {
      openDoor(e.target.id, e.currentTarget.dataset.type, restricted);
    }
  };

  return (
    <div className="Floorplan">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1046 551.47"
      >
        <defs>
          <clipPath id="clip-path" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="23.97"
              y="331.29"
              width="106"
              height="27.48"
            />
          </clipPath>
          <clipPath id="clip-path-2" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="482.97"
              y="413.29"
              width="106"
              height="27.48"
            />
          </clipPath>
          <clipPath id="clip-path-3" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="941.97"
              y="311.29"
              width="106"
              height="27.48"
            />
          </clipPath>
          <clipPath id="clip-path-4" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="662.97"
              y="29.29"
              width="106"
              height="27.48"
            />
          </clipPath>
          <clipPath id="clip-path-5" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="311.53"
              y="135.6"
              width="54.87"
              height="10.09"
            />
          </clipPath>
          <clipPath id="clip-path-6" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="311.53"
              y="135.6"
              width="54.87"
              height="13.97"
            />
          </clipPath>
          <clipPath id="clip-path-7" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="757.53"
              y="204.6"
              width="54.87"
              height="10.09"
            />
          </clipPath>
          <clipPath id="clip-path-8" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="757.53"
              y="204.6"
              width="54.87"
              height="13.97"
            />
          </clipPath>
          <clipPath id="clip-path-9" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="929.53"
              y="56.6"
              width="54.87"
              height="10.09"
            />
          </clipPath>
          <clipPath id="clip-path-10" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="929.53"
              y="56.6"
              width="54.87"
              height="13.97"
            />
          </clipPath>
          <clipPath id="clip-path-11" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="269.53"
              y="345.6"
              width="54.87"
              height="10.09"
            />
          </clipPath>
          <clipPath id="clip-path-12" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="269.53"
              y="345.6"
              width="54.87"
              height="13.97"
            />
          </clipPath>
          <clipPath id="clip-path-13" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="455.53"
              y="323.6"
              width="54.87"
              height="10.09"
              transform="translate(144.9 805.06) rotate(-88.88)"
            />
          </clipPath>
          <clipPath id="clip-path-14" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="454.63"
              y="319.64"
              width="54.87"
              height="13.97"
              transform="translate(146.04 802.18) rotate(-88.88)"
            />
          </clipPath>
          <clipPath id="clip-path-15" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="885.53"
              y="368.6"
              width="54.87"
              height="10.09"
              transform="matrix(0.02, -1, 1, 0.02, 521.47, 1279.1)"
            />
          </clipPath>
          <clipPath id="clip-path-16" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="884.63"
              y="364.64"
              width="54.87"
              height="13.97"
              transform="matrix(0.02, -1, 1, 0.02, 522.6, 1276.22)"
            />
          </clipPath>
          <clipPath id="clip-path-17" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="530.53"
              y="60.6"
              width="54.87"
              height="10.09"
            />
          </clipPath>
          <clipPath id="clip-path-18" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="528.53"
              y="59.6"
              width="54.87"
              height="13.97"
            />
          </clipPath>
          <clipPath id="clip-path-19" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="173.01"
              y="8.27"
              width="16.26"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-20" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="173.01"
              y="8.27"
              width="22.51"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-21" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="396.01"
              y="172.27"
              width="16.26"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-22" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="396.01"
              y="172.27"
              width="22.51"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-23" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="866.01"
              y="457.27"
              width="16.26"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-24" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="866.01"
              y="457.27"
              width="22.51"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-25" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="388.01"
              y="452.27"
              width="16.26"
              height="44.16"
            />
          </clipPath>
          <clipPath id="clip-path-26" transform="translate(0 16.75)">
            <rect
              className="cls-1"
              x="388.01"
              y="452.27"
              width="22.51"
              height="44.16"
            />
          </clipPath>
        </defs>
        <g id="Background">
          <rect className="cls-2" y="16.75" width="1046" height="509" />
          <path
            className="cls-3"
            d="M379.8,3.2"
            transform="translate(0 16.75)"
          />
        </g>
        <g id="OuterWalls" className={reboot ? "rebootOuter cls-4 " : "cls-4"}>
          {" "}
          <line
            className="cls-5"
            x1="1040.6"
            y1="113.55"
            x2="1040.6"
            y2="257.55"
          />
          <line
            className="cls-5"
            x1="1040.6"
            y1="279.15"
            x2="1040.6"
            y2="430.35"
          />
          <polyline
            className="cls-5"
            points="1040.6 451.95 1040.6 523.95 367.4 522.75 340.2 461.15 157 461.15 68.2 383.55 3.02 383.55 3.8 156.75 68.6 156.75 162.2 77.55 162.6 20.35 371 19.95 1040.6 19.95 1040.6 91.95"
          />
          <polyline
            className="cls-5"
            points="70.6 169.15 15.52 169.15 15.4 361.95 70.6 361.95"
          />
          <polyline
            className="cls-5"
            points="70.6 175.06 23.5 175.06 23.5 354.36 70.6 354.36 70.6 337.55"
          />
          <polyline
            className="cls-5"
            points="70.6 159.36 378.92 159.36 378.92 19.95"
          />
          <rect className="cls-5" x="273" y="21.15" width="1.8" height="40.6" />
          <polyline
            className="cls-5"
            points="71.57 337.16 340.08 337.16 340.2 461.15"
          />
          <line className="cls-5" x1="850.6" y1="22.75" x2="850.6" y2="81.06" />
          <polyline
            className="cls-5"
            points="674.22 332.55 707.4 332.35 707.4 364.35 850.6 364.83 850.6 410.94"
          />
          <polyline
            className="cls-5"
            points="674.22 150.58 674.22 107.66 498.64 107.66 498.64 159.36 480.19 159.36 439.76 159.36 439.76 146.61 421.31 146.61 421.31 387.88 438.34 387.88 437.8 313.15 483.4 313.15 483.4 374.75 500.2 374.75 500.06 387.88 632.36 387.88"
          />
          <path
            className="cls-5"
            d="M674.22,168.8"
            transform="translate(0 16.75)"
          />
          <polyline
            className="cls-5"
            points="850.6 171.51 850.6 231.99 674.22 231.99 674.22 203.79"
          />
          <polyline
            className="cls-5"
            points="691.22 185.55 722.61 185.55 800.29 185.55 800.29 171.51 867.6 171.51"
          />
          <path
            className="cls-5"
            d="M856.2,347.6"
            transform="translate(0 16.75)"
          />
          <path
            className="cls-5"
            d="M850.6,348.07"
            transform="translate(0 16.75)"
          />
          <polyline
            className="cls-5"
            points="707.56 299.91 707.56 318.71 674.22 318.71 674.22 299.91 856.2 300.98 856.2 364.35 850.6 364.83"
          />
          <path
            className="cls-5"
            d="M693,417.2"
            transform="translate(0 16.75)"
          />
          <polyline
            className="cls-5"
            points="674.22 20.23 674.22 83.55 505.82 83.55 505.82 22.75"
          />
          <polyline
            className="cls-5"
            points="1035.76 77.95 912.2 77.95 912.05 22.75 1038.68 22.75"
          />
          <polyline
            className="cls-5"
            points="995.41 121.67 995.4 130.19 1035.76 130.19 1035.76 144.37 1025.21 144.37 1025 209.95 1035.76 209.95 1035.76 215.76 912.05 215.76 912.05 120.61 1035.76 120.61"
          />
          <polyline
            className="cls-5"
            points="1035.76 417.68 912.05 417.68 912.05 319.51 1035.76 319.51"
          />
          <polyline
            className="cls-5"
            points="1040.6 470.88 912.05 470.88 912.05 521.15"
          />
          <polyline
            className="cls-5"
            points="159.98 364.47 71.57 364.47 71.57 384.69"
          />
          <polygon
            className="cls-6"
            points="1000.2 324.35 1010.13 324.35 1009.8 388.35 999.49 388.35 1000.2 324.35"
          />
          <polygon
            className="cls-6"
            points="1027.16 324.35 1027.87 388.35 1035.76 388.35 1035.76 324.35 1027.16 324.35"
          />
          <polygon
            className="cls-6"
            points="973.91 372.98 973.91 381.14 937.59 381.14 937.59 364.83 948.23 364.83 948.41 372.98 973.91 372.98"
          />
          <polyline
            className="cls-6"
            points="1035.76 404.2 994.6 403.55 994.6 413.6 1035.76 413.6"
          />
          <polyline
            className="cls-6"
            points="977.85 413.6 977.85 403.55 922.52 403.55 922.52 394.44 913 394.75"
          />
          <polyline
            className="cls-6"
            points="913 380.43 922.34 380.43 922.34 327.05 945.43 327.05 945.43 319.51"
          />
          <line
            className="cls-5"
            x1="675.4"
            y1="201.95"
            x2="682.2"
            y2="201.95"
          />
          <line
            className="cls-5"
            x1="687.12"
            y1="201.95"
            x2="696.3"
            y2="201.95"
          />
          <polyline
            className="cls-5"
            points="691.71 200.99 691.71 185.55 691.71 150.31 675.4 150.31"
          />
          <rect
            className="cls-6"
            x="999.4"
            y="145.95"
            width="9.84"
            height="23.78"
          />
          <rect
            className="cls-6"
            x="998.6"
            y="178.87"
            width="10.64"
            height="31.83"
          />
          <polygon
            className="cls-6"
            points="939.4 153.15 975.37 153.15 975.37 163.17 947.52 163.17 947.4 170.75 939.4 170.75 939.4 153.15"
          />
          <polygon
            className="cls-6"
            points="939.4 177.54 939.4 194.79 975.37 194.79 975.37 184.15 947.52 184.15 947.4 177.15 939.4 177.54"
          />
          <polyline
            className="cls-5"
            points="913 153.15 923.23 153.15 923.23 205.92 939.4 205.92 939.4 214.07"
          />
        </g>
        <g
          id="ThickInnerWalls"
          className={reboot ? "cls-7 rebootOuter" : "cls-7"}
        >
          <polyline
            className="cls-8"
            points="484.2 160.35 484.2 221.7 631.83 221.7 631.83 147.39 498.64 146.61"
          />
          <polyline
            className="cls-8"
            points="439.76 159.36 439.76 221.7 484.2 221.7"
          />
          <polyline
            className="cls-8"
            points="631.83 221.7 632.2 313.95 483.4 313.15"
          />
          <line
            className="cls-8"
            x1="632.36"
            y1="387.88"
            x2="632.2"
            y2="313.95"
          />
          <polyline
            className="cls-8"
            points="389.8 21.95 389.8 82.48 378.92 82.48"
          />
          <polyline
            className="cls-8"
            points="378.92 89.66 389.8 89.66 389.8 151.47 378.92 151.47"
          />
          <polyline
            className="cls-8"
            points="409.25 21.95 409.25 44.52 425.39 44.52 425.39 36.36 465.8 36.35 465.8 44.52 481.61 44.52 481.61 21.95"
          />
          <polyline
            className="cls-8"
            points="479.22 44.52 479.48 53.83 484.2 53.83 484.2 107.66 478.6 107.66 478.6 118.75 484.2 118.75 484.2 127.55 455.45 127.55 455.45 123.98 438.69 123.98 438.69 127.55 408.2 127.55 408.2 118.66 414.6 118.75 414.6 109.15 409 109.15 409 54.75 414.6 54.75 414.57 44.52"
          />
          <path
            className="cls-8"
            d="M416.2,92.4"
            transform="translate(0 16.75)"
          />
          <polyline
            className="cls-8"
            points="414.6 109.15 425.88 109.15 425.8 54.75 414.6 54.75"
          />
          <polyline
            className="cls-9"
            points="478.6 107.66 466.12 107.66 466.6 53.95 478.6 53.95"
          />
          <rect
            className="cls-8"
            x="437.8"
            y="57.95"
            width="17.14"
            height="51.2"
          />
          <polyline
            className="cls-8"
            points="421.31 177.72 401.09 177.72 401.09 195.27 381.41 195.27 381.41 212.35 318.6 212.35 318.6 237.04"
          />
          <polyline
            className="cls-8"
            points="420.2 161.15 381.76 161.15 381.58 178.22 381.41 195.27"
          />
          <line
            className="cls-8"
            x1="401.09"
            y1="177.72"
            x2="381.58"
            y2="178.21"
          />
          <line
            className="cls-8"
            x1="633.8"
            y1="227.55"
            x2="646.91"
            y2="227.55"
          />
          <polyline
            className="cls-8"
            points="655.77 227.55 671.38 227.55 671.4 239.55"
          />
          <line
            className="cls-8"
            x1="671.4"
            y1="249.15"
            x2="671.4"
            y2="285.73"
          />
          <polyline
            className="cls-8"
            points="655.4 304.35 671.4 304.35 671.4 293.17"
          />
          <line
            className="cls-8"
            x1="646.91"
            y1="304.35"
            x2="632.16"
            y2="304.35"
          />
          <line
            className="cls-8"
            x1="706.6"
            y1="186.75"
            x2="706.6"
            y2="204.85"
          />
          <line
            className="cls-8"
            x1="706.6"
            y1="212.83"
            x2="706.6"
            y2="230.79"
          />
          <line
            className="cls-8"
            x1="697.8"
            y1="217.15"
            x2="674.22"
            y2="217.15"
          />
          <polyline
            className="cls-8"
            points="718.38 184.15 718.38 173.59 742.46 173.59 742.46 184.15"
          />
          <polyline
            className="cls-8"
            points="1036.91 307.95 995.59 307.95 995.59 299.91 1036.91 299.91"
          />
          <polyline
            className="cls-8"
            points="1035.76 234.65 995.59 234.65 995.4 225.15 1035.76 225.15"
          />
          <polyline
            className="cls-8"
            points="913.8 69.95 978.21 69.95 978.21 77.95"
          />
          <polyline
            className="cls-8"
            points="1040.6 69.95 995.41 69.95 995.41 76.8"
          />
          <rect
            className="cls-8"
            x="941.8"
            y="45.15"
            width="36.41"
            height="11.08"
          />
          <rect
            className="cls-8"
            x="1012.2"
            y="39.55"
            width="9.46"
            height="20.58"
          />
          <path
            className="cls-8"
            d="M913,124.4"
            transform="translate(0 16.75)"
          />
          <path
            className="cls-8"
            d="M318.6,236"
            transform="translate(0 16.75)"
          />
          <line
            className="cls-8"
            x1="318.6"
            y1="273.49"
            x2="318.6"
            y2="252.74"
          />
          <polyline
            className="cls-8"
            points="318.6 292.64 318.6 319.51 384.36 319.51 384.36 337.16 384.36 375.38 420.24 375.38 420.24 354.36 400.8 354.36 400.8 337.16"
          />
          <line
            className="cls-8"
            x1="365.8"
            y1="305.95"
            x2="365.8"
            y2="296.9"
          />
          <line
            className="cls-8"
            x1="365.8"
            y1="285.99"
            x2="365.8"
            y2="276.68"
          />
          <line
            className="cls-8"
            x1="365.8"
            y1="267.83"
            x2="365.8"
            y2="258.06"
          />
          <line
            className="cls-8"
            x1="365.8"
            y1="248.75"
            x2="365.8"
            y2="237.04"
          />
          <line className="cls-8" x1="365.8" y1="228" x2="365.8" y2="216.29" />
          <line
            className="cls-8"
            x1="365.8"
            y1="315.52"
            x2="365.8"
            y2="319.51"
          />
          <polyline
            className="cls-8"
            points="439.76 235.36 439.76 252.74 480.9 252.74 480.9 235.36"
          />
          <polyline
            className="cls-8"
            points="439.76 296.9 439.76 252.74 480.9 252.74 480.9 296.9 464.23 296.9 463.88 264.71"
          />
          <polygon
            className="cls-8"
            points="607.71 82.48 607.71 75.56 635.96 75.56 635.96 52.21 607.71 52.21 607.71 43.37 644.2 43.55 644.2 81.95 607.71 82.48"
          />
          <line
            className="cls-8"
            x1="666.6"
            y1="113.95"
            x2="666.6"
            y2="127.55"
          />
          <line
            className="cls-8"
            x1="629.8"
            y1="155.55"
            x2="616.22"
            y2="155.55"
          />
        </g>
        <g id="ThinInnerWalls" className="cls-7">
          <polygon
            className="cls-5"
            points="375.4 444.35 375.4 455.45 446.76 455.45 446.6 443.55 375.4 444.35"
          />
          <polygon
            className="cls-5"
            points="392.2 466.75 427.47 466.75 427.47 475.14 400.74 475.14 401 497.95 427.47 497.49 427.4 506.75 392.2 506.75 392.2 466.75"
          />
          <polygon
            className="cls-5"
            points="443.57 466.75 443.57 475.41 469.8 475.55 469.8 498.29 443.4 497.95 443.4 506.75 479.08 506.75 478.15 466.75 443.57 466.75"
          />
          <line
            className="cls-5"
            x1="399.5"
            y1="443.55"
            x2="399.5"
            y2="429.56"
          />
          <polyline
            className="cls-5"
            points="399.5 424.77 399.5 410.23 387.97 410.23 380.34 410.23 370.23 410.23 370.23 424.06"
          />
          <polyline
            className="cls-5"
            points="370.23 429.56 370.23 443.55 375.4 444.35"
          />
          <polygon
            className="cls-5"
            points="500.06 502.45 500.06 521.15 582.35 521.15 582.35 509.9 508.2 509.95 508.35 502.45 500.06 502.45"
          />
          <polygon
            className="cls-5"
            points="500.06 471.68 500.06 489.37 508.61 489.37 508.61 479.66 524.2 479.55 524.2 471.68 500.06 471.68"
          />
          <rect
            className="cls-5"
            x="543.69"
            y="471.68"
            width="36.89"
            height="8.85"
          />
          <rect
            className="cls-5"
            x="596.89"
            y="471.68"
            width="37.6"
            height="8.85"
          />
          <polyline
            className="cls-5"
            points="248.2 455.55 248.2 364.47 340.11 364.47"
          />
          <polyline
            className="cls-5"
            points="158.6 457.15 159.98 364.47 248.2 364.47"
          />
          <polyline
            className="cls-5"
            points="913 141.15 923.23 141.15 923.23 130.36 979.27 130.36 979.27 121.67"
          />
        </g>
        <g id="Surface" className={reboot ? "rebootInner" : ""}>
          <g id="Group_868" data-name="Group 868" className="cls-10">
            <ellipse
              id="Ellipse_73"
              data-name="Ellipse 73"
              className="cls-8"
              cx="598.72"
              cy="293.43"
              rx="3.35"
              ry="3.16"
            />
            <ellipse
              id="Ellipse_74"
              data-name="Ellipse 74"
              className="cls-11"
              cx="598.72"
              cy="293.43"
              rx="5.51"
              ry="5.21"
            />
            <ellipse
              id="Ellipse_75"
              data-name="Ellipse 75"
              className="cls-11"
              cx="598.72"
              cy="293.43"
              rx="12.45"
              ry="11.77"
            />
            <ellipse
              id="Ellipse_76"
              data-name="Ellipse 76"
              className="cls-11"
              cx="598.72"
              cy="293.43"
              rx="26.32"
              ry="24.88"
            />
          </g>
          <g id="BG_Lines" data-name="BG Lines" className="cls-10">
            <g id="Group_847" data-name="Group 847">
              <g id="Group_840" data-name="Group 840">
                <ellipse
                  id="Ellipse_42"
                  data-name="Ellipse 42"
                  className="cls-12"
                  cx="749.58"
                  cy="130.88"
                  rx="49.12"
                  ry="49.83"
                />
                <ellipse
                  id="Ellipse_43"
                  data-name="Ellipse 43"
                  className="cls-11"
                  cx="749.58"
                  cy="130.88"
                  rx="11.52"
                  ry="11.69"
                />
                <path
                  id="Path_927"
                  data-name="Path 927"
                  className="cls-8"
                  d="M763.34,100h15.44l6.32-6.5h1.28l5-5h9.76"
                  transform="translate(0 16.75)"
                />
                <ellipse
                  id="Ellipse_44"
                  data-name="Ellipse 44"
                  className="cls-13"
                  cx="749.58"
                  cy="130.88"
                  rx="34.64"
                  ry="35.14"
                />
                <g id="Group_839" data-name="Group 839">
                  <path
                    id="Path_928"
                    data-name="Path 928"
                    className="cls-12"
                    d="M931.66,263.77c-58.1,0-105.2-47.77-105.2-106.71s47.1-106.72,105.2-106.72"
                    transform="translate(0 16.75)"
                  />
                  <ellipse
                    id="Ellipse_45"
                    data-name="Ellipse 45"
                    className="cls-14"
                    cx="862.38"
                    cy="168.62"
                    rx="106.72"
                    ry="108.26"
                  />
                </g>
              </g>
              <g id="Group_843" data-name="Group 843">
                <path
                  id="Path_929"
                  data-name="Path 929"
                  className="cls-5"
                  d="M491.82,238.45H530.7l57.84-58.67V98.47L624.46,62"
                  transform="translate(0 16.75)"
                />
                <g id="Group_842" data-name="Group 842">
                  <g id="Group_841" data-name="Group 841">
                    <path
                      id="Path_931"
                      data-name="Path 931"
                      className="cls-5"
                      d="M250.84,282H449.42l47.68-48.36H598.54L612.7,248h89.52L790.3,337.3H914l22.24-22.64h28.64l7.2,7.3h64.8"
                      transform="translate(0 16.75)"
                    />
                  </g>
                  <path
                    id="Path_932"
                    data-name="Path 932"
                    className="cls-5"
                    d="M711.74,257.61h81.12L835,214.84H867.5"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_933"
                    data-name="Path 933"
                    className="cls-5"
                    d="M762.06,389V349.15L741.9,328.7V285.12l6-6.09V240.56l37.28-37.81V149.67l-9.44-9.57V127.76l3-3.08V96.84"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_846" data-name="Group 846">
                <path
                  id="Path_934"
                  data-name="Path 934"
                  className="cls-5"
                  d="M715.82,122.49H765.5l2.4-2.44h4.8"
                  transform="translate(0 16.75)"
                />
                <g id="Group_844" data-name="Group 844">
                  <path
                    id="Path_935"
                    data-name="Path 935"
                    className="cls-5"
                    d="M722.38,129.22h14l5.76-5.84h1.12l4.48-4.55h8.88"
                    transform="translate(0 16.75)"
                  />
                  <ellipse
                    id="Ellipse_46"
                    data-name="Ellipse 46"
                    className="cls-5"
                    cx="756.62"
                    cy="135.59"
                    rx="6.4"
                    ry="6.49"
                  />
                  <ellipse
                    id="Ellipse_47"
                    data-name="Ellipse 47"
                    className="cls-5"
                    cx="756.62"
                    cy="135.59"
                    rx="1.2"
                    ry="1.22"
                  />
                </g>
                <g id="Group_845" data-name="Group 845">
                  <ellipse
                    id="Ellipse_48"
                    data-name="Ellipse 48"
                    className="cls-5"
                    cx="772.7"
                    cy="136.8"
                    rx="2.08"
                    ry="2.11"
                  />
                  <ellipse
                    id="Ellipse_49"
                    data-name="Ellipse 49"
                    className="cls-5"
                    cx="772.7"
                    cy="136.8"
                    rx="3.44"
                    ry="3.49"
                  />
                  <ellipse
                    id="Ellipse_50"
                    data-name="Ellipse 50"
                    className="cls-5"
                    cx="772.7"
                    cy="136.8"
                    rx="7.76"
                    ry="7.87"
                  />
                  <ellipse
                    id="Ellipse_51"
                    data-name="Ellipse 51"
                    className="cls-5"
                    cx="772.7"
                    cy="136.8"
                    rx="16.4"
                    ry="16.64"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_936"
              data-name="Path 936"
              className="cls-15"
              d="M990.78,161.93v49.58l25.44,25.81V257.2"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_937"
              data-name="Path 937"
              className="cls-5"
              d="M576.06,129.06h30.08l1.44-1.46h2.88"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_938"
              data-name="Path 938"
              className="cls-5"
              d="M636,117V93.51l12.08-12.17V71.93"
              transform="translate(0 16.75)"
            />
            <g id="Group_853" data-name="Group 853">
              <ellipse
                id="Ellipse_53"
                data-name="Ellipse 53"
                className="cls-12"
                cx="521.9"
                cy="156.36"
                rx="23.2"
                ry="23.53"
              />
              <g id="Group_852" data-name="Group 852">
                <path
                  id="Path_939"
                  data-name="Path 939"
                  className="cls-12"
                  d="M637.58,76.15c-30.31,0-54.89,24.91-54.89,55.66s24.56,55.67,54.86,55.68h0"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_940"
                  data-name="Path 940"
                  className="cls-5"
                  d="M509.58,126.3H621.42l5.36,5.52h10.8"
                  transform="translate(0 16.75)"
                />
                <g id="Group_848" data-name="Group 848">
                  <ellipse
                    id="Ellipse_54"
                    data-name="Ellipse 54"
                    className="cls-5"
                    cx="637.58"
                    cy="148.57"
                    rx="4.72"
                    ry="4.79"
                  />
                  <ellipse
                    id="Ellipse_55"
                    data-name="Ellipse 55"
                    className="cls-5"
                    cx="637.58"
                    cy="148.57"
                    rx="7.76"
                    ry="7.87"
                  />
                </g>
                <path
                  id="Path_941"
                  data-name="Path 941"
                  className="cls-5"
                  d="M637.58,76.15c-30.31,0-54.88,24.9-54.88,55.64v0"
                  transform="translate(0 16.75)"
                />
                <g id="Group_851" data-name="Group 851">
                  <path
                    id="Path_942"
                    data-name="Path 942"
                    className="cls-5"
                    d="M472.22,154.7h141l20.48-20.77"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_850" data-name="Group 850">
                    <path
                      id="Path_943"
                      data-name="Path 943"
                      className="cls-5"
                      d="M250.75,193.09H434.3l48.32-48.94H492L529.58,106h74.56"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_944"
                      data-name="Path 944"
                      className="cls-5"
                      d="M524.3,111.13h31.52l13,13.14h2.56l10.08,10.23H601.5"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_849" data-name="Group 849">
                      <ellipse
                        id="Ellipse_56"
                        data-name="Ellipse 56"
                        className="cls-5"
                        cx="601.5"
                        cy="151.25"
                        rx="14.4"
                        ry="14.61"
                      />
                      <ellipse
                        id="Ellipse_57"
                        data-name="Ellipse 57"
                        className="cls-5"
                        cx="601.5"
                        cy="151.25"
                        rx="2.64"
                        ry="2.68"
                      />
                      <ellipse
                        id="Ellipse_58"
                        data-name="Ellipse 58"
                        className="cls-14"
                        cx="601.5"
                        cy="151.25"
                        rx="55.68"
                        ry="56.48"
                      />
                    </g>
                    <ellipse
                      id="Ellipse_59"
                      data-name="Ellipse 59"
                      className="cls-14"
                      cx="520.78"
                      cy="140.86"
                      rx="23.6"
                      ry="23.94"
                    />
                    <ellipse
                      id="Ellipse_60"
                      data-name="Ellipse 60"
                      className="cls-5"
                      cx="521.9"
                      cy="156.36"
                      rx="23.2"
                      ry="23.53"
                    />
                  </g>
                </g>
                <path
                  id="Path_945"
                  data-name="Path 945"
                  className="cls-5"
                  d="M629.18,229.61V192.93l13.6-13.8V149.75l-4.08-4.05v-26L613.58,94.25V58.54l6.4-6.49V43.77l-2.08-2.11V22.91"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Path_946"
              data-name="Path 946"
              className="cls-5"
              d="M813.66,162.33h57.68l2.72,2.76h5.6"
              transform="translate(0 16.75)"
            />
            <g id="Group_867" data-name="Group 867">
              <g id="Group_866" data-name="Group 866">
                <g id="Group_864" data-name="Group 864">
                  <g id="Group_863" data-name="Group 863">
                    <g id="Group_855" data-name="Group 855">
                      <path
                        id="Path_948"
                        data-name="Path 948"
                        className="cls-5"
                        d="M564.38,1l102,103.47h19.84l79.52,80.59H923.42"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_854" data-name="Group 854">
                        <path
                          id="Path_949"
                          data-name="Path 949"
                          className="cls-8"
                          d="M746.62,222.31h66.64l27.44-27.84h5.36l21.36-21.67h42.32"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_950"
                          data-name="Path 950"
                          className="cls-8"
                          d="M864.06,136.44h63.52l3,3.09h6.16"
                          transform="translate(0 16.75)"
                        />
                        <ellipse
                          id="Ellipse_61"
                          data-name="Ellipse 61"
                          className="cls-8"
                          cx="917.74"
                          cy="141.67"
                          rx="5.6"
                          ry="5.68"
                        />
                      </g>
                    </g>
                    <g id="Group_862" data-name="Group 862">
                      <g id="Group_856" data-name="Group 856">
                        <path
                          id="Path_951"
                          data-name="Path 951"
                          className="cls-5"
                          d="M481.1,133.93h15.36l5.76,5.84h12.24l1.68-1.7h10.8l10.64-10.8h15l2.72,2.76h3.44l.88-.89h7.84"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_952"
                          data-name="Path 952"
                          className="cls-5"
                          d="M528.14,136.93h9.76L543,142h3.92"
                          transform="translate(0 16.75)"
                        />
                      </g>
                      <g id="Group_861" data-name="Group 861">
                        <path
                          id="Path_953"
                          data-name="Path 953"
                          className="cls-5"
                          d="M549.1,1.08V29.57L538.62,40.2V62.92l3.12,3.17V86.21l19.44,19.72V133.6l-4.88,5v6.41l1.52,1.54V161.2"
                          transform="translate(0 16.75)"
                        />
                        <ellipse
                          id="Ellipse_62"
                          data-name="Ellipse 62"
                          className="cls-14"
                          cx="546.3"
                          cy="166.42"
                          rx="12.88"
                          ry="13.07"
                        />
                        <g id="Group_860" data-name="Group 860">
                          <g id="Group_858" data-name="Group 858">
                            <g id="Group_857" data-name="Group 857">
                              <path
                                id="Path_954"
                                data-name="Path 954"
                                className="cls-5"
                                d="M525,147.81h25.92l1.2,1.21h2.56"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_955"
                                data-name="Path 955"
                                className="cls-5"
                                d="M528.46,144.24h7.28l3,3.08h.56l2.32,2.35h4.64"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_956"
                                data-name="Path 956"
                                className="cls-5"
                                d="M540.46,148.46h7l.32-.41h.64"
                                transform="translate(0 16.75)"
                              />
                            </g>
                            <ellipse
                              id="Ellipse_63"
                              data-name="Ellipse 63"
                              className="cls-5"
                              cx="546.3"
                              cy="166.42"
                              rx="3.36"
                              ry="3.41"
                            />
                            <ellipse
                              id="Ellipse_64"
                              data-name="Ellipse 64"
                              className="cls-5"
                              cx="546.3"
                              cy="166.42"
                              rx="0.64"
                              ry="0.65"
                            />
                          </g>
                          <path
                            id="Path_957"
                            data-name="Path 957"
                            className="cls-5"
                            d="M516.38,154.38H549l4.72-4.87"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_859" data-name="Group 859">
                            <ellipse
                              id="Ellipse_65"
                              data-name="Ellipse 65"
                              className="cls-5"
                              cx="554.7"
                              cy="165.78"
                              rx="1.12"
                              ry="1.14"
                            />
                            <ellipse
                              id="Ellipse_66"
                              data-name="Ellipse 66"
                              className="cls-5"
                              cx="554.7"
                              cy="165.78"
                              rx="1.76"
                              ry="1.79"
                            />
                            <ellipse
                              id="Ellipse_67"
                              data-name="Ellipse 67"
                              className="cls-5"
                              cx="554.7"
                              cy="165.78"
                              rx="4.08"
                              ry="4.14"
                            />
                            <ellipse
                              id="Ellipse_68"
                              data-name="Ellipse 68"
                              className="cls-5"
                              cx="554.7"
                              cy="165.78"
                              rx="8.56"
                              ry="8.68"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_865" data-name="Group 865">
                  <ellipse
                    id="Ellipse_69"
                    data-name="Ellipse 69"
                    className="cls-5"
                    cx="862.38"
                    cy="168.62"
                    rx="27.68"
                    ry="28.08"
                  />
                  <ellipse
                    id="Ellipse_70"
                    data-name="Ellipse 70"
                    className="cls-5"
                    cx="862.38"
                    cy="168.62"
                    rx="5.12"
                    ry="5.19"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_958"
              data-name="Path 958"
              className="cls-5"
              d="M931.66,263.77c-58.1,0-105.19-47.78-105.2-106.71"
              transform="translate(0 16.75)"
            />
            <ellipse
              id="Ellipse_71"
              data-name="Ellipse 71"
              className="cls-14"
              cx="985.66"
              cy="285.72"
              rx="58.4"
              ry="59.24"
            />
            <path
              id="Path_959"
              data-name="Path 959"
              className="cls-5"
              d="M928.62,185.38v45l23,23.37v18"
              transform="translate(0 16.75)"
            />
            <g id="Group_892" data-name="Group 892">
              <g id="Group_882" data-name="Group 882">
                <ellipse
                  id="Ellipse_83"
                  data-name="Ellipse 83"
                  className="cls-8"
                  cx="994.14"
                  cy="90.55"
                  rx="10"
                  ry="10.14"
                />
                <g id="Group_881" data-name="Group 881">
                  <path
                    id="Path_975"
                    data-name="Path 975"
                    className="cls-8"
                    d="M721,85.4H957.5l11.44-11.61h22.8"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_976"
                    data-name="Path 976"
                    className="cls-5"
                    d="M636.78,185.14V175l15-15.17h20.8l9.28-9.5"
                    transform="translate(0 16.75)"
                  />
                  <ellipse
                    id="Ellipse_84"
                    data-name="Ellipse 84"
                    className="cls-12"
                    cx="709.9"
                    cy="158.8"
                    rx="44.56"
                    ry="45.2"
                  />
                  <path
                    id="Path_977"
                    data-name="Path 977"
                    className="cls-5"
                    d="M745.34,121.27H758.7l.64.65h1.28"
                    transform="translate(0 16.75)"
                  />
                  <ellipse
                    id="Ellipse_85"
                    data-name="Ellipse 85"
                    className="cls-14"
                    cx="756.62"
                    cy="135.59"
                    rx="24.72"
                    ry="25.08"
                  />
                  <path
                    id="Path_978"
                    data-name="Path 978"
                    className="cls-5"
                    d="M721.74,143.34h18.8l9.76-9.9h7.52"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_979"
                    data-name="Path 979"
                    className="cls-5"
                    d="M699.26,109.91H761.9l9,9.17"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_891" data-name="Group 891">
                <g id="Group_890" data-name="Group 890">
                  <path
                    id="Path_980"
                    data-name="Path 980"
                    className="cls-5"
                    d="M697.34,231.23V166.15l-26.4-26.78v-5.2l-20.48-20.85V71.93"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_889" data-name="Group 889">
                    <ellipse
                      id="Ellipse_86"
                      data-name="Ellipse 86"
                      className="cls-14"
                      cx="665.74"
                      cy="90.14"
                      rx="30.48"
                      ry="30.92"
                    />
                    <g id="Group_888" data-name="Group 888">
                      <path
                        id="Path_981"
                        data-name="Path 981"
                        className="cls-5"
                        d="M522.94,79.31h42.24l22,22.32h17"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_887" data-name="Group 887">
                        <g id="Group_883" data-name="Group 883">
                          <path
                            id="Path_982"
                            data-name="Path 982"
                            className="cls-5"
                            d="M661.34,124.43V62.35l3-3v-6"
                            transform="translate(0 16.75)"
                          />
                        </g>
                        <path
                          id="Path_983"
                          data-name="Path 983"
                          className="cls-5"
                          d="M653.18,116.24V98.71l7-7.14V90.11l5.52-5.6V73.39"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_984"
                          data-name="Path 984"
                          className="cls-5"
                          d="M662.86,87.51V70.87l-.8-.81V68.44"
                          transform="translate(0 16.75)"
                        />
                        <ellipse
                          id="Ellipse_87"
                          data-name="Ellipse 87"
                          className="cls-5"
                          cx="665.74"
                          cy="90.14"
                          rx="7.92"
                          ry="8.03"
                        />
                        <ellipse
                          id="Ellipse_88"
                          data-name="Ellipse 88"
                          className="cls-5"
                          cx="665.74"
                          cy="90.14"
                          rx="1.44"
                          ry="1.46"
                        />
                        <g id="Group_886" data-name="Group 886">
                          <path
                            id="Path_985"
                            data-name="Path 985"
                            className="cls-5"
                            d="M676.62,145.13V66.9l-11.2-11.36"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_885" data-name="Group 885">
                            <path
                              id="Path_986"
                              data-name="Path 986"
                              className="cls-5"
                              d="M250.65,66.65H401.58l24.8,25.24h37.44l7.44-7.55H517.9l46-46.58h64.48L640,49.53h15l3.68-3.81h33.84"
                              transform="translate(0 16.75)"
                            />
                            <g id="Group_884" data-name="Group 884">
                              <ellipse
                                id="Ellipse_89"
                                data-name="Ellipse 89"
                                className="cls-5"
                                cx="664.3"
                                cy="70.1"
                                rx="2.56"
                                ry="2.6"
                              />
                              <ellipse
                                id="Ellipse_90"
                                data-name="Ellipse 90"
                                className="cls-5"
                                cx="664.3"
                                cy="70.1"
                                rx="4.24"
                                ry="4.3"
                              />
                              <ellipse
                                id="Ellipse_91"
                                data-name="Ellipse 91"
                                className="cls-5"
                                cx="664.3"
                                cy="70.1"
                                rx="9.6"
                                ry="9.74"
                              />
                              <ellipse
                                id="Ellipse_92"
                                data-name="Ellipse 92"
                                className="cls-5"
                                cx="664.3"
                                cy="70.1"
                                rx="20.24"
                                ry="20.53"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <ellipse
                  id="Ellipse_93"
                  data-name="Ellipse 93"
                  className="cls-14"
                  cx="707.74"
                  cy="188.5"
                  rx="45.2"
                  ry="45.85"
                />
              </g>
            </g>
            <ellipse
              id="Ellipse_94"
              data-name="Ellipse 94"
              className="cls-11"
              cx="994.14"
              cy="90.55"
              rx="16.32"
              ry="16.56"
            />
            <g id="Group_896" data-name="Group 896">
              <path
                id="Path_987"
                data-name="Path 987"
                className="cls-5"
                d="M714.46,196.74h60.48l24.88-25.24h4.8L824,151.86h38.4"
                transform="translate(0 16.75)"
              />
              <ellipse
                id="Ellipse_95"
                data-name="Ellipse 95"
                className="cls-5"
                cx="709.9"
                cy="158.8"
                rx="44.56"
                ry="45.2"
              />
              <g id="Group_895" data-name="Group 895">
                <g id="Group_894" data-name="Group 894">
                  <path
                    id="Path_988"
                    data-name="Path 988"
                    className="cls-5"
                    d="M251.11,39.35,542,39.47l92.48,93.81h18l72.08,73.12h143"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_893" data-name="Group 893">
                    <path
                      id="Path_989"
                      data-name="Path 989"
                      className="cls-5"
                      d="M686.22,167.53h214.4l10.32-10.47h20.72"
                      transform="translate(0 16.75)"
                    />
                    <ellipse
                      id="Ellipse_96"
                      data-name="Ellipse 96"
                      className="cls-5"
                      cx="931.66"
                      cy="173.81"
                      rx="9.04"
                      ry="9.17"
                    />
                    <ellipse
                      id="Ellipse_97"
                      data-name="Ellipse 97"
                      className="cls-5"
                      cx="931.66"
                      cy="173.81"
                      rx="14.8"
                      ry="15.01"
                    />
                    <path
                      id="Path_990"
                      data-name="Path 990"
                      className="cls-5"
                      d="M614.62,113.15H885l39.28,39.77"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_991"
                  data-name="Path 991"
                  className="cls-5"
                  d="M631.66,148.94H661l11-11.2H695.5l3.28,3.33h20.8L740,161.76h28.56l5.2-5.19h6.64l1.6,1.71h15"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
          </g>
          <g id="BG_Lines-2" data-name="BG Lines" className="cls-16">
            <g id="Group_847-2" data-name="Group 847">
              <g id="Group_840-2" data-name="Group 840">
                <path
                  id="Ellipse_42-2"
                  data-name="Ellipse 42"
                  className="cls-12"
                  d="M503.46,236.15c0-34.07,69-34.06,69.06,0S503.5,270.21,503.46,236.15Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_43-2"
                  data-name="Ellipse 43"
                  className="cls-11"
                  d="M529.89,236.15c-.17-7.93,16.38-7.93,16.2,0C546.27,244.08,529.72,244.08,529.89,236.15Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_927-2"
                  data-name="Path 927"
                  className="cls-8"
                  d="M528.21,228.84v-8.2l-4.5-3.36v-.68L520.28,214v-5.19"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_44-2"
                  data-name="Ellipse 44"
                  className="cls-13"
                  d="M513.64,236.15c0-24,48.68-24,48.7,0S513.67,260.17,513.64,236.15Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_839-2" data-name="Group 839">
                  <path
                    id="Path_928-2"
                    data-name="Path 928"
                    className="cls-12"
                    d="M641.69,139.42c-.09,73-147.83,72.94-147.9,0"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_45-2"
                    data-name="Ellipse 45"
                    className="cls-14"
                    d="M489.12,176.23c.09-74,150-74,150,0C639.07,250.24,489.2,250.23,489.12,176.23Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_843-2" data-name="Group 843">
                <path
                  id="Path_929-2"
                  data-name="Path 929"
                  className="cls-5"
                  d="M624.14,373.08V352.42L583.49,321.7H527.14l-25.31-19.08"
                  transform="translate(0 16.75)"
                />
                <g id="Group_842-2" data-name="Group 842">
                  <g id="Group_841-2" data-name="Group 841">
                    <path
                      id="Path_930"
                      data-name="Path 930"
                      className="cls-5"
                      d="M644.89,501.05V388.76L608,360.84V301.43l11-8.33V240.65L687.18,189V116.6l-17.26-13V86.77l5.57-4.21v-38"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_931-2"
                      data-name="Path 931"
                      className="cls-5"
                      d="M654.29,501.09V395.6l-33.52-25.33V316.39l10-7.53V261.31l61.92-46.79v-65.7L677,137V121.79L682,118V83.54"
                      transform="translate(0 16.75)"
                    />
                  </g>
                  <path
                    id="Path_932-2"
                    data-name="Path 932"
                    className="cls-5"
                    d="M637.42,256.25V213.16l-29.64-22.4V173.51"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_933-2"
                    data-name="Path 933"
                    className="cls-5"
                    d="M728.46,229.52H700.85l-14.17,10.71h-30.2L652.26,237H625.61l-26.21-19.8H562.62l-6.63,5h-8.55l-2.14-1.61H526"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_846-2" data-name="Group 846">
                <path
                  id="Path_934-2"
                  data-name="Path 934"
                  className="cls-5"
                  d="M543.78,254.08V227.69l-1.68-1.27v-2.55"
                  transform="translate(0 16.75)"
                />
                <g id="Group_844-2" data-name="Group 844">
                  <path
                    id="Path_935-2"
                    data-name="Path 935"
                    className="cls-5"
                    d="M548.45,250.6v-7.44l-4.05-3.06v-.59l-3.15-2.38v-4.72"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_46-2"
                    data-name="Ellipse 46"
                    className="cls-5"
                    d="M536.76,232.41c-.1-4.41,9.09-4.41,9,0C545.85,236.82,536.66,236.82,536.76,232.41Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_47-2"
                    data-name="Ellipse 47"
                    className="cls-5"
                    d="M540.41,232.41c0-.83,1.71-.83,1.69,0S540.39,233.24,540.41,232.41Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <g id="Group_845-2" data-name="Group 845">
                  <path
                    id="Ellipse_48-2"
                    data-name="Ellipse 48"
                    className="cls-5"
                    d="M540.64,223.87c0-1.43,3-1.43,2.92,0S540.6,225.3,540.64,223.87Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_49-2"
                    data-name="Ellipse 49"
                    className="cls-5"
                    d="M539.68,223.87c0-2.37,4.89-2.37,4.84,0S539.63,226.24,539.68,223.87Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_50-2"
                    data-name="Ellipse 50"
                    className="cls-5"
                    d="M536.64,223.87c-.12-5.34,11-5.34,10.91,0C547.67,229.21,536.52,229.21,536.64,223.87Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_51-2"
                    data-name="Ellipse 51"
                    className="cls-5"
                    d="M530.57,223.87c0-11.38,23-11.37,23.06,0S530.58,235.24,530.57,223.87Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <g id="Group_847-3" data-name="Group 847">
              <g id="Group_840-3" data-name="Group 840">
                <path
                  id="Ellipse_42-3"
                  data-name="Ellipse 42"
                  className="cls-12"
                  d="M276.51,262.24c-34.06-.69-32.74-69.66,1.32-69S310.57,262.86,276.51,262.24Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_43-3"
                  data-name="Ellipse 43"
                  className="cls-11"
                  d="M277,235.82c-7.93,0-7.61-16.53.31-16.2C285.26,219.6,284.94,236.14,277,235.82Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_927-3"
                  data-name="Path 927"
                  className="cls-8"
                  d="M269.67,237.36l-8.2-.15L258,241.64h-.68l-2.7,3.38-5.18-.1"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_44-3"
                  data-name="Ellipse 44"
                  className="cls-13"
                  d="M276.7,252.06c-24-.48-23.08-49.12.94-48.69S300.72,252.5,276.7,252.06Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_839-3" data-name="Group 839">
                  <path
                    id="Path_928-3"
                    data-name="Path 928"
                    className="cls-12"
                    d="M182.44,122.2c73,1.48,70.1,149.19-2.82,147.87"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_45-3"
                    data-name="Ellipse 45"
                    className="cls-14"
                    d="M216.33,275.43c-74-1.5-71.13-151.34,2.86-150C293.19,126.93,290.32,276.77,216.33,275.43Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_843-3" data-name="Group 843">
                <path
                  id="Path_929-3"
                  data-name="Path 929"
                  className="cls-5"
                  d="M415.72,144.2l-20.65-.4-31.5,40.07-1.08,56.33-19.56,24.94"
                  transform="translate(0 16.75)"
                />
                <g id="Group_842-3" data-name="Group 842">
                  <g id="Group_841-3" data-name="Group 841">
                    <path
                      id="Path_931-3"
                      data-name="Path 931"
                      className="cls-5"
                      d="M544.28,116.5l-105.47-2-26,33-53.88-1-7.33-10.1-47.55-.91-45.6-62.79L192.8,71.44,180.69,86.9l-15.21-.29-3.73-5.14-34.41-.65"
                      transform="translate(0 16.75)"
                    />
                  </g>
                  <path
                    id="Path_932-3"
                    data-name="Path 932"
                    className="cls-5"
                    d="M299.16,128.7l-43.08-.82-23,29.2-17.25-.33"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_933-3"
                    data-name="Path 933"
                    className="cls-5"
                    d="M274.17,37.16l-.52,27.61,10.43,14.37-.57,30.19-3.27,4.16-.51,26.65L259.43,166l-.7,36.77,4.89,6.73-.16,8.55-1.66,2.1-.37,19.29"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_846-3" data-name="Group 846">
                <path
                  id="Path_934-3"
                  data-name="Path 934"
                  className="cls-5"
                  d="M295.21,222.27l-26.39-.5-1.3,1.66-2.55-.05"
                  transform="translate(0 16.75)"
                />
                <g id="Group_844-3" data-name="Group 844">
                  <path
                    id="Path_935-3"
                    data-name="Path 935"
                    className="cls-5"
                    d="M291.82,217.54l-7.44-.14-3.14,4h-.59l-2.44,3.11-4.72-.09"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_46-3"
                    data-name="Ellipse 46"
                    className="cls-5"
                    d="M273.41,228.88c-4.41,0-4.23-9.17.17-9C278,219.88,277.81,229.07,273.41,228.88Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_47-3"
                    data-name="Ellipse 47"
                    className="cls-5"
                    d="M273.48,225.23c-.83,0-.8-1.72,0-1.69S274.3,225.26,273.48,225.23Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <g id="Group_845-3" data-name="Group 845">
                  <path
                    id="Ellipse_48-3"
                    data-name="Ellipse 48"
                    className="cls-5"
                    d="M264.94,224.84c-1.43,0-1.38-3,.06-2.92S266.37,224.9,264.94,224.84Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_49-3"
                    data-name="Ellipse 49"
                    className="cls-5"
                    d="M264.92,225.8c-2.37,0-2.27-4.94.09-4.84S267.29,225.9,264.92,225.8Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_50-3"
                    data-name="Ellipse 50"
                    className="cls-5"
                    d="M264.86,228.83c-5.34,0-5.13-11.12.21-10.9C270.41,217.91,270.2,229.05,264.86,228.83Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_51-3"
                    data-name="Ellipse 51"
                    className="cls-5"
                    d="M264.75,234.91c-11.37-.23-10.93-23.26.44-23.06S276.12,235.11,264.75,234.91Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Ellipse_52"
              data-name="Ellipse 52"
              className="cls-8"
              d="M658.73,99c0-11.54,23.38-11.54,23.39,0S658.74,110.51,658.73,99Z"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_936-2"
              data-name="Path 936"
              className="cls-15"
              d="M571.11,108h34.36L623.36,94.5h13.77"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_937-2"
              data-name="Path 937"
              className="cls-5"
              d="M548.34,328.33v-16l-1-.77v-1.53"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_938-2"
              data-name="Path 938"
              className="cls-5"
              d="M540,296.5H523.71l-8.44-6.42h-6.52"
              transform="translate(0 16.75)"
            />
            <g id="Group_853-2" data-name="Group 853">
              <path
                id="Ellipse_53-2"
                data-name="Ellipse 53"
                className="cls-12"
                d="M539.34,357.1c0-16.09,32.6-16.09,32.62,0S539.36,373.19,539.34,357.1Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_852-2" data-name="Group 852">
                <path
                  id="Path_939-2"
                  data-name="Path 939"
                  className="cls-12"
                  d="M511.67,295.65c.05,38.07,77.12,38.05,77.16,0"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_940-2"
                  data-name="Path 940"
                  className="cls-5"
                  d="M546.43,363.64V304.23l3.82-2.85v-5.73"
                  transform="translate(0 16.75)"
                />
                <g id="Group_848-2" data-name="Group 848">
                  <path
                    id="Ellipse_54-2"
                    data-name="Ellipse 54"
                    className="cls-5"
                    d="M546.93,295.65c-.07-3.25,6.71-3.25,6.64,0S546.86,298.9,546.93,295.65Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_55-2"
                    data-name="Ellipse 55"
                    className="cls-5"
                    d="M544.8,295.65c-.12-5.35,11-5.35,10.91,0C555.82,301,544.68,301,544.8,295.65Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <path
                  id="Path_941-2"
                  data-name="Path 941"
                  className="cls-5"
                  d="M511.67,295.65c0,16.1,17.28,29.16,38.58,29.15"
                  transform="translate(0 16.75)"
                />
                <g id="Group_851-2" data-name="Group 851">
                  <path
                    id="Path_942-2"
                    data-name="Path 942"
                    className="cls-5"
                    d="M566.11,383.49V308.57l-14.4-10.88"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_850-2" data-name="Group 850">
                    <path
                      id="Path_943-2"
                      data-name="Path 943"
                      className="cls-5"
                      d="M592.71,501.14V403.63L558.8,378v-5l-26.43-20V313.41"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_944-2"
                      data-name="Path 944"
                      className="cls-5"
                      d="M535.91,355.82V339.08l9.11-6.89v-1.36l7.09-5.35V314.81"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_849-2" data-name="Group 849">
                      <path
                        id="Ellipse_56-2"
                        data-name="Ellipse 56"
                        className="cls-5"
                        d="M542,314.81c-.22-9.91,20.46-9.91,20.24,0C562.45,324.73,541.76,324.73,542,314.81Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_57-2"
                        data-name="Ellipse 57"
                        className="cls-5"
                        d="M550.25,314.81c0-1.81,3.75-1.81,3.71,0S550.21,316.63,550.25,314.81Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_58-2"
                        data-name="Ellipse 58"
                        className="cls-14"
                        d="M513,314.81c0-38.61,78.24-38.61,78.28,0S513,353.42,513,314.81Z"
                        transform="translate(0 16.75)"
                      />
                    </g>
                    <path
                      id="Ellipse_59-2"
                      data-name="Ellipse 59"
                      className="cls-14"
                      d="M528.32,357.69c0-16.36,33.16-16.36,33.18,0S528.34,374.06,528.32,357.69Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_60-2"
                      data-name="Ellipse 60"
                      className="cls-5"
                      d="M539.34,357.1c0-16.09,32.6-16.09,32.62,0S539.36,373.19,539.34,357.1Z"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_945-2"
                  data-name="Path 945"
                  className="cls-5"
                  d="M618,300.11H592.6L583,292.88H562.68l-2.81,2.17h-18L524.22,308.4H499.47L495,305h-5.73l-1.47,1.1h-13"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Path_946-2"
              data-name="Path 946"
              className="cls-5"
              d="M571.4,202.11V171.47l1.91-1.45v-3"
              transform="translate(0 16.75)"
            />
            <g id="Group_867-2" data-name="Group 867">
              <path
                id="Path_947"
                data-name="Path 947"
                className="cls-8"
                d="M543.28,282V264.79l-8.55-6.46V244.56l2.53-1.91V230.5l15.8-11.94V201.77l-4-3v-3.87l1.29-1v-8.8"
                transform="translate(0 16.75)"
              />
              <g id="Group_866-2" data-name="Group 866">
                <g id="Group_864-2" data-name="Group 864">
                  <g id="Group_863-2" data-name="Group 863">
                    <g id="Group_855-2" data-name="Group 855">
                      <path
                        id="Path_948-2"
                        data-name="Path 948"
                        className="cls-5"
                        d="M459.6,501V334.53l71.7-54.18V269.81l55.84-42.24V143.8"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_854-2" data-name="Group 854">
                        <path
                          id="Path_949-2"
                          data-name="Path 949"
                          className="cls-8"
                          d="M579.77,233.47v-35.4L560.49,183.5v-2.85l-15-11.35V146.82"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_950-2"
                          data-name="Path 950"
                          className="cls-8"
                          d="M553.46,175.34V141.59l2.13-1.61v-3.27"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_61-2"
                          data-name="Ellipse 61"
                          className="cls-8"
                          d="M541.54,146.82c-.09-3.86,8-3.86,7.87,0C549.49,150.67,541.45,150.67,541.54,146.82Z"
                          transform="translate(0 16.75)"
                        />
                      </g>
                    </g>
                    <g id="Group_862-2" data-name="Group 862">
                      <g id="Group_856-2" data-name="Group 856">
                        <path
                          id="Path_951-2"
                          data-name="Path 951"
                          className="cls-5"
                          d="M551.71,378.77v-8.16l4-3.06v-6.5l-1.18-.89v-5.74l-7.48-5.65v-7.95l1.91-1.44v-1.83l-.61-.47v-4.16"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_952-2"
                          data-name="Path 952"
                          className="cls-5"
                          d="M553.79,353.78V348.6l3.55-2.72V343.8"
                          transform="translate(0 16.75)"
                        />
                      </g>
                      <g id="Group_861-2" data-name="Group 861">
                        <path
                          id="Path_953-2"
                          data-name="Path 953"
                          className="cls-5"
                          d="M459.66,342.65H479.4l7.36,5.57h15.75l2.19-1.66h13.95l13.66-10.33h19.18l3.49,2.59h4.44l1.07-.8h10.12"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_62-2"
                          data-name="Ellipse 62"
                          className="cls-14"
                          d="M553.57,344.14c-.2-8.87,18.3-8.87,18.11,0C571.87,353,553.37,353,553.57,344.14Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_860-2" data-name="Group 860">
                          <g id="Group_858-2" data-name="Group 858">
                            <g id="Group_857-2" data-name="Group 857">
                              <path
                                id="Path_954-2"
                                data-name="Path 954"
                                className="cls-5"
                                d="M561.33,355.44V341.67l.84-.64v-1.36"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_955-2"
                                data-name="Path 955"
                                className="cls-5"
                                d="M558.86,353.61v-3.86l2.13-1.62v-.3l1.63-1.23v-2.46"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_956-2"
                                data-name="Path 956"
                                className="cls-5"
                                d="M561.78,347.24v-3.7l-.28-.17V343"
                                transform="translate(0 16.75)"
                              />
                            </g>
                            <path
                              id="Ellipse_63-2"
                              data-name="Ellipse 63"
                              className="cls-5"
                              d="M560.26,344.14c0-2.32,4.78-2.32,4.73,0S560.21,346.45,560.26,344.14Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_64-2"
                              data-name="Ellipse 64"
                              className="cls-5"
                              d="M562.17,344.14c0-.44.91-.44.9,0S562.16,344.58,562.17,344.14Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                          <path
                            id="Path_957-2"
                            data-name="Path 957"
                            className="cls-5"
                            d="M565.88,360V342.69l-3.37-2.51"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_859-2" data-name="Group 859">
                            <path
                              id="Ellipse_65-2"
                              data-name="Ellipse 65"
                              className="cls-5"
                              d="M561.39,339.67c0-.77,1.59-.77,1.57,0S561.37,340.45,561.39,339.67Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_66-2"
                              data-name="Ellipse 66"
                              className="cls-5"
                              d="M560.94,339.67c0-1.21,2.5-1.21,2.47,0S560.91,340.89,560.94,339.67Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_67-2"
                              data-name="Ellipse 67"
                              className="cls-5"
                              d="M559.31,339.67c-.07-2.8,5.79-2.8,5.73,0S559.24,342.48,559.31,339.67Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_68-2"
                              data-name="Ellipse 68"
                              className="cls-5"
                              d="M556.16,339.67c-.13-5.89,12.16-5.89,12,0C568.32,345.57,556,345.57,556.16,339.67Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_865-2" data-name="Group 865">
                  <path
                    id="Ellipse_69-2"
                    data-name="Ellipse 69"
                    className="cls-5"
                    d="M544.68,176.23c0-19.2,38.9-19.2,38.92,0S544.7,195.42,544.68,176.23Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_70-2"
                    data-name="Ellipse 70"
                    className="cls-5"
                    d="M560.54,176.23c-.08-3.53,7.28-3.53,7.2,0C567.82,179.75,560.46,179.75,560.54,176.23Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_958-2"
              data-name="Path 958"
              className="cls-5"
              d="M641.69,139.42c0,30.87-33.11,55.88-74,55.89"
              transform="translate(0 16.75)"
            />
            <path
              id="Ellipse_71-2"
              data-name="Ellipse 71"
              className="cls-14"
              d="M604.24,110.74c0-40.5,82.06-40.5,82.1,0S604.28,151.24,604.24,110.74Z"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_959-2"
              data-name="Path 959"
              className="cls-5"
              d="M587.37,141h31.21l16.19-12.24h12.49"
              transform="translate(0 16.75)"
            />
            <g id="Group_892-2" data-name="Group 892">
              <g id="Group_882-2" data-name="Group 882">
                <path
                  id="Ellipse_83-2"
                  data-name="Ellipse 83"
                  className="cls-8"
                  d="M542.38,106.23c-.15-6.88,14.21-6.88,14.06,0C556.59,113.12,542.23,113.12,542.38,106.23Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_881-2" data-name="Group 881">
                  <path
                    id="Path_975-2"
                    data-name="Path 975"
                    className="cls-8"
                    d="M557.45,250.05V124.42l-8-6.07V106.23"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_976-2"
                    data-name="Path 976"
                    className="cls-5"
                    d="M587.2,296.07h-7l-10.52-7.95V277.07l-6.58-4.92"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_84-2"
                    data-name="Ellipse 84"
                    className="cls-12"
                    d="M526,257.23c0-30.91,62.62-30.9,62.65,0S526,288.13,526,257.23Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_977-2"
                    data-name="Path 977"
                    className="cls-5"
                    d="M542.94,238.4v-7.1l.45-.34v-.67"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_85-2"
                    data-name="Ellipse 85"
                    className="cls-14"
                    d="M523.88,232.41c0-17.14,34.73-17.14,34.75,0S523.89,249.55,523.88,232.41Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_978-2"
                    data-name="Path 978"
                    className="cls-5"
                    d="M558.24,250.94V241l-6.86-5.18v-4"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_979-2"
                    data-name="Path 979"
                    className="cls-5"
                    d="M535.07,262.88V229.61l6.35-4.81"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_891-2" data-name="Group 891">
                <g id="Group_890-2" data-name="Group 890">
                  <path
                    id="Path_980-2"
                    data-name="Path 980"
                    className="cls-5"
                    d="M619.14,263.9H574l-18.56,14h-3.6L537.43,288.8H508.75"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_889-2" data-name="Group 889">
                    <path
                      id="Ellipse_86-2"
                      data-name="Ellipse 86"
                      className="cls-14"
                      d="M488.34,280.69c0-21.14,42.83-21.14,42.85,0S488.36,301.82,488.34,280.69Z"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_888-2" data-name="Group 888">
                      <path
                        id="Path_981-2"
                        data-name="Path 981"
                        className="cls-5"
                        d="M513.87,356.55V334.11l15.46-11.69v-9"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_887-2" data-name="Group 887">
                        <g id="Group_883-2" data-name="Group 883">
                          <path
                            id="Path_982-2"
                            data-name="Path 982"
                            className="cls-5"
                            d="M545.13,283h-43L500,281.45h-4.16"
                            transform="translate(0 16.75)"
                          />
                        </g>
                        <path
                          id="Path_983-2"
                          data-name="Path 983"
                          className="cls-5"
                          d="M539.45,287.36H527.31l-4.95-3.74h-1l-3.88-2.93h-7.71"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_984-2"
                          data-name="Path 984"
                          className="cls-5"
                          d="M519.55,282.22H508l-.56.42h-1.13"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_87-2"
                          data-name="Ellipse 87"
                          className="cls-5"
                          d="M504.2,280.69c-.13-5.45,11.25-5.45,11.13,0C515.45,286.14,504.07,286.14,504.2,280.69Z"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_88-2"
                          data-name="Ellipse 88"
                          className="cls-5"
                          d="M508.75,280.69c0-1,2.05-1,2,0S508.73,281.68,508.75,280.69Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_886-2" data-name="Group 886">
                          <path
                            id="Path_985-2"
                            data-name="Path 985"
                            className="cls-5"
                            d="M559.47,274.91H505.26l-7.87,5.95"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_885-2" data-name="Group 885">
                            <path
                              id="Path_986-2"
                              data-name="Path 986"
                              className="cls-5"
                              d="M505.1,501.19V421l17.48-13.17V388L517.35,384V359.22l-32.27-24.43V300.53l8.15-6.16v-7.95l-2.64-1.95v-18"
                              transform="translate(0 16.75)"
                            />
                            <g id="Group_884-2" data-name="Group 884">
                              <path
                                id="Ellipse_89-2"
                                data-name="Ellipse 89"
                                className="cls-5"
                                d="M494.07,281.45c0-1.76,3.64-1.76,3.6,0S494,283.21,494.07,281.45Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_90-2"
                                data-name="Ellipse 90"
                                className="cls-5"
                                d="M492.89,281.45c-.06-2.92,6-2.92,6,0S492.83,284.37,492.89,281.45Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_91-2"
                                data-name="Ellipse 91"
                                className="cls-5"
                                d="M489.12,281.45c-.14-6.61,13.65-6.61,13.5,0C502.77,288.06,489,288.06,489.12,281.45Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_92-2"
                                data-name="Ellipse 92"
                                className="cls-5"
                                d="M481.65,281.45c0-14,28.44-14,28.45,0S481.66,295.49,481.65,281.45Z"
                                transform="translate(0 16.75)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Ellipse_93-2"
                  data-name="Ellipse 93"
                  className="cls-14"
                  d="M546.15,258.38c0-31.35,63.51-31.35,63.54,0S546.18,289.72,546.15,258.38Z"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Ellipse_94-2"
              data-name="Ellipse 94"
              className="cls-11"
              d="M537.94,106.23c0-11.31,22.93-11.31,22.94,0S538,117.55,537.94,106.23Z"
              transform="translate(0 16.75)"
            />
            <g id="Group_896-2" data-name="Group 896">
              <path
                id="Path_987-2"
                data-name="Path 987"
                className="cls-5"
                d="M595.24,254.81V222.68l-17.49-13.22v-2.55l-13.61-10.28v-20.4"
                transform="translate(0 16.75)"
              />
              <path
                id="Ellipse_95-2"
                data-name="Ellipse 95"
                className="cls-5"
                d="M526,257.23c0-30.91,62.62-30.9,62.65,0S526,288.13,526,257.23Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_895-2" data-name="Group 895">
                <g id="Group_894-2" data-name="Group 894">
                  <path
                    id="Path_988-2"
                    data-name="Path 988"
                    className="cls-5"
                    d="M486.18,501l.08-154.52,65-49.13v-9.56l50.67-38.29V173.51"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_893-2" data-name="Group 893">
                    <path
                      id="Path_989-2"
                      data-name="Path 989"
                      className="cls-5"
                      d="M575,269.81V155.91l-7.25-5.48v-11"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_96-2"
                      data-name="Ellipse 96"
                      className="cls-5"
                      d="M561.39,139.42c-.14-6.22,12.84-6.22,12.71,0C574.23,145.65,561.25,145.65,561.39,139.42Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_97-2"
                      data-name="Ellipse 97"
                      className="cls-5"
                      d="M557.34,139.42c-.23-10.18,21-10.18,20.8,0C578.37,149.61,557.11,149.61,557.34,139.42Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_990-2"
                      data-name="Path 990"
                      className="cls-5"
                      d="M537.32,307.84V164.2l27.55-20.87"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_991-2"
                  data-name="Path 991"
                  className="cls-5"
                  d="M562.12,298.79v-15.6l-7.76-5.86V264.88l2.3-1.74v-11L571,241.25V226.08l-3.6-2.76v-3.53l1.18-.85v-8"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
          </g>
          <g id="BG_Lines-3" data-name="BG Lines" className="cls-17">
            <g id="Group_847-4" data-name="Group 847">
              <g id="Group_840-4" data-name="Group 840">
                <path
                  id="Ellipse_42-4"
                  data-name="Ellipse 42"
                  className="cls-12"
                  d="M365.61,423.6c-64.57-1.08-64.56-95.66,0-96.74C430.18,328,430.17,422.52,365.61,423.6Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_43-4"
                  data-name="Ellipse 43"
                  className="cls-11"
                  d="M365.61,386.57c-15.07-.06-15.07-22.62,0-22.68S380.67,386.51,365.61,386.57Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_927-4"
                  data-name="Path 927"
                  className="cls-8"
                  d="M351.85,388.94H336.41l-6.32,6.3h-1.28l-5,4.81h-9.76"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_44-4"
                  data-name="Ellipse 44"
                  className="cls-13"
                  d="M365.61,409.34c-45.54-.76-45.53-67.46,0-68.22C411.14,341.88,411.13,408.58,365.61,409.34Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_839-4" data-name="Group 839">
                  <path
                    id="Path_928-4"
                    data-name="Path 928"
                    className="cls-12"
                    d="M183.53,230c137.62.62,137.53,206.6,0,207.19"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_45-4"
                    data-name="Ellipse 45"
                    className="cls-14"
                    d="M252.81,443.69c-140.29-2.36-140.26-207.85,0-210.19C393.09,235.86,393.07,441.35,252.81,443.69Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_843-4" data-name="Group 843">
                <path
                  id="Path_929-4"
                  data-name="Path 929"
                  className="cls-5"
                  d="M623.37,254.54H584.49l-57.84,57v78.93l-35.92,35.46"
                  transform="translate(0 16.75)"
                />
                <g id="Group_842-4" data-name="Group 842">
                  <g id="Group_841-4" data-name="Group 841">
                    <path
                      id="Path_930-2"
                      data-name="Path 930"
                      className="cls-5"
                      d="M864.27,225.47H652.89l-52.56,51.76H488.49l-15.68-15.36H374.09l-97.2-95.64H140.57L116,190.41H84.41l-7.92-7.8H5"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_931-4"
                      data-name="Path 931"
                      className="cls-5"
                      d="M864.35,212.31H665.77l-47.68,47H516.65l-14.16-13.95H413l-88.08-86.74H201.21l-22.24,22H150.33l-7.2-7.09H78.33"
                      transform="translate(0 16.75)"
                    />
                  </g>
                  <path
                    id="Path_932-4"
                    data-name="Path 932"
                    className="cls-5"
                    d="M403.45,236H322.33l-42.16,41.51H247.69"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_933-4"
                    data-name="Path 933"
                    className="cls-5"
                    d="M353.13,108.4v38.68l20.16,19.86v42.3l-6,5.91v37.34L330,289.2v51.52l9.44,9.3v12l-3,3v27"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_846-4" data-name="Group 846">
                <path
                  id="Path_934-4"
                  data-name="Path 934"
                  className="cls-5"
                  d="M399.37,367.12H349.69l-2.4,2.36h-4.8"
                  transform="translate(0 16.75)"
                />
                <g id="Group_844-4" data-name="Group 844">
                  <path
                    id="Path_935-4"
                    data-name="Path 935"
                    className="cls-5"
                    d="M392.81,360.58h-14l-5.76,5.67h-1.12l-4.48,4.41h-8.88"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_46-4"
                    data-name="Ellipse 46"
                    className="cls-5"
                    d="M358.57,377c-8.31.12-8.31-12.72,0-12.6C366.87,364.24,366.87,377.08,358.57,377Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_47-4"
                    data-name="Ellipse 47"
                    className="cls-5"
                    d="M358.57,371.84a1.18,1.18,0,0,1,0-2.36A1.18,1.18,0,0,1,358.57,371.84Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <g id="Group_845-4" data-name="Group 845">
                  <path
                    id="Ellipse_48-4"
                    data-name="Ellipse 48"
                    className="cls-5"
                    d="M342.49,371.53c-2.7,0-2.7-4.14,0-4.1S345.19,371.57,342.49,371.53Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_49-4"
                    data-name="Ellipse 49"
                    className="cls-5"
                    d="M342.49,372.87c-4.47.06-4.47-6.84,0-6.78S347,372.93,342.49,372.87Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_50-4"
                    data-name="Ellipse 50"
                    className="cls-5"
                    d="M342.49,377.12c-10.07.15-10.07-15.43,0-15.28C352.56,361.69,352.56,377.27,342.49,377.12Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_51-4"
                    data-name="Ellipse 51"
                    className="cls-5"
                    d="M342.49,385.63c-21.56-.36-21.56-31.94,0-32.3C364.05,353.69,364,385.27,342.49,385.63Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Ellipse_52-2"
              data-name="Ellipse 52"
              className="cls-8"
              d="M107.37,206.09c-21.88-.37-21.87-32.41,0-32.77C129.24,173.68,129.24,205.72,107.37,206.09Z"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_936-3"
              data-name="Path 936"
              className="cls-15"
              d="M124.41,328.83V280.69L99,255.64v-19.3"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_937-3"
              data-name="Path 937"
              className="cls-5"
              d="M539.13,360.73H509.05l-1.44,1.42h-2.88"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_938-3"
              data-name="Path 938"
              className="cls-5"
              d="M479.21,372.47v22.77l-12.08,11.82v9.14"
              transform="translate(0 16.75)"
            />
            <g id="Group_853-3" data-name="Group 853">
              <path
                id="Ellipse_53-3"
                data-name="Ellipse 53"
                className="cls-12"
                d="M593.29,373.34c-30.5-.51-30.49-45.18,0-45.69C623.78,328.16,623.78,372.83,593.29,373.34Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_852-3" data-name="Group 852">
                <path
                  id="Path_939-3"
                  data-name="Path 939"
                  className="cls-12"
                  d="M477.61,412.1c71.8-.32,71.77-107.79,0-108.09"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_940-3"
                  data-name="Path 940"
                  className="cls-5"
                  d="M605.61,363.41H493.77l-5.36-5.35h-10.8"
                  transform="translate(0 16.75)"
                />
                <g id="Group_848-3" data-name="Group 848">
                  <path
                    id="Ellipse_54-3"
                    data-name="Ellipse 54"
                    className="cls-5"
                    d="M477.61,362.7c-6.13.09-6.13-9.38,0-9.29C483.73,353.32,483.73,362.79,477.61,362.7Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_55-3"
                    data-name="Ellipse 55"
                    className="cls-5"
                    d="M477.61,365.7c-10.07.14-10.07-15.43,0-15.29C487.68,350.27,487.68,365.84,477.61,365.7Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <path
                  id="Path_941-3"
                  data-name="Path 941"
                  className="cls-5"
                  d="M477.61,412.1c30.31,0,54.89-24.19,54.88-54"
                  transform="translate(0 16.75)"
                />
                <g id="Group_851-3" data-name="Group 851">
                  <path
                    id="Path_942-3"
                    data-name="Path 942"
                    className="cls-5"
                    d="M643,335.84h-141L481.45,356"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_850-3" data-name="Group 850">
                    <path
                      id="Path_943-3"
                      data-name="Path 943"
                      className="cls-5"
                      d="M864.43,298.58H680.89l-48.32,47.5h-9.36l-37.6,37H511.05"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_944-3"
                      data-name="Path 944"
                      className="cls-5"
                      d="M590.89,378.15H559.37l-13-12.77h-2.56l-10.08-9.92H513.69"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_849-3" data-name="Group 849">
                      <path
                        id="Ellipse_56-3"
                        data-name="Ellipse 56"
                        className="cls-5"
                        d="M513.69,369.64c-18.93-.32-18.93-28.05,0-28.36C532.62,341.59,532.61,369.32,513.69,369.64Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_57-3"
                        data-name="Ellipse 57"
                        className="cls-5"
                        d="M513.69,358.06c-3.43.05-3.43-5.25,0-5.2S517.11,358.11,513.69,358.06Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_58-3"
                        data-name="Ellipse 58"
                        className="cls-14"
                        d="M513.69,410.29c-73.19-1.23-73.18-108.44,0-109.66C586.88,301.86,586.87,409.07,513.69,410.29Z"
                        transform="translate(0 16.75)"
                      />
                    </g>
                    <path
                      id="Ellipse_59-3"
                      data-name="Ellipse 59"
                      className="cls-14"
                      d="M594.41,388.78c-31-.52-31-46,0-46.48C625.43,342.82,625.42,388.26,594.41,388.78Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_60-3"
                      data-name="Ellipse 60"
                      className="cls-5"
                      d="M593.29,373.34c-30.5-.51-30.49-45.18,0-45.69C623.78,328.16,623.78,372.83,593.29,373.34Z"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <g id="Group_851-4" data-name="Group 851">
                  <path
                    id="Path_942-4"
                    data-name="Path 942"
                    className="cls-5"
                    d="M355,37.26h-141L193.45,57.43"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_850-4" data-name="Group 850">
                    <path
                      id="Path_943-4"
                      data-name="Path 943"
                      className="cls-5"
                      d="M576.43,0H392.89L344.57,47.5h-9.36l-37.6,37H223.05"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_944-4"
                      data-name="Path 944"
                      className="cls-5"
                      d="M302.89,79.57H271.37l-13-12.76h-2.56l-10.08-9.93H225.69"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_849-4" data-name="Group 849">
                      <path
                        id="Ellipse_56-4"
                        data-name="Ellipse 56"
                        className="cls-5"
                        d="M225.69,71.06c-18.93-.32-18.93-28.05,0-28.36C244.62,43,244.61,70.74,225.69,71.06Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_57-4"
                        data-name="Ellipse 57"
                        className="cls-5"
                        d="M225.69,59.48c-3.43.05-3.43-5.25,0-5.2S229.11,59.53,225.69,59.48Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_58-4"
                        data-name="Ellipse 58"
                        className="cls-14"
                        d="M225.69,111.71c-73.19-1.23-73.18-108.44,0-109.66C298.88,3.28,298.87,110.49,225.69,111.71Z"
                        transform="translate(0 16.75)"
                      />
                    </g>
                    <path
                      id="Ellipse_59-4"
                      data-name="Ellipse 59"
                      className="cls-14"
                      d="M306.41,90.2c-31-.52-31-46,0-46.48C337.43,44.24,337.42,89.69,306.41,90.2Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_60-4"
                      data-name="Ellipse 60"
                      className="cls-5"
                      d="M305.29,74.76c-30.5-.51-30.49-45.18,0-45.69C335.78,29.58,335.78,74.25,305.29,74.76Z"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_945-3"
                  data-name="Path 945"
                  className="cls-5"
                  d="M486,263.13v35.6l-13.6,13.4v28.52l4.08,3.93v25.21l25.12,24.74v34.66l-6.4,6.31v8l2.08,2.05v18.2"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Path_946-3"
              data-name="Path 946"
              className="cls-5"
              d="M301.53,328.43H243.85l-2.72-2.67h-5.6"
              transform="translate(0 16.75)"
            />
            <g id="Group_867-3" data-name="Group 867">
              <path
                id="Path_947-2"
                data-name="Path 947"
                className="cls-8"
                d="M451.93,367.82h-32.4l-12.16,12H381.45l-3.6-3.55H355l-22.48-22.13h-31.6l-5.68,5.59h-7.28l-1.84-1.81H269.53"
                transform="translate(0 16.75)"
              />
              <g id="Group_866-3" data-name="Group 866">
                <g id="Group_864-3" data-name="Group 864">
                  <g id="Group_863-3" data-name="Group 863">
                    <g id="Group_855-3" data-name="Group 855">
                      <path
                        id="Path_948-3"
                        data-name="Path 948"
                        className="cls-5"
                        d="M864.15,485.05H550.81l-102-100.44H429l-79.52-78.23H191.77"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_854-3" data-name="Group 854">
                        <path
                          id="Path_949-3"
                          data-name="Path 949"
                          className="cls-8"
                          d="M360.57,316.7H293.93l-27.44,27h-5.36l-21.36,21H197.45"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_950-3"
                          data-name="Path 950"
                          className="cls-8"
                          d="M251.13,353.57H187.61l-3-3h-6.16"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_61-3"
                          data-name="Ellipse 61"
                          className="cls-8"
                          d="M197.45,370.27c-7.27.1-7.27-11.14,0-11C204.71,359.13,204.71,370.37,197.45,370.27Z"
                          transform="translate(0 16.75)"
                        />
                      </g>
                    </g>
                    <g id="Group_862-3" data-name="Group 862">
                      <g id="Group_856-3" data-name="Group 856">
                        <path
                          id="Path_951-3"
                          data-name="Path 951"
                          className="cls-5"
                          d="M634.09,356H618.73L613,350.34H600.73L599.05,352h-10.8l-10.64,10.48h-15l-2.72-2.68h-3.44l-.88.87h-7.84"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_952-3"
                          data-name="Path 952"
                          className="cls-5"
                          d="M587.05,353.09h-9.76l-5.12-5h-3.92"
                          transform="translate(0 16.75)"
                        />
                      </g>
                      <g id="Group_861-3" data-name="Group 861">
                        <path
                          id="Path_953-3"
                          data-name="Path 953"
                          className="cls-5"
                          d="M566.09,485V457.32L576.57,447V424.94l-3.12-3.07V402.33L554,383.19V356.32l4.88-4.88v-6.23l-1.52-1.49V329.54"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_62-3"
                          data-name="Ellipse 62"
                          className="cls-14"
                          d="M568.89,353.41c-16.85-.08-16.85-25.3,0-25.37S585.73,353.34,568.89,353.41Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_860-3" data-name="Group 860">
                          <g id="Group_858-3" data-name="Group 858">
                            <g id="Group_857-3" data-name="Group 857">
                              <path
                                id="Path_954-3"
                                data-name="Path 954"
                                className="cls-5"
                                d="M590.17,342.54H564.25l-1.2-1.19h-2.56"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_955-3"
                                data-name="Path 955"
                                className="cls-5"
                                d="M586.73,346h-7.28l-3-3h-.56l-2.32-2.29h-4.64"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_956-3"
                                data-name="Path 956"
                                className="cls-5"
                                d="M574.73,341.91h-7l-.32.39h-.64"
                                transform="translate(0 16.75)"
                              />
                            </g>
                            <path
                              id="Ellipse_63-3"
                              data-name="Ellipse 63"
                              className="cls-5"
                              d="M568.89,344c-4.36.07-4.36-6.68,0-6.61S573.25,344.1,568.89,344Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_64-3"
                              data-name="Ellipse 64"
                              className="cls-5"
                              d="M568.89,341.35a.63.63,0,0,1,0-1.26A.63.63,0,0,1,568.89,341.35Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                          <path
                            id="Path_957-3"
                            data-name="Path 957"
                            className="cls-5"
                            d="M598.81,336.16H566.17l-4.72,4.72"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_859-3" data-name="Group 859">
                            <path
                              id="Ellipse_65-3"
                              data-name="Ellipse 65"
                              className="cls-5"
                              d="M560.49,342.46a1.11,1.11,0,0,1,0-2.21A1.11,1.11,0,0,1,560.49,342.46Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_66-3"
                              data-name="Ellipse 66"
                              className="cls-5"
                              d="M560.49,343.09a1.74,1.74,0,0,1,0-3.47A1.74,1.74,0,0,1,560.49,343.09Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_67-3"
                              data-name="Ellipse 67"
                              className="cls-5"
                              d="M560.49,345.37c-5.3.08-5.3-8.11,0-8C565.78,337.26,565.78,345.45,560.49,345.37Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_68-3"
                              data-name="Ellipse 68"
                              className="cls-5"
                              d="M560.49,349.78c-11.11.16-11.11-17,0-16.85C571.59,332.77,571.59,350,560.49,349.78Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_865-3" data-name="Group 865">
                  <path
                    id="Ellipse_69-3"
                    data-name="Ellipse 69"
                    className="cls-5"
                    d="M252.81,365.86c-36.39-.62-36.38-53.91,0-54.52C289.19,312,289.19,365.25,252.81,365.86Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_70-3"
                    data-name="Ellipse 70"
                    className="cls-5"
                    d="M252.81,343.64c-6.65.09-6.65-10.18,0-10.08C259.45,333.46,259.45,343.74,252.81,343.64Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_958-3"
              data-name="Path 958"
              className="cls-5"
              d="M183.53,230c58.09,0,105.18,46.39,105.2,103.6"
              transform="translate(0 16.75)"
            />
            <path
              id="Ellipse_71-3"
              data-name="Ellipse 71"
              className="cls-14"
              d="M129.53,282.43c-76.77-1.29-76.76-113.74,0-115C206.29,168.7,206.28,281.15,129.53,282.43Z"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_959-3"
              data-name="Path 959"
              className="cls-5"
              d="M186.57,306.06V262.34l-23-22.69V222.16"
              transform="translate(0 16.75)"
            />
            <g id="Group_892-3" data-name="Group 892">
              <g id="Group_882-3" data-name="Group 882">
                <path
                  id="Ellipse_83-3"
                  data-name="Ellipse 83"
                  className="cls-8"
                  d="M121.05,369.09c-13.08-.06-13.08-19.64,0-19.7S134.12,369,121.05,369.09Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_881-3" data-name="Group 881">
                  <path
                    id="Path_975-3"
                    data-name="Path 975"
                    className="cls-8"
                    d="M391.77,348H155.29l-11.44,11.27h-22.8"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_976-3"
                    data-name="Path 976"
                    className="cls-5"
                    d="M478.41,306.3v9.85l-15,14.73h-20.8l-9.28,9.21"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_84-3"
                    data-name="Ellipse 84"
                    className="cls-12"
                    d="M405.29,392c-58.58-1-58.57-86.78,0-87.76C463.86,305.23,463.85,391,405.29,392Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_977-3"
                    data-name="Path 977"
                    className="cls-5"
                    d="M369.85,368.3H356.49l-.64-.63h-1.28"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_85-3"
                    data-name="Ellipse 85"
                    className="cls-14"
                    d="M358.57,395c-32.5-.54-32.49-48.14,0-48.68C391.06,346.86,391.06,394.46,358.57,395Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_978-3"
                    data-name="Path 978"
                    className="cls-5"
                    d="M393.45,346.87h-18.8l-9.76,9.61h-7.52"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_979-3"
                    data-name="Path 979"
                    className="cls-5"
                    d="M415.93,379.33H353.29l-9-8.91"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_891-3" data-name="Group 891">
                <g id="Group_890-3" data-name="Group 890">
                  <path
                    id="Path_980-3"
                    data-name="Path 980"
                    className="cls-5"
                    d="M417.85,261.55v63.18l26.4,26v5L464.73,376V416.2"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_889-3" data-name="Group 889">
                    <path
                      id="Ellipse_86-3"
                      data-name="Ellipse 86"
                      className="cls-14"
                      d="M449.45,444.79c-40.07-.67-40.06-59.36,0-60C489.51,385.44,489.51,444.13,449.45,444.79Z"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_888-3" data-name="Group 888">
                      <path
                        id="Path_981-3"
                        data-name="Path 981"
                        className="cls-5"
                        d="M592.25,409H550l-22-21.67h-17"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_887-3" data-name="Group 887">
                        <g id="Group_883-3" data-name="Group 883">
                          <path
                            id="Path_982-3"
                            data-name="Path 982"
                            className="cls-5"
                            d="M453.85,365.23v60.26l-3,2.92v5.83"
                            transform="translate(0 16.75)"
                          />
                        </g>
                        <path
                          id="Path_983-3"
                          data-name="Path 983"
                          className="cls-5"
                          d="M462,373.18v17l-7,6.93v1.42L449.45,404v10.8"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_984-3"
                          data-name="Path 984"
                          className="cls-5"
                          d="M452.33,401.07v16.15l.8.79v1.57"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_87-3"
                          data-name="Ellipse 87"
                          className="cls-5"
                          d="M449.45,422.58c-10.28.14-10.28-15.75,0-15.6C459.72,406.83,459.72,422.73,449.45,422.58Z"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_88-3"
                          data-name="Ellipse 88"
                          className="cls-5"
                          d="M449.45,416.2a1.42,1.42,0,0,1,0-2.84A1.42,1.42,0,0,1,449.45,416.2Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_886-3" data-name="Group 886">
                          <path
                            id="Path_985-3"
                            data-name="Path 985"
                            className="cls-5"
                            d="M438.57,345.14v75.94l11.2,11"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_885-3" data-name="Group 885">
                            <path
                              id="Path_986-3"
                              data-name="Path 986"
                              className="cls-5"
                              d="M864.54,421.32H713.61l-24.8-24.5H651.37l-7.44,7.32H597.29l-46,45.22H486.81l-11.6-11.42h-15l-3.68,3.7H422.73"
                              transform="translate(0 16.75)"
                            />
                            <g id="Group_884-3" data-name="Group 884">
                              <path
                                id="Ellipse_89-3"
                                data-name="Ellipse 89"
                                className="cls-5"
                                d="M450.89,436.76c-3.32.05-3.32-5.09,0-5S454.21,436.81,450.89,436.76Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_90-3"
                                data-name="Ellipse 90"
                                className="cls-5"
                                d="M450.89,438.41c-5.5.08-5.5-8.43,0-8.35C456.39,430,456.39,438.49,450.89,438.41Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_91-3"
                                data-name="Ellipse 91"
                                className="cls-5"
                                d="M450.89,443.69c-12.56-.06-12.56-18.85,0-18.91S463.44,443.64,450.89,443.69Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_92-3"
                                data-name="Ellipse 92"
                                className="cls-5"
                                d="M450.89,454.17c-26.61-.45-26.6-39.42,0-39.86C477.49,414.75,477.49,453.72,450.89,454.17Z"
                                transform="translate(0 16.75)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Ellipse_93-3"
                  data-name="Ellipse 93"
                  className="cls-14"
                  d="M407.45,363.81c-59.42-1-59.41-88,0-89C466.86,275.78,466.85,362.82,407.45,363.81Z"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <g id="Group_892-4" data-name="Group 892">
              <g id="Group_882-4" data-name="Group 882">
                <path
                  id="Ellipse_83-4"
                  data-name="Ellipse 83"
                  className="cls-8"
                  d="M189.89,60.61c-.12-6.18,12.2-6.18,12.07,0C202.08,66.8,189.77,66.8,189.89,60.61Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_881-4" data-name="Group 881">
                  <path
                    id="Path_975-4"
                    data-name="Path 975"
                    className="cls-8"
                    d="M202.83,189.81V77l-6.9-5.45V60.61"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_976-4"
                    data-name="Path 976"
                    className="cls-5"
                    d="M228.36,231.15h-6l-9-7.14v-9.92l-5.65-4.43"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_84-4"
                    data-name="Ellipse 84"
                    className="cls-12"
                    d="M175.85,196.26c.06-27.77,53.7-27.77,53.76,0S175.91,224,175.85,196.26Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_977-4"
                    data-name="Path 977"
                    className="cls-5"
                    d="M190.38,179.35V173l.38-.3v-.62"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_85-4"
                    data-name="Ellipse 85"
                    className="cls-14"
                    d="M174,174c0-15.4,29.79-15.4,29.82,0S174.05,189.37,174,174Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_978-4"
                    data-name="Path 978"
                    className="cls-5"
                    d="M203.5,190.61v-9L197.62,177v-3.59"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_979-4"
                    data-name="Path 979"
                    className="cls-5"
                    d="M183.62,201.34v-29.9l5.45-4.31"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_891-4" data-name="Group 891">
                <g id="Group_890-4" data-name="Group 890">
                  <path
                    id="Path_980-4"
                    data-name="Path 980"
                    className="cls-5"
                    d="M255.77,202.25H217.06l-15.92,12.6h-3.09l-12.4,9.78H161"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_889-4" data-name="Group 889">
                    <path
                      id="Ellipse_86-4"
                      data-name="Ellipse 86"
                      className="cls-14"
                      d="M143.52,217.33c0-19,36.73-19,36.77,0S143.56,236.33,143.52,217.33Z"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_888-4" data-name="Group 888">
                      <path
                        id="Path_981-4"
                        data-name="Path 981"
                        className="cls-5"
                        d="M165.43,285.48V265.32l13.27-10.5v-8.09"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_887-4" data-name="Group 887">
                        <g id="Group_883-4" data-name="Group 883">
                          <path
                            id="Path_982-4"
                            data-name="Path 982"
                            className="cls-5"
                            d="M192.26,219.43H155.34L153.55,218H150"
                            transform="translate(0 16.75)"
                          />
                        </g>
                        <path
                          id="Path_983-4"
                          data-name="Path 983"
                          className="cls-5"
                          d="M187.38,223.33H177L172.71,220h-.87l-3.32-2.64H161.9"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_984-4"
                          data-name="Path 984"
                          className="cls-5"
                          d="M170.3,218.71h-9.89l-.48.38h-1"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_87-4"
                          data-name="Ellipse 87"
                          className="cls-5"
                          d="M157.13,217.33c-.1-4.9,9.65-4.9,9.55,0C166.78,222.23,157,222.23,157.13,217.33Z"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_88-4"
                          data-name="Ellipse 88"
                          className="cls-5"
                          d="M161,217.33c0-.89,1.76-.89,1.74,0S161,218.22,161,217.33Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_886-4" data-name="Group 886">
                          <path
                            id="Path_985-4"
                            data-name="Path 985"
                            className="cls-5"
                            d="M204.56,212.14H158l-6.75,5.35"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_885-4" data-name="Group 885">
                            <path
                              id="Path_986-4"
                              data-name="Path 986"
                              className="cls-5"
                              d="M157.9,415.42v-72l15-11.84V313.69l-4.49-3.55V287.89l-27.7-22V235.16l7-5.53v-7.14l-2.27-1.76V204.58"
                              transform="translate(0 16.75)"
                            />
                            <g id="Group_884-4" data-name="Group 884">
                              <path
                                id="Ellipse_89-4"
                                data-name="Ellipse 89"
                                className="cls-5"
                                d="M148.44,218c0-1.58,3.12-1.58,3.09,0S148.41,219.6,148.44,218Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_90-4"
                                data-name="Ellipse 90"
                                className="cls-5"
                                d="M147.43,218c-.06-2.62,5.17-2.62,5.11,0S147.37,220.64,147.43,218Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_91-4"
                                data-name="Ellipse 91"
                                className="cls-5"
                                d="M144.19,218c-.12-5.94,11.71-5.94,11.58,0C155.9,224,144.07,224,144.19,218Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_92-4"
                                data-name="Ellipse 92"
                                className="cls-5"
                                d="M137.77,218c0-12.61,24.4-12.61,24.42,0S137.8,230.63,137.77,218Z"
                                transform="translate(0 16.75)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Ellipse_93-4"
                  data-name="Ellipse 93"
                  className="cls-14"
                  d="M193.13,197.29c.06-28.17,54.47-28.17,54.53,0S193.19,225.46,193.13,197.29Z"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Ellipse_94-3"
              data-name="Ellipse 94"
              className="cls-11"
              d="M121.05,375.31c-21.46-.36-21.45-31.79,0-32.14C142.5,343.53,142.5,375,121.05,375.31Z"
              transform="translate(0 16.75)"
            />
            <g id="Group_896-3" data-name="Group 896">
              <path
                id="Path_987-3"
                data-name="Path 987"
                className="cls-5"
                d="M400.73,295H340.25l-24.88,24.5h-4.8L291.21,338.6h-38.4"
                transform="translate(0 16.75)"
              />
              <path
                id="Ellipse_95-3"
                data-name="Ellipse 95"
                className="cls-5"
                d="M405.29,392c-58.58-1-58.57-86.78,0-87.76C463.86,305.23,463.85,391,405.29,392Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_895-3" data-name="Group 895">
                <g id="Group_894-3" data-name="Group 894">
                  <path
                    id="Path_988-3"
                    data-name="Path 988"
                    className="cls-5"
                    d="M864.08,447.82l-290.87-.11-92.48-91.07h-18l-72.08-71h-143"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_893-3" data-name="Group 893">
                    <path
                      id="Path_989-3"
                      data-name="Path 989"
                      className="cls-5"
                      d="M429,323.39H214.57l-10.32,10.17H183.53"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_96-3"
                      data-name="Ellipse 96"
                      className="cls-5"
                      d="M183.53,342.46c-11.73.17-11.73-18,0-17.81C195.26,324.48,195.26,342.63,183.53,342.46Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_97-3"
                      data-name="Ellipse 97"
                      className="cls-5"
                      d="M183.53,348.13c-19.46-.33-19.45-28.82,0-29.15C203,319.31,203,347.81,183.53,348.13Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_990-3"
                      data-name="Path 990"
                      className="cls-5"
                      d="M500.57,376.18H230.17l-39.28-38.61"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_991-3"
                  data-name="Path 991"
                  className="cls-5"
                  d="M483.53,341.43H454.17l-11,10.88H419.69l-3.28-3.23h-20.8L375.21,329H346.65l-5.2,5h-6.64l-1.6-1.66h-15"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
          </g>
          <g id="BG_Lines-4" data-name="BG Lines" className="cls-10">
            <g id="Group_847-5" data-name="Group 847">
              <g id="Group_840-5" data-name="Group 840">
                <path
                  id="Ellipse_42-5"
                  data-name="Ellipse 42"
                  className="cls-12"
                  d="M959.43,391.15c0,32.72-52.9,32.71-52.92,0S959.4,358.44,959.43,391.15Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_43-5"
                  data-name="Ellipse 43"
                  className="cls-11"
                  d="M939.17,391.15c.14,7.62-12.54,7.62-12.41,0C926.63,383.54,939.31,383.54,939.17,391.15Z"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_927-5"
                  data-name="Path 927"
                  className="cls-8"
                  d="M940.47,398.17v7.88l3.44,3.22v.66l2.63,2.53v5"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Ellipse_44-5"
                  data-name="Ellipse 44"
                  className="cls-13"
                  d="M951.63,391.15c0,23.07-37.3,23.07-37.32,0S951.61,368.09,951.63,391.15Z"
                  transform="translate(0 16.75)"
                />
                <g id="Group_839-5" data-name="Group 839">
                  <path
                    id="Path_928-5"
                    data-name="Path 928"
                    className="cls-12"
                    d="M853.5,484c.07-70.08,113.29-70,113.34,0"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_45-5"
                    data-name="Ellipse 45"
                    className="cls-14"
                    d="M970.42,448.7c-.07,71.07-114.93,71.06-115,0S970.36,377.63,970.42,448.7Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_843-5" data-name="Group 843">
                <path
                  id="Path_929-5"
                  data-name="Path 929"
                  className="cls-5"
                  d="M867,259.66v19.83L898.1,309h43.19l19.39,18.33"
                  transform="translate(0 16.75)"
                />
                <g id="Group_842-5" data-name="Group 842">
                  <g id="Group_841-5" data-name="Group 841">
                    <path
                      id="Path_930-3"
                      data-name="Path 930"
                      className="cls-5"
                      d="M851,136.77v95.91l28.32,23.85v50.75L871,314.39v44.8l-52.31,44.1v61.85l13.23,11.15v14.34l-4.27,3.59.22-100.64"
                      transform="translate(0 16.75)"
                    />
                  </g>
                  <path
                    id="Path_932-5"
                    data-name="Path 932"
                    className="cls-5"
                    d="M856.77,371.85v41.38l22.72,21.51v16.57"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_933-5"
                    data-name="Path 933"
                    className="cls-5"
                    d="M787,397.52h21.16L819,387.24h23.15l3.23,3.06h20.42l20.09,19h28.18l5.09-4.81h6.55l1.64,1.55h14.78"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_846-5" data-name="Group 846">
                <path
                  id="Path_934-5"
                  data-name="Path 934"
                  className="cls-5"
                  d="M928.53,373.93v25.34l1.29,1.23V403"
                  transform="translate(0 16.75)"
                />
                <g id="Group_844-5" data-name="Group 844">
                  <path
                    id="Path_935-5"
                    data-name="Path 935"
                    className="cls-5"
                    d="M925,377.28v7.14l3.1,2.94v.57l2.42,2.28v4.53"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_46-5"
                    data-name="Ellipse 46"
                    className="cls-5"
                    d="M933.92,394.74c.07,4.24-7,4.24-6.9,0S934,390.51,933.92,394.74Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_47-5"
                    data-name="Ellipse 47"
                    className="cls-5"
                    d="M931.11,394.74c0,.8-1.3.8-1.29,0S931.13,394,931.11,394.74Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <g id="Group_845-5" data-name="Group 845">
                  <path
                    id="Ellipse_48-5"
                    data-name="Ellipse 48"
                    className="cls-5"
                    d="M930.94,403c0,1.37-2.26,1.37-2.24,0S931,401.57,930.94,403Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_49-5"
                    data-name="Ellipse 49"
                    className="cls-5"
                    d="M931.68,403c0,2.27-3.75,2.27-3.71,0S931.72,400.67,931.68,403Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_50-5"
                    data-name="Ellipse 50"
                    className="cls-5"
                    d="M934,403c.09,5.13-8.45,5.13-8.36,0C925.55,397.82,934.09,397.82,934,403Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_51-5"
                    data-name="Ellipse 51"
                    className="cls-5"
                    d="M938.66,403c0,10.92-17.66,10.92-17.67,0S938.65,392,938.66,403Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_937-4"
              data-name="Path 937"
              className="cls-5"
              d="M925,302.63V318l.77.73v1.47"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_938-4"
              data-name="Path 938"
              className="cls-5"
              d="M931.46,333.2h12.45l6.47,6.16h5"
              transform="translate(0 16.75)"
            />
            <g id="Group_853-4" data-name="Group 853">
              <path
                id="Ellipse_53-4"
                data-name="Ellipse 53"
                className="cls-12"
                d="M931.93,275c0,15.45-25,15.45-25,0S931.92,259.56,931.93,275Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_852-4" data-name="Group 852">
                <path
                  id="Path_939-4"
                  data-name="Path 939"
                  className="cls-12"
                  d="M953.14,334c0-36.57-59.1-36.55-59.13,0"
                  transform="translate(0 16.75)"
                />
                <path
                  id="Path_940-4"
                  data-name="Path 940"
                  className="cls-5"
                  d="M926.5,268.72v57l-2.93,2.74V334"
                  transform="translate(0 16.75)"
                />
                <g id="Group_848-4" data-name="Group 848">
                  <path
                    id="Ellipse_54-4"
                    data-name="Ellipse 54"
                    className="cls-5"
                    d="M926.12,334c0,3.12-5.15,3.12-5.09,0S926.17,330.9,926.12,334Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_55-4"
                    data-name="Ellipse 55"
                    className="cls-5"
                    d="M927.75,334c.09,5.13-8.45,5.13-8.36,0C919.3,328.89,927.84,328.89,927.75,334Z"
                    transform="translate(0 16.75)"
                  />
                </g>
                <path
                  id="Path_941-4"
                  data-name="Path 941"
                  className="cls-5"
                  d="M953.14,334c0-15.46-13.24-28-29.57-28"
                  transform="translate(0 16.75)"
                />
                <g id="Group_851-5" data-name="Group 851">
                  <path
                    id="Path_942-5"
                    data-name="Path 942"
                    className="cls-5"
                    d="M911.42,249.66v72l11,10.45"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_850-5" data-name="Group 850">
                    <path
                      id="Path_943-5"
                      data-name="Path 943"
                      className="cls-5"
                      d="M891,136.68v93.64L917,255v4.77l20.26,19.18v38"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_944-5"
                      data-name="Path 944"
                      className="cls-5"
                      d="M934.56,276.23v16.08l-7,6.61v1.31l-5.43,5.14v10.24"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_849-5" data-name="Group 849">
                      <path
                        id="Ellipse_56-5"
                        data-name="Ellipse 56"
                        className="cls-5"
                        d="M847.14,315.61c.17,9.52-15.68,9.52-15.51,0C831.46,306.09,847.31,306.09,847.14,315.61Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_57-5"
                        data-name="Ellipse 57"
                        className="cls-5"
                        d="M840.81,315.61c0,1.75-2.88,1.75-2.85,0S840.84,313.87,840.81,315.61Z"
                        transform="translate(0 16.75)"
                      />
                      <path
                        id="Ellipse_58-5"
                        data-name="Ellipse 58"
                        className="cls-14"
                        d="M869.38,315.61c0,37.09-60,37.08-60,0S869.35,278.53,869.38,315.61Z"
                        transform="translate(0 16.75)"
                      />
                    </g>
                    <path
                      id="Ellipse_59-5"
                      data-name="Ellipse 59"
                      className="cls-14"
                      d="M940.38,274.43c0,15.72-25.41,15.72-25.43,0S940.37,258.72,940.38,274.43Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_60-5"
                      data-name="Ellipse 60"
                      className="cls-5"
                      d="M931.93,275c0,15.45-25,15.45-25,0S931.92,259.56,931.93,275Z"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_945-4"
                  data-name="Path 945"
                  className="cls-5"
                  d="M871.64,329.73h19.48l7.33,6.94h15.6l2.15-2.08H930l13.54-12.81h19l3.45,3.26h4.39l1.12-1.06h10"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <path
              id="Path_946-4"
              data-name="Path 946"
              className="cls-5"
              d="M907.37,423.84v29.43l-1.47,1.39v2.85"
              transform="translate(0 16.75)"
            />
            <g id="Group_867-4" data-name="Group 867">
              <path
                id="Path_947-3"
                data-name="Path 947"
                className="cls-8"
                d="M928.92,347.12v16.53l6.55,6.2v13.22l-1.94,1.84v11.67l-12.11,11.47v16.12l3.06,2.9v3.71l-1,.94v8.45"
                transform="translate(0 16.75)"
              />
              <g id="Group_866-4" data-name="Group 866">
                <g id="Group_864-4" data-name="Group 864">
                  <g id="Group_863-4" data-name="Group 863">
                    <g id="Group_855-4" data-name="Group 855">
                      <g id="Group_854-4" data-name="Group 854">
                        <path
                          id="Path_949-4"
                          data-name="Path 949"
                          className="cls-8"
                          d="M901,393.72v34l14.78,14v2.73l11.51,10.9v21.59"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_950-4"
                          data-name="Path 950"
                          className="cls-8"
                          d="M921.12,449.55V482l-1.64,1.55v3.14"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_61-4"
                          data-name="Ellipse 61"
                          className="cls-8"
                          d="M930.25,476.94c.07,3.7-6.1,3.7-6,0S930.32,473.24,930.25,476.94Z"
                          transform="translate(0 16.75)"
                        />
                      </g>
                    </g>
                    <g id="Group_862-4" data-name="Group 862">
                      <g id="Group_856-4" data-name="Group 856">
                        <path
                          id="Path_951-4"
                          data-name="Path 951"
                          className="cls-5"
                          d="M922.45,254.19V262l-3.1,2.94v6.24l.9.86v5.51L926,283v7.64L924.52,292v1.76l.48.45v4"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_952-4"
                          data-name="Path 952"
                          className="cls-5"
                          d="M920.86,278.19v5l-2.72,2.61v2"
                          transform="translate(0 16.75)"
                        />
                      </g>
                      <g id="Group_861-4" data-name="Group 861">
                        <path
                          id="Path_953-4"
                          data-name="Path 953"
                          className="cls-5"
                          d="M972.23,283.54H960.16l-1.68,1.59H947.79L937.32,295h-14.7L920,292.55h-3.4l-.82.78H908"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_953-5"
                          data-name="Path 953"
                          className="cls-5"
                          d="M993,288.88"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_62-4"
                          data-name="Ellipse 62"
                          className="cls-14"
                          d="M921,287.45c.15,8.52-14,8.52-13.88,0C907,278.94,921.18,278.94,921,287.45Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_860-4" data-name="Group 860">
                          <g id="Group_858-4" data-name="Group 858">
                            <g id="Group_857-4" data-name="Group 857">
                              <path
                                id="Path_954-4"
                                data-name="Path 954"
                                className="cls-5"
                                d="M915.08,276.6v13.22l-.64.61v1.31"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_955-4"
                                data-name="Path 955"
                                className="cls-5"
                                d="M917,278.35v3.72l-1.64,1.55v.28l-1.25,1.19v2.36"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Path_956-4"
                                data-name="Path 956"
                                className="cls-5"
                                d="M914.74,284.47V288l.21.17v.32"
                                transform="translate(0 16.75)"
                              />
                            </g>
                            <path
                              id="Ellipse_63-4"
                              data-name="Ellipse 63"
                              className="cls-5"
                              d="M915.9,287.45c0,2.22-3.66,2.22-3.62,0S915.94,285.23,915.9,287.45Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_64-4"
                              data-name="Ellipse 64"
                              className="cls-5"
                              d="M914.44,287.45c0,.43-.7.43-.69,0S914.44,287,914.44,287.45Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                          <path
                            id="Path_957-4"
                            data-name="Path 957"
                            className="cls-5"
                            d="M911.59,272.19v16.65l2.59,2.41"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_859-4" data-name="Group 859">
                            <path
                              id="Ellipse_65-4"
                              data-name="Ellipse 65"
                              className="cls-5"
                              d="M915,291.74a.61.61,0,0,1-1.21,0A.61.61,0,0,1,915,291.74Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_66-4"
                              data-name="Ellipse 66"
                              className="cls-5"
                              d="M915.38,291.74c0,1.16-1.91,1.16-1.89,0S915.41,290.57,915.38,291.74Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_67-4"
                              data-name="Ellipse 67"
                              className="cls-5"
                              d="M916.63,291.74c0,2.7-4.44,2.7-4.39,0S916.68,289,916.63,291.74Z"
                              transform="translate(0 16.75)"
                            />
                            <path
                              id="Ellipse_68-4"
                              data-name="Ellipse 68"
                              className="cls-5"
                              d="M919.05,291.74c.1,5.66-9.33,5.66-9.22,0C909.73,286.08,919.15,286.08,919.05,291.74Z"
                              transform="translate(0 16.75)"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_865-4" data-name="Group 865">
                  <path
                    id="Ellipse_69-4"
                    data-name="Ellipse 69"
                    className="cls-5"
                    d="M927.84,448.7c0,18.43-29.81,18.43-29.82,0S927.83,430.26,927.84,448.7Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_70-4"
                    data-name="Ellipse 70"
                    className="cls-5"
                    d="M915.69,448.7c.06,3.38-5.58,3.38-5.52,0S915.75,445.31,915.69,448.7Z"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
            <path
              id="Path_958-4"
              data-name="Path 958"
              className="cls-5"
              d="M853.5,484c0-29.64,25.38-53.66,56.67-53.67"
              transform="translate(0 16.75)"
            />
            <path
              id="Path_959-4"
              data-name="Path 959"
              className="cls-5"
              d="M895.13,482.49H871.21L858.8,494.24h-9.57"
              transform="translate(0 16.75)"
            />
            <g id="Group_892-5" data-name="Group 892">
              <g id="Group_882-5" data-name="Group 882">
                <g id="Group_881-5" data-name="Group 881">
                  <path
                    id="Path_975-5"
                    data-name="Path 975"
                    className="cls-8"
                    d="M918.06,377.81v90.64l8.77,4.39v8.73"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_976-5"
                    data-name="Path 976"
                    className="cls-5"
                    d="M895.26,333.61h5.39l8.06,7.63v10.61l5,4.74"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_84-5"
                    data-name="Ellipse 84"
                    className="cls-12"
                    d="M942.15,370.91c0,29.68-48,29.67-48,0S942.12,341.24,942.15,370.91Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_977-5"
                    data-name="Path 977"
                    className="cls-5"
                    d="M929.18,389v6.82l-.35.32v.66"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Ellipse_85-5"
                    data-name="Ellipse 85"
                    className="cls-14"
                    d="M943.78,394.74c0,16.47-26.62,16.47-26.63,0S943.77,378.28,943.78,394.74Z"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_978-5"
                    data-name="Path 978"
                    className="cls-5"
                    d="M917.45,377v9.59l5.26,5v3.84"
                    transform="translate(0 16.75)"
                  />
                  <path
                    id="Path_979-5"
                    data-name="Path 979"
                    className="cls-5"
                    d="M935.21,365.48v32l-4.87,4.61"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
              <g id="Group_891-5" data-name="Group 891">
                <g id="Group_890-5" data-name="Group 890">
                  <path
                    id="Path_980-5"
                    data-name="Path 980"
                    className="cls-5"
                    d="M870.78,364.5h34.56L919.57,351h2.75l11.08-10.45h22"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_889-5" data-name="Group 889">
                    <path
                      id="Ellipse_86-5"
                      data-name="Ellipse 86"
                      className="cls-14"
                      d="M971,348.38c0,20.3-32.82,20.3-32.84,0S971,328.09,971,348.38Z"
                      transform="translate(0 16.75)"
                    />
                    <g id="Group_888-5" data-name="Group 888">
                      <path
                        id="Path_981-5"
                        data-name="Path 981"
                        className="cls-5"
                        d="M951.46,275.54v21.54L939.6,308.31V317"
                        transform="translate(0 16.75)"
                      />
                      <g id="Group_887-5" data-name="Group 887">
                        <g id="Group_883-5" data-name="Group 883">
                          <path
                            id="Path_982-5"
                            data-name="Path 982"
                            className="cls-5"
                            d="M927.49,346.14h33l1.6,1.51h3.19"
                            transform="translate(0 16.75)"
                          />
                        </g>
                        <path
                          id="Path_983-5"
                          data-name="Path 983"
                          className="cls-5"
                          d="M931.85,342h9.31l3.79,3.59h.77l3,2.81h5.9"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Path_984-5"
                          data-name="Path 984"
                          className="cls-5"
                          d="M947.1,346.91h8.84l.43-.4h.86"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_87-5"
                          data-name="Ellipse 87"
                          className="cls-5"
                          d="M958.87,348.38c.09,5.24-8.63,5.24-8.53,0C950.24,343.15,959,343.15,958.87,348.38Z"
                          transform="translate(0 16.75)"
                        />
                        <path
                          id="Ellipse_88-5"
                          data-name="Ellipse 88"
                          className="cls-5"
                          d="M955.38,348.38c0,1-1.57,1-1.55,0S955.39,347.43,955.38,348.38Z"
                          transform="translate(0 16.75)"
                        />
                        <g id="Group_886-5" data-name="Group 886">
                          <path
                            id="Path_985-5"
                            data-name="Path 985"
                            className="cls-5"
                            d="M916.51,353.93h41.54l6-5.71"
                            transform="translate(0 16.75)"
                          />
                          <g id="Group_885-5" data-name="Group 885">
                            <path
                              id="Path_986-5"
                              data-name="Path 986"
                              className="cls-5"
                              d="M958.18,136.63v77l-13.4,12.65v19.1l4,3.79V273l24.74,23.46v32.9l-6.25,5.91v7.63l2,1.88V362"
                              transform="translate(0 16.75)"
                            />
                            <g id="Group_884-5" data-name="Group 884">
                              <path
                                id="Ellipse_89-5"
                                data-name="Ellipse 89"
                                className="cls-5"
                                d="M966.63,347.65c0,1.69-2.79,1.69-2.76,0S966.66,346,966.63,347.65Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_90-5"
                                data-name="Ellipse 90"
                                className="cls-5"
                                d="M967.53,347.65c.05,2.8-4.62,2.8-4.57,0S967.58,344.85,967.53,347.65Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_91-5"
                                data-name="Ellipse 91"
                                className="cls-5"
                                d="M970.42,347.65c.11,6.35-10.46,6.35-10.34,0C960,341.3,970.53,341.3,970.42,347.65Z"
                                transform="translate(0 16.75)"
                              />
                              <path
                                id="Ellipse_92-5"
                                data-name="Ellipse 92"
                                className="cls-5"
                                d="M976.15,347.65c0,13.48-21.8,13.48-21.81,0S976.14,334.17,976.15,347.65Z"
                                transform="translate(0 16.75)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Ellipse_93-5"
                  data-name="Ellipse 93"
                  className="cls-14"
                  d="M926.72,369.81c0,30.1-48.68,30.1-48.7,0S926.7,339.71,926.72,369.81Z"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
            <g id="Group_896-4" data-name="Group 896">
              <path
                id="Path_987-4"
                data-name="Path 987"
                className="cls-5"
                d="M889.1,373.24v30.85l13.4,12.69v2.45l10.43,9.88V448.7"
                transform="translate(0 16.75)"
              />
              <path
                id="Ellipse_95-4"
                data-name="Ellipse 95"
                className="cls-5"
                d="M942.15,370.91c0,29.68-48,29.67-48,0S942.12,341.24,942.15,370.91Z"
                transform="translate(0 16.75)"
              />
              <g id="Group_895-4" data-name="Group 895">
                <g id="Group_894-4" data-name="Group 894">
                  <path
                    id="Path_988-4"
                    data-name="Path 988"
                    className="cls-5"
                    d="M972.68,136.87l-.06,148.38L922.8,332.43v9.18L884,378.38v72.93"
                    transform="translate(0 16.75)"
                  />
                  <g id="Group_893-4" data-name="Group 893">
                    <path
                      id="Path_989-4"
                      data-name="Path 989"
                      className="cls-5"
                      d="M904.61,358.83V468.2l5.56,5.27V484"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_96-4"
                      data-name="Ellipse 96"
                      className="cls-5"
                      d="M915,484c.11,6-9.85,6-9.74,0C905.2,478.06,915.15,478.06,915,484Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Ellipse_97-4"
                      data-name="Ellipse 97"
                      className="cls-5"
                      d="M918.14,484c.18,9.78-16.12,9.78-15.94,0C902,474.26,918.32,474.26,918.14,484Z"
                      transform="translate(0 16.75)"
                    />
                    <path
                      id="Path_990-4"
                      data-name="Path 990"
                      className="cls-5"
                      d="M933.49,322.31V460.25l-21.12,20"
                      transform="translate(0 16.75)"
                    />
                  </g>
                </g>
                <path
                  id="Path_991-4"
                  data-name="Path 991"
                  className="cls-5"
                  d="M914.48,331v15l5.95,5.63v12l-1.77,1.67v10.61l-11,10.41v14.57l2.76,2.65v3.39l-.91.81v7.67"
                  transform="translate(0 16.75)"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="Sensors">
          <g id="triggerZone" className="triggerZone">
            <g id="_5_Circle" data-name=" 5 Circle">
              <circle className="cls-1" cx="114.49" cy="262.22" r="8.85" />
              <circle className="cls-1" cx="114.49" cy="262.22" r="11.87" />
            </g>
            <g id="_100_Circles" data-name=" 100 Circles">
              <circle
                id="Ellipse_140"
                data-name="Ellipse 140"
                className="cls-18"
                cx="114.49"
                cy="261.47"
                r="8.35"
              />
              <circle
                id="Ellipse_141"
                data-name="Ellipse 141"
                className="cls-18"
                cx="114.49"
                cy="261.47"
                r="59.56"
              />
            </g>
            <g id="_22_Circles" data-name=" 22 Circles">
              <circle
                id="Ellipse_142-2"
                data-name="Ellipse 142-2"
                className="cls-19"
                cx="114.49"
                cy="261.47"
                r="62.23"
              />
              <circle
                id="Ellipse_143"
                data-name="Ellipse 143"
                className="cls-19"
                cx="114.49"
                cy="261.47"
                r="5.08"
              />
            </g>
            <g className="triggerEXTZoneSensor">
              <circle
                onMouseOver={(e) => {
                  proximityWarning(e);
                }}
                id="triggerEXTZoneSensor1"
                data-name="triggerEXTZoneSensor1"
                className={
                  data && data.zones.zone1.status === "Alert"
                    ? "cls-20"
                    : data && data.zones.zone1.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-20"
                }
                cx="114.49"
                cy="261.47"
                r="86.3"
              />
            </g>
            <g
              id="Sensor1"
              className={
                data && data.zones.zone1.status === "Alert"
                  ? "cls-21"
                  : data && data.zones.zone1.status === "Unrestricted"
                  ? "Unrestricted"
                  : "cls-21"
              }
              data-type="Sensor"
              onMouseOver={(e) => triggerSensor(e, "Alert")}
            >
              <rect
                className={
                  data && data.zones.zone1.status === "Alert"
                    ? "zoneAlert"
                    : data && data.zones.zone1.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-21"
                }
                x="54"
                y="200.75"
                width="121"
                height="121"
                rx="60.5"
              />
              <g
                id="alertSensor1"
                className={
                  data && data.zones.zone1.status === "Alert"
                    ? ""
                    : "alertSensorOff"
                }
              >
                <g id="Symbol">
                  <g
                    id="SYSTEMS_STATE"
                    data-name="SYSTEMS STATE"
                    className="cls-22"
                  >
                    <text
                      className="cls-23"
                      transform="translate(195.58 263.17)"
                    >
                      SY
                      <tspan className="cls-24" x="8.91" y="0">
                        S
                      </tspan>
                      <tspan className="cls-25" x="13.46" y="0">
                        TEMS{" "}
                      </tspan>
                      <tspan className="cls-26" x="34.76" y="0">
                        S
                      </tspan>
                      <tspan className="cls-27" x="39.31" y="0">
                        TA
                      </tspan>
                      <tspan className="cls-25" x="46.93" y="0">
                        TE
                      </tspan>
                    </text>
                  </g>
                  <g id="_ERROR_" data-name=" ERROR " className="cls-22">
                    <text
                      className="cls-28"
                      transform="translate(195.58 282.41)"
                    >
                      !–––{" "}
                      <tspan className="cls-29" x="33.75" y="0">
                        {" "}
                      </tspan>
                      <tspan x="37.48" y="0">
                        ALE
                      </tspan>
                      <tspan className="cls-30" x="64.4" y="0">
                        R
                      </tspan>
                      <tspan className="cls-31" x="73.94" y="0">
                        T
                      </tspan>
                      <tspan x="82.11" y="0" xmlSpace="preserve">
                        {" "}
                        –––!
                      </tspan>
                    </text>
                  </g>
                  <g id="SERIAL_1" data-name="SERIAL 1" className="cls-22">
                    <text
                      className="cls-32"
                      transform="translate(195.58 296.15)"
                    >
                      02
                      <tspan className="cls-33" x="9.15" y="0">
                        /
                      </tspan>
                      <tspan className="cls-25" x="11.93" y="0">
                        42B
                      </tspan>
                    </text>
                  </g>
                  <g id="SERIAL_1-2" data-name="SERIAL 1-2" className="cls-22">
                    <text
                      className="cls-34"
                      transform="translate(269.78 296.15)"
                    >
                      B
                      <tspan className="cls-35" x="4.73" y="0">
                        A
                      </tspan>
                      <tspan className="cls-25" x="9.44" y="0">
                        C
                      </tspan>
                      <tspan className="cls-36" x="14.12" y="0">
                        K
                      </tspan>
                      <tspan className="cls-25" x="18.72" y="0">
                        UP 49%
                      </tspan>
                    </text>
                  </g>
                </g>
                <g
                  id="Group_951-2"
                  data-name="Group 951-2"
                  className="SensorLine"
                >
                  <g id="Group_1251" data-name="Group 1251">
                    <circle
                      id="Ellipse_144-3"
                      data-name="Ellipse 144-3"
                      className="cls-37"
                      cx="130.71"
                      cy="266.71"
                      r="3.02"
                    />
                  </g>
                  <g id="Group_1252" data-name="Group 1252">
                    <circle
                      id="Ellipse_144-4"
                      data-name="Ellipse 144-4"
                      className="cls-37"
                      cx="186.92"
                      cy="276.64"
                      r="3.02"
                    />
                  </g>
                  <path
                    id="Path_1041-2"
                    data-name="Path 1041-2"
                    className="cls-38"
                    d="M130.78,250.27l53.32,9.42"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
          </g>
          <g className="cls-39">
            <g id="Symbol-3">
              <g
                id="PRIMARY_CHARGE_STATE_ID"
                data-name="PRIMARY CHARGE STATE ID"
                className="cls-22"
              >
                <text className="cls-40" transform="translate(49.44 351.96)">
                  SENSOR{" "}
                  <tspan className="cls-41" x="21.79" y="0">
                    S
                  </tspan>
                  <tspan className="cls-42" x="25.04" y="0">
                    TA
                  </tspan>
                  <tspan x="30.48" y="0">
                    TUS
                  </tspan>
                </text>
              </g>
              <g
                id="BATTERY_FUNCTION"
                data-name="BATTERY FUNCTION"
                className="cls-22"
              >
                <text className="cls-43" transform="translate(28.12 361.78)">
                  SENSOR ONLINE
                </text>
              </g>
              <g id="Group_949" data-name="Group 949">
                <g id="SERIAL_1-5" data-name="SERIAL 1-5" className="cls-22">
                  <text className="cls-44" transform="translate(60.29 371.59)">
                    100%
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_959" data-name="Group 959" className="SensorLine">
            <g id="Group_1253" data-name="Group 1253">
              <circle
                id="Ellipse_144-5"
                data-name="Ellipse 144-5"
                className="cls-37"
                cx="136.15"
                cy="194.1"
                r="3.02"
              />
            </g>
            <g id="Group_1254" data-name="Group 1254">
              <circle
                id="Ellipse_144-6"
                data-name="Ellipse 144-6"
                className="cls-37"
                cx="117.72"
                cy="246.62"
                r="3.02"
              />
            </g>
            <line
              id="Line_54722"
              data-name="Line 54722"
              className="cls-45"
              x1="136.04"
              y1="193.9"
              x2="118.1"
              y2="245.01"
            />
          </g>
          <g id="Group_961" data-name="Group 961" className="SensorLine">
            <path
              id="Path_1040"
              data-name="Path 1040"
              className="cls-46"
              d="M108.35,259.71,81,315.47"
              transform="translate(0 16.75)"
            />
            <g id="Group_1255" data-name="Group 1255">
              <circle
                id="Ellipse_144-7"
                data-name="Ellipse 144-7"
                className="cls-37"
                cx="107.63"
                cy="277.31"
                r="3.02"
              />
            </g>
            <g id="Group_1256" data-name="Group 1256">
              <circle
                id="Ellipse_144-8"
                data-name="Ellipse 144-8"
                className="cls-37"
                cx="79.51"
                cy="334.6"
                r="3.02"
              />
            </g>
          </g>
          <g id="AUX_LOCKUP" data-name="AUX LOCKUP">
            <g
              id="AUXILLARY_SYSTEMS"
              data-name="AUXILLARY SYSTEMS"
              className="cls-22"
            >
              <text className="cls-47" transform="translate(94.25 180.1)">
                SENSOR
              </text>
            </g>
            <g id="SERIAL_1-7" data-name="SERIAL 1-7" className="cls-22">
              <text className="cls-48" transform="translate(94.25 149.44)">
                PROXIMITY{" "}
              </text>
            </g>
            <g id="SERIAL_1-8" data-name="SERIAL 1-8" className="cls-22">
              <text className="cls-51" transform="translate(94.25 190.67)">
                0
                <tspan className="cls-52" x="3.62" y="0">
                  1
                </tspan>
                <tspan className="cls-53" x="5.72" y="0">
                  /
                </tspan>
                <tspan className="cls-52" x="8.28" y="0">
                  06
                </tspan>
              </text>
            </g>
            <g id="_1" data-name=" 1" className="cls-22">
              <text
                className={
                  data && data.zones.zone1.status === "Alert"
                    ? "cls-54"
                    : data && data.zones.zone1.status === "Unrestricted"
                    ? "UnrestrictedNumber"
                    : "cls-54"
                }
                transform="translate(235.89 180.1)"
              >
                1
              </text>
            </g>
          </g>
          <g id="triggerZone-2" className="triggerZone" data-name="triggerZone">
            <g id="_5_Circle-2" data-name=" 5 Circle">
              <circle className="cls-1" cx="658.49" cy="431.22" r="8.85" />
              <circle className="cls-1" cx="658.49" cy="431.22" r="11.87" />
            </g>
            <g id="_100_Circles-2" data-name=" 100 Circles">
              <circle
                id="Ellipse_140-2"
                data-name="Ellipse 140"
                className="cls-18"
                cx="658.49"
                cy="430.47"
                r="8.35"
              />
              <circle
                id="Ellipse_141-2"
                data-name="Ellipse 141"
                className="cls-18"
                cx="658.49"
                cy="430.47"
                r="59.56"
              />
            </g>
            <g id="_22_Circles-2" data-name=" 22 Circles">
              <circle
                id="Ellipse_142-2-2"
                data-name="Ellipse 142-2"
                className="cls-19"
                cx="658.49"
                cy="430.47"
                r="62.23"
              />
              <circle
                id="Ellipse_143-2"
                data-name="Ellipse 143"
                className="cls-19"
                cx="658.49"
                cy="430.47"
                r="5.08"
              />
            </g>
            <g className="triggerEXTZoneSensor">
              <circle
                onMouseOver={(e) => {
                  proximityWarning(e);
                }}
                id="triggerEXTZoneSensor3"
                data-name="triggerEXTZoneSensor3"
                className={
                  data && data.zones.zone3.status === "Alert"
                    ? "cls-20"
                    : data && data.zones.zone3.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-20"
                }
                cx="658.49"
                cy="430.47"
                r="86.3"
              />
            </g>

            <g
              id="Sensor3"
              className={
                data && data.zones.zone3.status === "Alert"
                  ? "cls-21"
                  : data && data.zones.zone3.status === "Unrestricted"
                  ? "Unrestricted"
                  : "cls-21"
              }
              data-type="Sensor"
              onMouseOver={(e) => triggerSensor(e, "Alert")}
            >
              <rect
                className={
                  data && data.zones.zone3.status === "Alert"
                    ? "zoneAlert"
                    : data && data.zones.zone3.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-21"
                }
                x="598"
                y="369.75"
                width="121"
                height="121"
                rx="60.5"
              />
              <g
                id="alertSensor3"
                className={
                  data && data.zones.zone3.status === "Alert"
                    ? ""
                    : "alertSensorOff"
                }
              >
                <g id="Symbol-2" data-name="Symbol">
                  <g
                    id="SYSTEMS_STATE-2"
                    data-name="SYSTEMS STATE"
                    className="cls-22"
                  >
                    <text
                      className="cls-23"
                      transform="translate(735.58 431.17)"
                    >
                      SY
                      <tspan className="cls-24" x="8.91" y="0">
                        S
                      </tspan>
                      <tspan className="cls-25" x="13.46" y="0">
                        TEMS{" "}
                      </tspan>
                      <tspan className="cls-26" x="34.76" y="0">
                        S
                      </tspan>
                      <tspan className="cls-27" x="39.31" y="0">
                        TA
                      </tspan>
                      <tspan className="cls-25" x="46.93" y="0">
                        TE
                      </tspan>
                    </text>
                  </g>
                  <g id="_ERROR_2" data-name=" ERROR " className="cls-22">
                    <text
                      className="cls-28"
                      transform="translate(737.58 450.41)"
                    >
                      !–––{" "}
                      <tspan className="cls-29" x="33.75" y="0">
                        {" "}
                      </tspan>
                      <tspan x="37.48" y="0">
                        ALE
                      </tspan>
                      <tspan className="cls-30" x="64.4" y="0">
                        R
                      </tspan>
                      <tspan className="cls-31" x="73.94" y="0">
                        T
                      </tspan>
                      <tspan x="82.11" y="0" xmlSpace="preserve">
                        {" "}
                        –––!
                      </tspan>
                    </text>
                  </g>
                  <g id="SERIAL_1-2-2" data-name="SERIAL 1" className="cls-22">
                    <text
                      className="cls-32"
                      transform="translate(735.58 464.15)"
                    >
                      02
                      <tspan className="cls-33" x="9.15" y="0">
                        /
                      </tspan>
                      <tspan className="cls-25" x="11.93" y="0">
                        42B
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="SERIAL_1-2-3"
                    data-name="SERIAL 1-2"
                    className="cls-22"
                  >
                    <text
                      className="cls-34"
                      transform="translate(809.78 464.15)"
                    >
                      B
                      <tspan className="cls-35" x="4.73" y="0">
                        A
                      </tspan>
                      <tspan className="cls-25" x="9.44" y="0">
                        C
                      </tspan>
                      <tspan className="cls-36" x="14.12" y="0">
                        K
                      </tspan>
                      <tspan className="cls-25" x="18.72" y="0">
                        UP 49%
                      </tspan>
                    </text>
                  </g>
                </g>
                <g
                  id="Group_951-2-2"
                  data-name="Group 951-2"
                  className="SensorLine"
                >
                  <g id="Group_1251-2" data-name="Group 1251">
                    <circle
                      id="Ellipse_144-3-2"
                      data-name="Ellipse 144-3"
                      className="cls-37"
                      cx="673.71"
                      cy="435.71"
                      r="3.02"
                    />
                  </g>
                  <g id="Group_1252-2" data-name="Group 1252">
                    <circle
                      id="Ellipse_144-4-2"
                      data-name="Ellipse 144-4"
                      className="cls-37"
                      cx="729.92"
                      cy="445.64"
                      r="3.02"
                    />
                  </g>
                  <path
                    id="Path_1041-2-2"
                    data-name="Path 1041-2"
                    className="cls-38"
                    d="M673.78,419.27l53.32,9.42"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
          </g>
          <g className="cls-55">
            <g id="Symbol-3-2" data-name="Symbol-3">
              <g
                id="PRIMARY_CHARGE_STATE_ID-2"
                data-name="PRIMARY CHARGE STATE ID"
                className="cls-22"
              >
                <text className="cls-40" transform="translate(508.44 433.96)">
                  SENSOR{" "}
                  <tspan className="cls-41" x="21.79" y="0">
                    S
                  </tspan>
                  <tspan className="cls-42" x="25.04" y="0">
                    TA
                  </tspan>
                  <tspan x="30.48" y="0">
                    TUS
                  </tspan>
                </text>
              </g>
              <g
                id="BATTERY_FUNCTION-2"
                data-name="BATTERY FUNCTION"
                className="cls-22"
              >
                <text className="cls-43" transform="translate(487.12 443.78)">
                  SENSOR ONLINE
                </text>
              </g>
              <g id="Group_949-2" data-name="Group 949">
                <g id="SERIAL_1-5-2" data-name="SERIAL 1-5" className="cls-22">
                  <text className="cls-44" transform="translate(519.29 453.59)">
                    100%
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_959-2" data-name="Group 959" className="SensorLine">
            <g id="Group_1253-2" data-name="Group 1253">
              <circle
                id="Ellipse_144-5-2"
                data-name="Ellipse 144-5"
                className="cls-37"
                cx="680.15"
                cy="363.1"
                r="3.02"
              />
            </g>
            <g id="Group_1254-2" data-name="Group 1254">
              <circle
                id="Ellipse_144-6-2"
                data-name="Ellipse 144-6"
                className="cls-37"
                cx="661.72"
                cy="415.62"
                r="3.02"
              />
            </g>
            <line
              id="Line_54722-2"
              data-name="Line 54722"
              className="cls-45"
              x1="680.04"
              y1="362.9"
              x2="662.1"
              y2="414.01"
            />
          </g>
          <g id="Group_961-2" data-name="Group 961" className="SensorLine">
            <path
              id="Path_1040-2"
              data-name="Path 1040"
              className="cls-46"
              d="M642.43,418.3l-61.83,6"
              transform="translate(0 16.75)"
            />
            <g id="Group_1255-2" data-name="Group 1255">
              <circle
                id="Ellipse_144-7-2"
                data-name="Ellipse 144-7"
                className="cls-37"
                cx="641.34"
                cy="434.88"
                r="3.02"
              />
            </g>
            <g id="Group_1256-2" data-name="Group 1256">
              <circle
                id="Ellipse_144-8-2"
                data-name="Ellipse 144-8"
                className="cls-37"
                cx="577.8"
                cy="441.03"
                r="3.02"
              />
            </g>
          </g>
          <g id="AUX_LOCKUP-2" data-name="AUX LOCKUP">
            <g
              id="AUXILLARY_SYSTEMS-2"
              data-name="AUXILLARY SYSTEMS"
              className="cls-22"
            >
              <text className="cls-47" transform="translate(639.25 349.1)">
                SENSOR
              </text>
            </g>
            <g id="SERIAL_1-7-2" data-name="SERIAL 1-7" className="cls-22">
              <text className="cls-48" transform="translate(638.25 318.44)">
                PROXIMITY{" "}
              </text>
            </g>
            <g id="SERIAL_1-8-2" data-name="SERIAL 1-8" className="cls-22">
              <text className="cls-51" transform="translate(638.25 359.67)">
                0
                <tspan className="cls-52" x="3.62" y="0">
                  1
                </tspan>
                <tspan className="cls-53" x="5.72" y="0">
                  /
                </tspan>
                <tspan className="cls-52" x="8.28" y="0">
                  06
                </tspan>
              </text>
            </g>
            <g id="_1-2" data-name=" 1" className="cls-22">
              <text
                className={
                  data && data.zones.zone3.status === "Alert"
                    ? "cls-54"
                    : data && data.zones.zone3.status === "Unrestricted"
                    ? "UnrestrictedNumber"
                    : "cls-54"
                }
                transform="translate(779.89 349.1)"
              >
                3
              </text>
            </g>
          </g>
          <g id="triggerZone-3" className="triggerZone" data-name="triggerZone">
            <g id="_5_Circle-3" data-name=" 5 Circle">
              <circle className="cls-1" cx="931.49" cy="251.22" r="8.85" />
              <circle className="cls-1" cx="931.49" cy="251.22" r="11.87" />
            </g>
            <g id="_100_Circles-3" data-name=" 100 Circles">
              <circle
                id="Ellipse_140-3"
                data-name="Ellipse 140"
                className="cls-18"
                cx="931.49"
                cy="250.47"
                r="8.35"
              />
              <circle
                id="Ellipse_141-3"
                data-name="Ellipse 141"
                className="cls-18"
                cx="931.49"
                cy="250.47"
                r="59.56"
              />
            </g>
            <g id="_22_Circles-3" data-name=" 22 Circles">
              <circle
                id="Ellipse_142-2-3"
                data-name="Ellipse 142-2"
                className="cls-19"
                cx="931.49"
                cy="250.47"
                r="62.23"
              />
              <circle
                id="Ellipse_143-3"
                data-name="Ellipse 143"
                className="cls-19"
                cx="931.49"
                cy="250.47"
                r="5.08"
              />
            </g>

            <g className="triggerEXTZoneSensor">
              <circle
                onMouseOver={(e) => {
                  proximityWarning(e);
                }}
                id="triggerEXTZoneSensor4"
                data-name="triggerEXTZoneSensor4"
                className={
                  data && data.zones.zone4.status === "Alert"
                    ? "cls-20"
                    : data && data.zones.zone4.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-20"
                }
                cx="931.49"
                cy="250.47"
                r="86.3"
              />
            </g>

            <g
              id="Sensor4"
              className={
                data && data.zones.zone4.status === "Alert"
                  ? "cls-21"
                  : data && data.zones.zone4.status === "Unrestricted"
                  ? "Unrestricted"
                  : "cls-21"
              }
              data-type="Sensor"
              onMouseOver={(e) => triggerSensor(e, "Alert")}
            >
              <rect
                className={
                  data && data.zones.zone4.status === "Alert"
                    ? "zoneAlert"
                    : data && data.zones.zone4.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-21"
                }
                x="871"
                y="189.75"
                width="121"
                height="121"
                rx="60.5"
              />

              <g
                id="alertSensor4"
                className={
                  data && data.zones.zone4.status === "Alert"
                    ? ""
                    : "alertSensorOff"
                }
                transform="translate(10 40)"
              >
                <g id="Symbol-3-3" data-name="Symbol">
                  <g
                    id="SYSTEMS_STATE-3"
                    data-name="SYSTEMS STATE"
                    className="cls-22"
                  >
                    <text
                      className="cls-23"
                      transform="translate(731.58 237.17)"
                    >
                      SY
                      <tspan className="cls-24" x="8.91" y="0">
                        S
                      </tspan>
                      <tspan className="cls-25" x="13.46" y="0">
                        TEMS{" "}
                      </tspan>
                      <tspan className="cls-26" x="34.76" y="0">
                        S
                      </tspan>
                      <tspan className="cls-27" x="39.31" y="0">
                        TA
                      </tspan>
                      <tspan className="cls-25" x="46.93" y="0">
                        TE
                      </tspan>
                    </text>
                  </g>
                  <g id="_ERROR_3" data-name=" ERROR " className="cls-22">
                    <text
                      className="cls-28"
                      transform="translate(733.58 256.41)"
                    >
                      !–––{" "}
                      <tspan className="cls-29" x="33.75" y="0">
                        {" "}
                      </tspan>
                      <tspan x="37.48" y="0">
                        ALE
                      </tspan>
                      <tspan className="cls-30" x="64.4" y="0">
                        R
                      </tspan>
                      <tspan className="cls-31" x="73.94" y="0">
                        T
                      </tspan>
                      <tspan x="82.11" y="0" xmlSpace="preserve">
                        {" "}
                        –––!
                      </tspan>
                    </text>
                  </g>
                  <g id="SERIAL_1-3" data-name="SERIAL 1" className="cls-22">
                    <text
                      className="cls-32"
                      transform="translate(731.58 270.15)"
                    >
                      02
                      <tspan className="cls-33" x="9.15" y="0">
                        /
                      </tspan>
                      <tspan className="cls-25" x="11.93" y="0">
                        42B
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="SERIAL_1-2-4"
                    data-name="SERIAL 1-2"
                    className="cls-22"
                  >
                    <text
                      className="cls-34"
                      transform="translate(805.78 270.15)"
                    >
                      B
                      <tspan className="cls-35" x="4.73" y="0">
                        A
                      </tspan>
                      <tspan className="cls-25" x="9.44" y="0">
                        C
                      </tspan>
                      <tspan className="cls-36" x="14.12" y="0">
                        K
                      </tspan>
                      <tspan className="cls-25" x="18.72" y="0">
                        UP 49%
                      </tspan>
                    </text>
                  </g>
                </g>
                <g
                  id="Group_951-2-3"
                  data-name="Group 951-2"
                  className="SensorLine"
                >
                  <g id="Group_1251-3" data-name="Group 1251">
                    <circle
                      id="Ellipse_144-3-3"
                      data-name="Ellipse 144-3"
                      className="cls-37"
                      cx="858.34"
                      cy="254.58"
                      r="3.02"
                    />
                  </g>
                  <g id="Group_1252-3" data-name="Group 1252">
                    <circle
                      id="Ellipse_144-4-3"
                      data-name="Ellipse 144-4"
                      className="cls-37"
                      cx="910.29"
                      cy="220.77"
                      r="3.02"
                    />
                  </g>
                  <path
                    id="Path_1041-2-3"
                    data-name="Path 1041-2"
                    className="cls-38"
                    d="M858.48,238.11l54-35.62"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
          </g>
          <g className="cls-56">
            <g id="Symbol-3-4" data-name="Symbol-3">
              <g
                id="PRIMARY_CHARGE_STATE_ID-3"
                data-name="PRIMARY CHARGE STATE ID"
                className="cls-22"
              >
                <text className="cls-40" transform="translate(967.44 331.96)">
                  SENSOR{" "}
                  <tspan className="cls-41" x="21.79" y="0">
                    S
                  </tspan>
                  <tspan className="cls-42" x="25.04" y="0">
                    TA
                  </tspan>
                  <tspan x="30.48" y="0">
                    TUS
                  </tspan>
                </text>
              </g>
              <g
                id="BATTERY_FUNCTION-3"
                data-name="BATTERY FUNCTION"
                className="cls-22"
              >
                <text className="cls-43" transform="translate(946.12 341.78)">
                  SENSOR ONLINE
                </text>
              </g>
              <g id="Group_949-3" data-name="Group 949">
                <g id="SERIAL_1-5-3" data-name="SERIAL 1-5" className="cls-22">
                  <text className="cls-44" transform="translate(978.29 351.59)">
                    100%
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_959-3" data-name="Group 959" className="SensorLine">
            <g id="Group_1253-3" data-name="Group 1253">
              <circle
                id="Ellipse_144-5-3"
                data-name="Ellipse 144-5"
                className="cls-37"
                cx="929.93"
                cy="178.53"
                r="3.02"
              />
            </g>
            <g id="Group_1254-3" data-name="Group 1254">
              <circle
                id="Ellipse_144-6-3"
                data-name="Ellipse 144-6"
                className="cls-37"
                cx="929.94"
                cy="234.19"
                r="3.02"
              />
            </g>
            <line
              id="Line_54722-3"
              data-name="Line 54722"
              className="cls-45"
              x1="929.76"
              y1="178.38"
              x2="929.78"
              y2="232.55"
            />
          </g>
          <g id="Group_961-3" data-name="Group 961" className="SensorLine">
            <path
              id="Path_1040-3"
              data-name="Path 1040"
              className="cls-46"
              d="M940.36,246.93l29.09,54.88"
              transform="translate(0 16.75)"
            />
            <g id="Group_1255-3" data-name="Group 1255">
              <circle
                id="Ellipse_144-7-3"
                data-name="Ellipse 144-7"
                className="cls-37"
                cx="940.62"
                cy="264.76"
                r="3.02"
              />
            </g>
            <g id="Group_1256-3" data-name="Group 1256">
              <circle
                id="Ellipse_144-8-3"
                data-name="Ellipse 144-8"
                className="cls-37"
                cx="970.52"
                cy="321.15"
                r="3.02"
              />
            </g>
          </g>
          <g id="AUX_LOCKUP-3" data-name="AUX LOCKUP">
            <g
              id="AUXILLARY_SYSTEMS-3"
              data-name="AUXILLARY SYSTEMS"
              className="cls-22"
            >
              <text className="cls-47" transform="translate(864.25 169.1)">
                SENSOR
              </text>
            </g>
            <g id="SERIAL_1-7-3" data-name="SERIAL 1-7" className="cls-22">
              <text className="cls-48" transform="translate(863.25 138.44)">
                PROXIMITY{" "}
              </text>
            </g>
            <g id="SERIAL_1-8-3" data-name="SERIAL 1-8" className="cls-22">
              <text className="cls-51" transform="translate(863.25 179.67)">
                0
                <tspan className="cls-52" x="3.62" y="0">
                  1
                </tspan>
                <tspan className="cls-53" x="5.72" y="0">
                  /
                </tspan>
                <tspan className="cls-52" x="8.28" y="0">
                  06
                </tspan>
              </text>
            </g>
            <g id="_1-3" data-name=" 1" className="cls-22">
              <text
                className={
                  data && data.zones.zone4.status === "Alert"
                    ? "cls-57"
                    : data && data.zones.zone4.status === "Unrestricted"
                    ? "UnrestrictedNumber"
                    : "cls-57"
                }
                transform="translate(1004.89 169.1)"
              >
                4
              </text>
            </g>
          </g>
          <g id="triggerZone-4" className="triggerZone" data-name="triggerZone">
            <g id="_5_Circle-4" data-name=" 5 Circle">
              <circle className="cls-1" cx="656.49" cy="145.22" r="8.85" />
              <circle className="cls-1" cx="656.49" cy="145.22" r="11.87" />
            </g>
            <g id="_100_Circles-4" data-name=" 100 Circles">
              <circle
                id="Ellipse_140-4"
                data-name="Ellipse 140"
                className="cls-18"
                cx="656.49"
                cy="144.47"
                r="8.35"
              />
              <circle
                id="Ellipse_141-4"
                data-name="Ellipse 141"
                className="cls-18"
                cx="656.49"
                cy="144.47"
                r="59.56"
              />
            </g>
            <g id="_22_Circles-4" data-name=" 22 Circles">
              <circle
                id="Ellipse_142-2-4"
                data-name="Ellipse 142-2"
                className="cls-19"
                cx="656.49"
                cy="144.47"
                r="62.23"
              />
              <circle
                id="Ellipse_143-4"
                data-name="Ellipse 143"
                className="cls-19"
                cx="656.49"
                cy="144.47"
                r="5.08"
              />
            </g>

            <g className="triggerEXTZoneSensor">
              <circle
                onMouseOver={(e) => {
                  proximityWarning(e);
                }}
                id="triggerEXTZoneSensor2"
                data-name="triggerEXTZoneSensor2"
                className={
                  data && data.zones.zone2.status === "Alert"
                    ? "cls-20"
                    : data && data.zones.zone2.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-20"
                }
                cx="656.49"
                cy="144.47"
                r="86.3"
              />
            </g>

            <g
              id="Sensor2"
              className={
                data && data.zones.zone2.status === "Alert"
                  ? "cls-21"
                  : data && data.zones.zone2.status === "Unrestricted"
                  ? "Unrestricted"
                  : "cls-21"
              }
              data-type="Sensor"
              onMouseOver={(e) => triggerSensor(e, "Alert")}
            >
              <rect
                className={
                  data && data.zones.zone2.status === "Alert"
                    ? "zoneAlert"
                    : data && data.zones.zone2.status === "Unrestricted"
                    ? "Unrestricted"
                    : "cls-21"
                }
                x="596"
                y="83.75"
                width="121"
                height="121"
                rx="60.5"
              />
              <g
                id="alertSensor2"
                className={
                  data && data.zones.zone2.status === "Alert"
                    ? ""
                    : "alertSensorOff"
                }
              >
                <g id="Symbol-4" data-name="Symbol">
                  <g
                    id="SYSTEMS_STATE-4"
                    data-name="SYSTEMS STATE"
                    className="cls-22"
                  >
                    <text
                      className="cls-23"
                      transform="translate(733.58 145.17)"
                    >
                      SY
                      <tspan className="cls-24" x="8.91" y="0">
                        S
                      </tspan>
                      <tspan className="cls-25" x="13.46" y="0">
                        TEMS{" "}
                      </tspan>
                      <tspan className="cls-26" x="34.76" y="0">
                        S
                      </tspan>
                      <tspan className="cls-27" x="39.31" y="0">
                        TA
                      </tspan>
                      <tspan className="cls-25" x="46.93" y="0">
                        TE
                      </tspan>
                    </text>
                  </g>
                  <g id="_ERROR_4" data-name=" ERROR " className="cls-22">
                    <text
                      className="cls-28"
                      transform="translate(735.58 164.41)"
                    >
                      !–––{" "}
                      <tspan className="cls-29" x="33.75" y="0">
                        {" "}
                      </tspan>
                      <tspan x="37.48" y="0">
                        ALE
                      </tspan>
                      <tspan className="cls-30" x="64.4" y="0">
                        R
                      </tspan>
                      <tspan className="cls-31" x="73.94" y="0">
                        T
                      </tspan>
                      <tspan x="82.11" y="0" xmlSpace="preserve">
                        {" "}
                        –––!
                      </tspan>
                    </text>
                  </g>
                  <g id="SERIAL_1-4" data-name="SERIAL 1" className="cls-22">
                    <text
                      className="cls-32"
                      transform="translate(733.58 178.15)"
                    >
                      02
                      <tspan className="cls-33" x="9.15" y="0">
                        /
                      </tspan>
                      <tspan className="cls-25" x="11.93" y="0">
                        42B
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="SERIAL_1-2-5"
                    data-name="SERIAL 1-2"
                    className="cls-22"
                  >
                    <text
                      className="cls-34"
                      transform="translate(807.78 178.15)"
                    >
                      B
                      <tspan className="cls-35" x="4.73" y="0">
                        A
                      </tspan>
                      <tspan className="cls-25" x="9.44" y="0">
                        C
                      </tspan>
                      <tspan className="cls-36" x="14.12" y="0">
                        K
                      </tspan>
                      <tspan className="cls-25" x="18.72" y="0">
                        UP 49%
                      </tspan>
                    </text>
                  </g>
                </g>
                <g
                  id="Group_951-2-4"
                  data-name="Group 951-2"
                  className="SensorLine"
                >
                  <g id="Group_1251-4" data-name="Group 1251">
                    <circle
                      id="Ellipse_144-3-4"
                      data-name="Ellipse 144-3"
                      className="cls-37"
                      cx="671.71"
                      cy="149.71"
                      r="3.02"
                    />
                  </g>
                  <g id="Group_1252-4" data-name="Group 1252">
                    <circle
                      id="Ellipse_144-4-4"
                      data-name="Ellipse 144-4"
                      className="cls-37"
                      cx="727.92"
                      cy="159.64"
                      r="3.02"
                    />
                  </g>
                  <path
                    id="Path_1041-2-4"
                    data-name="Path 1041-2"
                    className="cls-38"
                    d="M671.78,133.27l53.32,9.42"
                    transform="translate(0 16.75)"
                  />
                </g>
              </g>
            </g>
          </g>
          <g className="cls-58">
            <g id="Symbol-3-5" data-name="Symbol-3">
              <g
                id="PRIMARY_CHARGE_STATE_ID-4"
                data-name="PRIMARY CHARGE STATE ID"
                className="cls-22"
              >
                <text className="cls-40" transform="translate(688.44 49.96)">
                  SENSOR{" "}
                  <tspan className="cls-41" x="21.79" y="0">
                    S
                  </tspan>
                  <tspan className="cls-42" x="25.04" y="0">
                    TA
                  </tspan>
                  <tspan x="30.48" y="0">
                    TUS
                  </tspan>
                </text>
              </g>
              <g
                id="BATTERY_FUNCTION-4"
                data-name="BATTERY FUNCTION"
                className="cls-22"
              >
                <text className="cls-43" transform="translate(667.12 59.78)">
                  SENSOR ONLINE
                </text>
              </g>
              <g id="Group_949-4" data-name="Group 949">
                <g id="SERIAL_1-5-4" data-name="SERIAL 1-5" className="cls-22">
                  <text className="cls-44" transform="translate(699.29 69.59)">
                    100%
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_959-4" data-name="Group 959" className="SensorLine">
            <g id="Group_1253-4" data-name="Group 1253">
              <circle
                id="Ellipse_144-5-4"
                data-name="Ellipse 144-5"
                className="cls-37"
                cx="678.15"
                cy="77.1"
                r="3.02"
              />
            </g>
            <g id="Group_1254-4" data-name="Group 1254">
              <circle
                id="Ellipse_144-6-4"
                data-name="Ellipse 144-6"
                className="cls-37"
                cx="659.72"
                cy="129.62"
                r="3.02"
              />
            </g>
            <line
              id="Line_54722-4"
              data-name="Line 54722"
              className="cls-45"
              x1="678.04"
              y1="76.9"
              x2="660.1"
              y2="128.01"
            />
          </g>
          <g id="Group_961-4" data-name="Group 961" className="SensorLine">
            <path
              id="Path_1040-4"
              data-name="Path 1040"
              className="cls-46"
              d="M640.43,132.3l-61.83,6"
              transform="translate(0 16.75)"
            />
            <g id="Group_1255-4" data-name="Group 1255">
              <circle
                id="Ellipse_144-7-4"
                data-name="Ellipse 144-7"
                className="cls-37"
                cx="639.34"
                cy="148.88"
                r="3.02"
              />
            </g>
            <g id="Group_1256-4" data-name="Group 1256">
              <circle
                id="Ellipse_144-8-4"
                data-name="Ellipse 144-8"
                className="cls-37"
                cx="575.8"
                cy="155.03"
                r="3.02"
              />
            </g>
          </g>
          <g id="AUX_LOCKUP-4" data-name="AUX LOCKUP">
            <g
              id="AUXILLARY_SYSTEMS-4"
              data-name="AUXILLARY SYSTEMS"
              className="cls-22"
            >
              <text className="cls-47" transform="translate(408.25 163.1)">
                SENSOR
              </text>
            </g>
            <g id="SERIAL_1-7-4" data-name="SERIAL 1-7" className="cls-22">
              <text className="cls-48" transform="translate(407.25 132.44)">
                PROXIMITY{" "}
              </text>
            </g>
            <g id="SERIAL_1-8-4" data-name="SERIAL 1-8" className="cls-22">
              <text className="cls-51" transform="translate(407.25 173.67)">
                0
                <tspan className="cls-52" x="3.62" y="0">
                  1
                </tspan>
                <tspan className="cls-53" x="5.72" y="0">
                  /
                </tspan>
                <tspan className="cls-52" x="8.28" y="0">
                  06
                </tspan>
              </text>
            </g>
            <g id="_1-4" data-name=" 1" className="cls-22">
              <text
                className={
                  data && data.zones.zone2.status === "Alert"
                    ? "cls-57"
                    : data && data.zones.zone2.status === "Unrestricted"
                    ? "UnrestrictedNumber"
                    : "cls-57"
                }
                transform="translate(548.89 163.1)"
              >
                2
              </text>
            </g>
          </g>
        </g>
        <g id="DoorSensors">
          <text
            id="Door2"
            className="DoorLabelText"
            transform="translate(313 180)"
          >
            DOOR 2
          </text>
          <g
            className={`${
              data && data.doorSensors[1].status.color
            } doorSensorSVG`}
          >
            <g className="cls-59">
              <g id="LINE_TEXTURE" data-name="LINE TEXTURE" className="cls-60">
                <g className="cls-61">
                  <g id="LINE_REPEAT" data-name="LINE REPEAT">
                    <line
                      id="Line_15"
                      data-name="Line 15"
                      className="cls-62"
                      x1="397.27"
                      y1="169.48"
                      x2="321.82"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-2"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="397.27"
                      y1="172.9"
                      x2="321.82"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-3"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="397.27"
                      y1="176.33"
                      x2="321.82"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-4"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="397.27"
                      y1="179.75"
                      x2="321.82"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-5"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="397.27"
                      y1="183.17"
                      x2="321.82"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-6"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="393.84"
                      y1="169.48"
                      x2="318.39"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-7"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="393.84"
                      y1="172.9"
                      x2="318.39"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-8"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="393.84"
                      y1="176.33"
                      x2="318.39"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-9"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="393.84"
                      y1="179.75"
                      x2="318.39"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-10"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="393.84"
                      y1="183.17"
                      x2="318.39"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-11"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="390.41"
                      y1="169.48"
                      x2="314.96"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-12"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="390.41"
                      y1="172.9"
                      x2="314.96"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-13"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="390.41"
                      y1="176.33"
                      x2="314.96"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-14"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="390.41"
                      y1="179.75"
                      x2="314.96"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-15"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="390.41"
                      y1="183.17"
                      x2="314.96"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-16"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="386.98"
                      y1="169.48"
                      x2="311.53"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-17"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="386.98"
                      y1="172.9"
                      x2="311.53"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-18"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="386.98"
                      y1="176.33"
                      x2="311.53"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-19"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="386.98"
                      y1="179.75"
                      x2="311.53"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-20"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="386.98"
                      y1="183.17"
                      x2="311.53"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-21"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="383.55"
                      y1="169.48"
                      x2="308.1"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-22"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="383.55"
                      y1="172.9"
                      x2="308.1"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-23"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="383.55"
                      y1="176.33"
                      x2="308.1"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-24"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="383.55"
                      y1="179.75"
                      x2="308.1"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-25"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="383.55"
                      y1="183.17"
                      x2="308.1"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-26"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="380.12"
                      y1="169.48"
                      x2="304.67"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-27"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="380.12"
                      y1="172.9"
                      x2="304.67"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-28"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="380.12"
                      y1="176.33"
                      x2="304.67"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-29"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="380.12"
                      y1="179.75"
                      x2="304.67"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-30"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="380.12"
                      y1="183.17"
                      x2="304.67"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-31"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="376.69"
                      y1="169.48"
                      x2="301.24"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-32"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="376.69"
                      y1="172.9"
                      x2="301.24"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-33"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="376.69"
                      y1="176.33"
                      x2="301.24"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-34"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="376.69"
                      y1="179.75"
                      x2="301.24"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-35"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="376.69"
                      y1="183.17"
                      x2="301.24"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-36"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="373.26"
                      y1="169.48"
                      x2="297.81"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-37"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="373.26"
                      y1="172.9"
                      x2="297.81"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-38"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="373.26"
                      y1="176.33"
                      x2="297.81"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-39"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="373.26"
                      y1="179.75"
                      x2="297.81"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-40"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="373.26"
                      y1="183.17"
                      x2="297.81"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-41"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="369.83"
                      y1="169.48"
                      x2="294.38"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-42"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="369.83"
                      y1="172.9"
                      x2="294.38"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-43"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="369.83"
                      y1="176.33"
                      x2="294.38"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-44"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="369.83"
                      y1="179.75"
                      x2="294.38"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-45"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="369.83"
                      y1="183.17"
                      x2="294.38"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-46"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="366.4"
                      y1="169.48"
                      x2="290.95"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-47"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="366.4"
                      y1="172.9"
                      x2="290.95"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-48"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="366.4"
                      y1="176.33"
                      x2="290.95"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-49"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="366.4"
                      y1="179.75"
                      x2="290.95"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-50"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="366.4"
                      y1="183.17"
                      x2="290.95"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-51"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="362.97"
                      y1="169.48"
                      x2="287.52"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-52"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="362.97"
                      y1="172.9"
                      x2="287.52"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-53"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="362.97"
                      y1="176.33"
                      x2="287.52"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-54"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="362.97"
                      y1="179.75"
                      x2="287.52"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-55"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="362.97"
                      y1="183.17"
                      x2="287.52"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-56"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="359.54"
                      y1="169.48"
                      x2="284.09"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-57"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="359.54"
                      y1="172.9"
                      x2="284.09"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-58"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="359.54"
                      y1="176.33"
                      x2="284.09"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-59"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="359.54"
                      y1="179.75"
                      x2="284.09"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-60"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="359.54"
                      y1="183.17"
                      x2="284.09"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-61"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="356.11"
                      y1="169.48"
                      x2="280.66"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-62"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="356.11"
                      y1="172.9"
                      x2="280.66"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-63"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="356.11"
                      y1="176.33"
                      x2="280.66"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-64"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="356.11"
                      y1="179.75"
                      x2="280.66"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-65"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="356.11"
                      y1="183.17"
                      x2="280.66"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-66"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="352.68"
                      y1="169.48"
                      x2="277.23"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-67"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="352.68"
                      y1="172.9"
                      x2="277.23"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-68"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="352.68"
                      y1="176.33"
                      x2="277.23"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-69"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="352.68"
                      y1="179.75"
                      x2="277.23"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-70"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="352.68"
                      y1="183.17"
                      x2="277.23"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-71"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="349.25"
                      y1="169.48"
                      x2="273.8"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-72"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="349.25"
                      y1="172.9"
                      x2="273.8"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-73"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="349.25"
                      y1="176.33"
                      x2="273.8"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-74"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="349.25"
                      y1="179.75"
                      x2="273.8"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-75"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="349.25"
                      y1="183.17"
                      x2="273.8"
                      y2="145.5"
                    />
                    <line
                      id="Line_15-76"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="345.82"
                      y1="169.48"
                      x2="270.38"
                      y2="131.8"
                    />
                    <line
                      id="Line_15-77"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="345.82"
                      y1="172.9"
                      x2="270.38"
                      y2="135.23"
                    />
                    <line
                      id="Line_15-78"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="345.82"
                      y1="176.33"
                      x2="270.38"
                      y2="138.65"
                    />
                    <line
                      id="Line_15-79"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="345.82"
                      y1="179.75"
                      x2="270.38"
                      y2="142.08"
                    />
                    <line
                      id="Line_15-80"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="345.82"
                      y1="183.17"
                      x2="270.38"
                      y2="145.5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="311.55"
            y="151.35"
            width="54.83"
            height="37.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor2"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel2"
            className={doorMessage.doorLabel2 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537"
              data-name="Rectangle 537"
              className="cls-64"
              x="264.59"
              y="107.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-5-5" data-name="SERIAL 1" className="cls-22">
              <text className="cls-65" transform="translate(284.83 127.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-68" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-69" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-70" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-66" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-68" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
          <text
            id="Door5"
            className="DoorLabelText"
            transform="translate(756 249)"
          >
            DOOR 5
          </text>
          <g
            className={`${
              data && data.doorSensors[4].status.color
            } doorSensorSVG`}
          >
            <g className="cls-71">
              <g
                id="LINE_TEXTURE-2"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-72">
                  <g id="LINE_REPEAT-2" data-name="LINE REPEAT">
                    <line
                      id="Line_15-2-2"
                      data-name="Line 15"
                      className="cls-62"
                      x1="843.27"
                      y1="238.48"
                      x2="767.82"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-2-3"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="843.27"
                      y1="241.9"
                      x2="767.82"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-3-2"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="843.27"
                      y1="245.33"
                      x2="767.82"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-4-2"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="843.27"
                      y1="248.75"
                      x2="767.82"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-5-2"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="843.27"
                      y1="252.17"
                      x2="767.82"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-6-2"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="839.84"
                      y1="238.48"
                      x2="764.39"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-7-2"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="839.84"
                      y1="241.9"
                      x2="764.39"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-8-2"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="839.84"
                      y1="245.33"
                      x2="764.39"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-9-2"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="839.84"
                      y1="248.75"
                      x2="764.39"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-10-2"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="839.84"
                      y1="252.17"
                      x2="764.39"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-11-2"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="836.41"
                      y1="238.48"
                      x2="760.96"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-12-2"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="836.41"
                      y1="241.9"
                      x2="760.96"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-13-2"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="836.41"
                      y1="245.33"
                      x2="760.96"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-14-2"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="836.41"
                      y1="248.75"
                      x2="760.96"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-15-2"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="836.41"
                      y1="252.17"
                      x2="760.96"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-16-2"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="832.98"
                      y1="238.48"
                      x2="757.53"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-17-2"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="832.98"
                      y1="241.9"
                      x2="757.53"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-18-2"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="832.98"
                      y1="245.33"
                      x2="757.53"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-19-2"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="832.98"
                      y1="248.75"
                      x2="757.53"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-20-2"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="832.98"
                      y1="252.17"
                      x2="757.53"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-21-2"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="829.55"
                      y1="238.48"
                      x2="754.1"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-22-2"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="829.55"
                      y1="241.9"
                      x2="754.1"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-23-2"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="829.55"
                      y1="245.33"
                      x2="754.1"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-24-2"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="829.55"
                      y1="248.75"
                      x2="754.1"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-25-2"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="829.55"
                      y1="252.17"
                      x2="754.1"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-26-2"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="826.12"
                      y1="238.48"
                      x2="750.67"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-27-2"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="826.12"
                      y1="241.9"
                      x2="750.67"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-28-2"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="826.12"
                      y1="245.33"
                      x2="750.67"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-29-2"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="826.12"
                      y1="248.75"
                      x2="750.67"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-30-2"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="826.12"
                      y1="252.17"
                      x2="750.67"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-31-2"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="822.69"
                      y1="238.48"
                      x2="747.24"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-32-2"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="822.69"
                      y1="241.9"
                      x2="747.24"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-33-2"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="822.69"
                      y1="245.33"
                      x2="747.24"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-34-2"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="822.69"
                      y1="248.75"
                      x2="747.24"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-35-2"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="822.69"
                      y1="252.17"
                      x2="747.24"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-36-2"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="819.26"
                      y1="238.48"
                      x2="743.81"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-37-2"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="819.26"
                      y1="241.9"
                      x2="743.81"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-38-2"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="819.26"
                      y1="245.33"
                      x2="743.81"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-39-2"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="819.26"
                      y1="248.75"
                      x2="743.81"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-40-2"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="819.26"
                      y1="252.17"
                      x2="743.81"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-41-2"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="815.83"
                      y1="238.48"
                      x2="740.38"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-42-2"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="815.83"
                      y1="241.9"
                      x2="740.38"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-43-2"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="815.83"
                      y1="245.33"
                      x2="740.38"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-44-2"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="815.83"
                      y1="248.75"
                      x2="740.38"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-45-2"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="815.83"
                      y1="252.17"
                      x2="740.38"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-46-2"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="812.4"
                      y1="238.48"
                      x2="736.95"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-47-2"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="812.4"
                      y1="241.9"
                      x2="736.95"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-48-2"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="812.4"
                      y1="245.33"
                      x2="736.95"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-49-2"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="812.4"
                      y1="248.75"
                      x2="736.95"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-50-2"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="812.4"
                      y1="252.17"
                      x2="736.95"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-51-2"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="808.97"
                      y1="238.48"
                      x2="733.52"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-52-2"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="808.97"
                      y1="241.9"
                      x2="733.52"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-53-2"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="808.97"
                      y1="245.33"
                      x2="733.52"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-54-2"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="808.97"
                      y1="248.75"
                      x2="733.52"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-55-2"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="808.97"
                      y1="252.17"
                      x2="733.52"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-56-2"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="805.54"
                      y1="238.48"
                      x2="730.09"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-57-2"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="805.54"
                      y1="241.9"
                      x2="730.09"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-58-2"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="805.54"
                      y1="245.33"
                      x2="730.09"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-59-2"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="805.54"
                      y1="248.75"
                      x2="730.09"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-60-2"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="805.54"
                      y1="252.17"
                      x2="730.09"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-61-2"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="802.11"
                      y1="238.48"
                      x2="726.66"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-62-2"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="802.11"
                      y1="241.9"
                      x2="726.66"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-63-2"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="802.11"
                      y1="245.33"
                      x2="726.66"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-64-2"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="802.11"
                      y1="248.75"
                      x2="726.66"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-65-2"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="802.11"
                      y1="252.17"
                      x2="726.66"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-66-2"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="798.68"
                      y1="238.48"
                      x2="723.23"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-67-2"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="798.68"
                      y1="241.9"
                      x2="723.23"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-68-2"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="798.68"
                      y1="245.33"
                      x2="723.23"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-69-2"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="798.68"
                      y1="248.75"
                      x2="723.23"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-70-2"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="798.68"
                      y1="252.17"
                      x2="723.23"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-71-2"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="795.25"
                      y1="238.48"
                      x2="719.8"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-72-2"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="795.25"
                      y1="241.9"
                      x2="719.8"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-73-2"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="795.25"
                      y1="245.33"
                      x2="719.8"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-74-2"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="795.25"
                      y1="248.75"
                      x2="719.8"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-75-2"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="795.25"
                      y1="252.17"
                      x2="719.8"
                      y2="214.5"
                    />
                    <line
                      id="Line_15-76-2"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="791.82"
                      y1="238.48"
                      x2="716.38"
                      y2="200.8"
                    />
                    <line
                      id="Line_15-77-2"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="791.82"
                      y1="241.9"
                      x2="716.38"
                      y2="204.23"
                    />
                    <line
                      id="Line_15-78-2"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="791.82"
                      y1="245.33"
                      x2="716.38"
                      y2="207.65"
                    />
                    <line
                      id="Line_15-79-2"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="791.82"
                      y1="248.75"
                      x2="716.38"
                      y2="211.08"
                    />
                    <line
                      id="Line_15-80-2"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="791.82"
                      y1="252.17"
                      x2="716.38"
                      y2="214.5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="757.55"
            y="221"
            width="54.83"
            height="37.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor5"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel5"
            className={doorMessage.doorLabel5 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-2"
              data-name="Rectangle 537"
              className="cls-64"
              x="715.59"
              y="178.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-6" data-name="SERIAL 1" className="cls-22">
              <text className="cls-73" transform="translate(735.83 198.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-74" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-75" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-74" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-66" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-74" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
          <text
            id="Door7"
            className="DoorLabelText"
            transform="translate(929 100)"
          >
            DOOR 7
          </text>
          <g
            className={`${
              data && data.doorSensors[6].status.color
            } doorSensorSVG`}
          >
            <g className="cls-76">
              <g
                id="LINE_TEXTURE-3"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-77">
                  <g id="LINE_REPEAT-3" data-name="LINE REPEAT">
                    <line
                      id="Line_15-3-3"
                      data-name="Line 15"
                      className="cls-62"
                      x1="1015.27"
                      y1="90.48"
                      x2="939.82"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-2-4"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="1015.27"
                      y1="93.9"
                      x2="939.82"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-3-4"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="1015.27"
                      y1="97.33"
                      x2="939.82"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-4-3"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="1015.27"
                      y1="100.75"
                      x2="939.82"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-5-3"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="1015.27"
                      y1="104.17"
                      x2="939.82"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-6-3"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="1011.84"
                      y1="90.48"
                      x2="936.39"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-7-3"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="1011.84"
                      y1="93.9"
                      x2="936.39"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-8-3"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="1011.84"
                      y1="97.33"
                      x2="936.39"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-9-3"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="1011.84"
                      y1="100.75"
                      x2="936.39"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-10-3"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="1011.84"
                      y1="104.17"
                      x2="936.39"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-11-3"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="1008.41"
                      y1="90.48"
                      x2="932.96"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-12-3"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="1008.41"
                      y1="93.9"
                      x2="932.96"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-13-3"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="1008.41"
                      y1="97.33"
                      x2="932.96"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-14-3"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="1008.41"
                      y1="100.75"
                      x2="932.96"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-15-3"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="1008.41"
                      y1="104.17"
                      x2="932.96"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-16-3"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="1004.98"
                      y1="90.48"
                      x2="929.53"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-17-3"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="1004.98"
                      y1="93.9"
                      x2="929.53"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-18-3"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="1004.98"
                      y1="97.33"
                      x2="929.53"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-19-3"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="1004.98"
                      y1="100.75"
                      x2="929.53"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-20-3"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="1004.98"
                      y1="104.17"
                      x2="929.53"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-21-3"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="1001.55"
                      y1="90.48"
                      x2="926.1"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-22-3"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="1001.55"
                      y1="93.9"
                      x2="926.1"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-23-3"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="1001.55"
                      y1="97.33"
                      x2="926.1"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-24-3"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="1001.55"
                      y1="100.75"
                      x2="926.1"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-25-3"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="1001.55"
                      y1="104.17"
                      x2="926.1"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-26-3"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="998.12"
                      y1="90.48"
                      x2="922.67"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-27-3"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="998.12"
                      y1="93.9"
                      x2="922.67"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-28-3"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="998.12"
                      y1="97.33"
                      x2="922.67"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-29-3"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="998.12"
                      y1="100.75"
                      x2="922.67"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-30-3"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="998.12"
                      y1="104.17"
                      x2="922.67"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-31-3"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="994.69"
                      y1="90.48"
                      x2="919.24"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-32-3"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="994.69"
                      y1="93.9"
                      x2="919.24"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-33-3"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="994.69"
                      y1="97.33"
                      x2="919.24"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-34-3"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="994.69"
                      y1="100.75"
                      x2="919.24"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-35-3"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="994.69"
                      y1="104.17"
                      x2="919.24"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-36-3"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="991.26"
                      y1="90.48"
                      x2="915.81"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-37-3"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="991.26"
                      y1="93.9"
                      x2="915.81"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-38-3"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="991.26"
                      y1="97.33"
                      x2="915.81"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-39-3"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="991.26"
                      y1="100.75"
                      x2="915.81"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-40-3"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="991.26"
                      y1="104.17"
                      x2="915.81"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-41-3"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="987.83"
                      y1="90.48"
                      x2="912.38"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-42-3"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="987.83"
                      y1="93.9"
                      x2="912.38"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-43-3"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="987.83"
                      y1="97.33"
                      x2="912.38"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-44-3"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="987.83"
                      y1="100.75"
                      x2="912.38"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-45-3"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="987.83"
                      y1="104.17"
                      x2="912.38"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-46-3"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="984.4"
                      y1="90.48"
                      x2="908.95"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-47-3"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="984.4"
                      y1="93.9"
                      x2="908.95"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-48-3"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="984.4"
                      y1="97.33"
                      x2="908.95"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-49-3"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="984.4"
                      y1="100.75"
                      x2="908.95"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-50-3"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="984.4"
                      y1="104.17"
                      x2="908.95"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-51-3"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="980.97"
                      y1="90.48"
                      x2="905.52"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-52-3"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="980.97"
                      y1="93.9"
                      x2="905.52"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-53-3"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="980.97"
                      y1="97.33"
                      x2="905.52"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-54-3"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="980.97"
                      y1="100.75"
                      x2="905.52"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-55-3"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="980.97"
                      y1="104.17"
                      x2="905.52"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-56-3"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="977.54"
                      y1="90.48"
                      x2="902.09"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-57-3"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="977.54"
                      y1="93.9"
                      x2="902.09"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-58-3"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="977.54"
                      y1="97.33"
                      x2="902.09"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-59-3"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="977.54"
                      y1="100.75"
                      x2="902.09"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-60-3"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="977.54"
                      y1="104.17"
                      x2="902.09"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-61-3"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="974.11"
                      y1="90.48"
                      x2="898.66"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-62-3"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="974.11"
                      y1="93.9"
                      x2="898.66"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-63-3"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="974.11"
                      y1="97.33"
                      x2="898.66"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-64-3"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="974.11"
                      y1="100.75"
                      x2="898.66"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-65-3"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="974.11"
                      y1="104.17"
                      x2="898.66"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-66-3"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="970.68"
                      y1="90.48"
                      x2="895.23"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-67-3"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="970.68"
                      y1="93.9"
                      x2="895.23"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-68-3"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="970.68"
                      y1="97.33"
                      x2="895.23"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-69-3"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="970.68"
                      y1="100.75"
                      x2="895.23"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-70-3"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="970.68"
                      y1="104.17"
                      x2="895.23"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-71-3"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="967.25"
                      y1="90.48"
                      x2="891.8"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-72-3"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="967.25"
                      y1="93.9"
                      x2="891.8"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-73-3"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="967.25"
                      y1="97.33"
                      x2="891.8"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-74-3"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="967.25"
                      y1="100.75"
                      x2="891.8"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-75-3"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="967.25"
                      y1="104.17"
                      x2="891.8"
                      y2="66.5"
                    />
                    <line
                      id="Line_15-76-3"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="963.82"
                      y1="90.48"
                      x2="888.38"
                      y2="52.8"
                    />
                    <line
                      id="Line_15-77-3"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="963.82"
                      y1="93.9"
                      x2="888.38"
                      y2="56.23"
                    />
                    <line
                      id="Line_15-78-3"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="963.82"
                      y1="97.33"
                      x2="888.38"
                      y2="59.65"
                    />
                    <line
                      id="Line_15-79-3"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="963.82"
                      y1="100.75"
                      x2="888.38"
                      y2="63.08"
                    />
                    <line
                      id="Line_15-80-3"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="963.82"
                      y1="104.17"
                      x2="888.38"
                      y2="66.5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="929.55"
            y="73.35"
            width="54.83"
            height="37.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor7"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel7"
            className={doorMessage.doorLabel7 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-3"
              data-name="Rectangle 537"
              className="cls-64"
              x="884.59"
              y="28.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-7-5" data-name="SERIAL 1" className="cls-22">
              <text className="cls-73" transform="translate(904.83 48.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-74" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-75" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-74" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-66" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-74" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>

          <g
            className={`${
              data && data.doorSensors[0].status.color
            } doorSensorSVG`}
          >
            <g className="cls-78">
              <g
                id="LINE_TEXTURE-4"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-79">
                  <g id="LINE_REPEAT-4" data-name="LINE REPEAT">
                    <line
                      id="Line_15-4-4"
                      data-name="Line 15"
                      className="cls-62"
                      x1="355.27"
                      y1="379.48"
                      x2="279.82"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-2-5"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="355.27"
                      y1="382.9"
                      x2="279.82"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-3-5"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="355.27"
                      y1="386.33"
                      x2="279.82"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-4-5"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="355.27"
                      y1="389.75"
                      x2="279.82"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-5-4"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="355.27"
                      y1="393.17"
                      x2="279.82"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-6-4"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="351.84"
                      y1="379.48"
                      x2="276.39"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-7-4"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="351.84"
                      y1="382.9"
                      x2="276.39"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-8-4"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="351.84"
                      y1="386.33"
                      x2="276.39"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-9-4"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="351.84"
                      y1="389.75"
                      x2="276.39"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-10-4"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="351.84"
                      y1="393.17"
                      x2="276.39"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-11-4"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="348.41"
                      y1="379.48"
                      x2="272.96"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-12-4"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="348.41"
                      y1="382.9"
                      x2="272.96"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-13-4"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="348.41"
                      y1="386.33"
                      x2="272.96"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-14-4"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="348.41"
                      y1="389.75"
                      x2="272.96"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-15-4"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="348.41"
                      y1="393.17"
                      x2="272.96"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-16-4"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="344.98"
                      y1="379.48"
                      x2="269.53"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-17-4"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="344.98"
                      y1="382.9"
                      x2="269.53"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-18-4"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="344.98"
                      y1="386.33"
                      x2="269.53"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-19-4"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="344.98"
                      y1="389.75"
                      x2="269.53"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-20-4"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="344.98"
                      y1="393.17"
                      x2="269.53"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-21-4"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="341.55"
                      y1="379.48"
                      x2="266.1"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-22-4"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="341.55"
                      y1="382.9"
                      x2="266.1"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-23-4"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="341.55"
                      y1="386.33"
                      x2="266.1"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-24-4"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="341.55"
                      y1="389.75"
                      x2="266.1"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-25-4"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="341.55"
                      y1="393.17"
                      x2="266.1"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-26-4"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="338.12"
                      y1="379.48"
                      x2="262.67"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-27-4"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="338.12"
                      y1="382.9"
                      x2="262.67"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-28-4"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="338.12"
                      y1="386.33"
                      x2="262.67"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-29-4"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="338.12"
                      y1="389.75"
                      x2="262.67"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-30-4"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="338.12"
                      y1="393.17"
                      x2="262.67"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-31-4"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="334.69"
                      y1="379.48"
                      x2="259.24"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-32-4"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="334.69"
                      y1="382.9"
                      x2="259.24"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-33-4"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="334.69"
                      y1="386.33"
                      x2="259.24"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-34-4"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="334.69"
                      y1="389.75"
                      x2="259.24"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-35-4"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="334.69"
                      y1="393.17"
                      x2="259.24"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-36-4"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="331.26"
                      y1="379.48"
                      x2="255.81"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-37-4"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="331.26"
                      y1="382.9"
                      x2="255.81"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-38-4"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="331.26"
                      y1="386.33"
                      x2="255.81"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-39-4"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="331.26"
                      y1="389.75"
                      x2="255.81"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-40-4"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="331.26"
                      y1="393.17"
                      x2="255.81"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-41-4"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="327.83"
                      y1="379.48"
                      x2="252.38"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-42-4"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="327.83"
                      y1="382.9"
                      x2="252.38"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-43-4"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="327.83"
                      y1="386.33"
                      x2="252.38"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-44-4"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="327.83"
                      y1="389.75"
                      x2="252.38"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-45-4"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="327.83"
                      y1="393.17"
                      x2="252.38"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-46-4"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="324.4"
                      y1="379.48"
                      x2="248.95"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-47-4"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="324.4"
                      y1="382.9"
                      x2="248.95"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-48-4"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="324.4"
                      y1="386.33"
                      x2="248.95"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-49-4"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="324.4"
                      y1="389.75"
                      x2="248.95"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-50-4"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="324.4"
                      y1="393.17"
                      x2="248.95"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-51-4"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="320.97"
                      y1="379.48"
                      x2="245.52"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-52-4"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="320.97"
                      y1="382.9"
                      x2="245.52"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-53-4"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="320.97"
                      y1="386.33"
                      x2="245.52"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-54-4"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="320.97"
                      y1="389.75"
                      x2="245.52"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-55-4"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="320.97"
                      y1="393.17"
                      x2="245.52"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-56-4"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="317.54"
                      y1="379.48"
                      x2="242.09"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-57-4"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="317.54"
                      y1="382.9"
                      x2="242.09"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-58-4"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="317.54"
                      y1="386.33"
                      x2="242.09"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-59-4"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="317.54"
                      y1="389.75"
                      x2="242.09"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-60-4"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="317.54"
                      y1="393.17"
                      x2="242.09"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-61-4"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="314.11"
                      y1="379.48"
                      x2="238.66"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-62-4"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="314.11"
                      y1="382.9"
                      x2="238.66"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-63-4"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="314.11"
                      y1="386.33"
                      x2="238.66"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-64-4"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="314.11"
                      y1="389.75"
                      x2="238.66"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-65-4"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="314.11"
                      y1="393.17"
                      x2="238.66"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-66-4"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="310.68"
                      y1="379.48"
                      x2="235.23"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-67-4"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="310.68"
                      y1="382.9"
                      x2="235.23"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-68-4"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="310.68"
                      y1="386.33"
                      x2="235.23"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-69-4"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="310.68"
                      y1="389.75"
                      x2="235.23"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-70-4"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="310.68"
                      y1="393.17"
                      x2="235.23"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-71-4"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="307.25"
                      y1="379.48"
                      x2="231.8"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-72-4"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="307.25"
                      y1="382.9"
                      x2="231.8"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-73-4"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="307.25"
                      y1="386.33"
                      x2="231.8"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-74-4"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="307.25"
                      y1="389.75"
                      x2="231.8"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-75-4"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="307.25"
                      y1="393.17"
                      x2="231.8"
                      y2="355.5"
                    />
                    <line
                      id="Line_15-76-4"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="303.82"
                      y1="379.48"
                      x2="228.38"
                      y2="341.8"
                    />
                    <line
                      id="Line_15-77-4"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="303.82"
                      y1="382.9"
                      x2="228.38"
                      y2="345.23"
                    />
                    <line
                      id="Line_15-78-4"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="303.82"
                      y1="386.33"
                      x2="228.38"
                      y2="348.65"
                    />
                    <line
                      id="Line_15-79-4"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="303.82"
                      y1="389.75"
                      x2="228.38"
                      y2="352.08"
                    />
                    <line
                      id="Line_15-80-4"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="303.82"
                      y1="393.17"
                      x2="228.38"
                      y2="355.5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="269.55"
            y="362.35"
            width="54.83"
            height="37.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor1"
            data-type="DoorSensor"
          ></rect>
          <text
            id="Door1"
            className="DoorLabelText"
            transform="translate(271 391)"
          >
            DOOR 1
          </text>
          <g
            id="doorLabel1"
            className={doorMessage.doorLabel1 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-4"
              data-name="Rectangle 537"
              className="cls-64"
              x="225.59"
              y="317.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-8-5" data-name="SERIAL 1" className="cls-22">
              <text className="cls-65" transform="translate(245.83 337.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-68" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-69" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-70" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-66" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-68" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
          <text
            id="Door3"
            className="DoorLabelText"
            transform="translate(461 317) rotate(90)"
          >
            DOOR 3
          </text>
          <g
            className={`${
              data && data.doorSensors[2].status.color
            } doorSensorSVG`}
          >
            <g className="cls-80">
              <g
                id="LINE_TEXTURE-5"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-81">
                  <g id="LINE_REPEAT-5" data-name="LINE REPEAT">
                    <line
                      id="Line_15-5-5"
                      data-name="Line 15"
                      className="cls-62"
                      x1="470.78"
                      y1="401.47"
                      x2="509.93"
                      y2="326.77"
                    />
                    <line
                      id="Line_15-2-6"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="467.36"
                      y1="401.4"
                      x2="506.5"
                      y2="326.71"
                    />
                    <line
                      id="Line_15-3-6"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="463.93"
                      y1="401.33"
                      x2="503.08"
                      y2="326.64"
                    />
                    <line
                      id="Line_15-4-6"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="460.51"
                      y1="401.27"
                      x2="499.66"
                      y2="326.57"
                    />
                    <line
                      id="Line_15-5-6"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="457.08"
                      y1="401.2"
                      x2="496.23"
                      y2="326.5"
                    />
                    <line
                      id="Line_15-6-5"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="470.85"
                      y1="398.04"
                      x2="510"
                      y2="323.35"
                    />
                    <line
                      id="Line_15-7-5"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="467.42"
                      y1="397.97"
                      x2="506.57"
                      y2="323.28"
                    />
                    <line
                      id="Line_15-8-5"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="464"
                      y1="397.9"
                      x2="503.15"
                      y2="323.21"
                    />
                    <line
                      id="Line_15-9-5"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="460.58"
                      y1="397.84"
                      x2="499.72"
                      y2="323.14"
                    />
                    <line
                      id="Line_15-10-5"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="457.15"
                      y1="397.77"
                      x2="496.3"
                      y2="323.08"
                    />
                    <line
                      id="Line_15-11-5"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="470.92"
                      y1="394.61"
                      x2="510.06"
                      y2="319.92"
                    />
                    <line
                      id="Line_15-12-5"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="467.49"
                      y1="394.54"
                      x2="506.64"
                      y2="319.85"
                    />
                    <line
                      id="Line_15-13-5"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="464.07"
                      y1="394.48"
                      x2="503.21"
                      y2="319.78"
                    />
                    <line
                      id="Line_15-14-5"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="460.64"
                      y1="394.41"
                      x2="499.79"
                      y2="319.71"
                    />
                    <line
                      id="Line_15-15-5"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="457.22"
                      y1="394.34"
                      x2="496.37"
                      y2="319.65"
                    />
                    <line
                      id="Line_15-16-5"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="470.98"
                      y1="391.18"
                      x2="510.13"
                      y2="316.49"
                    />
                    <line
                      id="Line_15-17-5"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="467.56"
                      y1="391.11"
                      x2="506.71"
                      y2="316.42"
                    />
                    <line
                      id="Line_15-18-5"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="464.13"
                      y1="391.05"
                      x2="503.28"
                      y2="316.35"
                    />
                    <line
                      id="Line_15-19-5"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="460.71"
                      y1="390.98"
                      x2="499.86"
                      y2="316.29"
                    />
                    <line
                      id="Line_15-20-5"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="457.29"
                      y1="390.91"
                      x2="496.43"
                      y2="316.22"
                    />
                    <line
                      id="Line_15-21-5"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="471.05"
                      y1="387.75"
                      x2="510.2"
                      y2="313.06"
                    />
                    <line
                      id="Line_15-22-5"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="467.63"
                      y1="387.69"
                      x2="506.77"
                      y2="312.99"
                    />
                    <line
                      id="Line_15-23-5"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="464.2"
                      y1="387.62"
                      x2="503.35"
                      y2="312.92"
                    />
                    <line
                      id="Line_15-24-5"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="460.78"
                      y1="387.55"
                      x2="499.92"
                      y2="312.86"
                    />
                    <line
                      id="Line_15-25-5"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="457.35"
                      y1="387.48"
                      x2="496.5"
                      y2="312.79"
                    />
                    <line
                      id="Line_15-26-5"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="471.12"
                      y1="384.32"
                      x2="510.26"
                      y2="309.63"
                    />
                    <line
                      id="Line_15-27-5"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="467.69"
                      y1="384.26"
                      x2="506.84"
                      y2="309.56"
                    />
                    <line
                      id="Line_15-28-5"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="464.27"
                      y1="384.19"
                      x2="503.42"
                      y2="309.5"
                    />
                    <line
                      id="Line_15-29-5"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="460.85"
                      y1="384.12"
                      x2="499.99"
                      y2="309.43"
                    />
                    <line
                      id="Line_15-30-5"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="457.42"
                      y1="384.05"
                      x2="496.57"
                      y2="309.36"
                    />
                    <line
                      id="Line_15-31-5"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="471.19"
                      y1="380.9"
                      x2="510.33"
                      y2="306.2"
                    />
                    <line
                      id="Line_15-32-5"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="467.76"
                      y1="380.83"
                      x2="506.91"
                      y2="306.13"
                    />
                    <line
                      id="Line_15-33-5"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="464.34"
                      y1="380.76"
                      x2="503.48"
                      y2="306.07"
                    />
                    <line
                      id="Line_15-34-5"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="460.91"
                      y1="380.69"
                      x2="500.06"
                      y2="306"
                    />
                    <line
                      id="Line_15-35-5"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="457.49"
                      y1="380.63"
                      x2="496.64"
                      y2="305.93"
                    />
                    <line
                      id="Line_15-36-5"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="471.25"
                      y1="377.47"
                      x2="510.4"
                      y2="302.77"
                    />
                    <line
                      id="Line_15-37-5"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="467.83"
                      y1="377.4"
                      x2="506.97"
                      y2="302.7"
                    />
                    <line
                      id="Line_15-38-5"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="464.4"
                      y1="377.33"
                      x2="503.55"
                      y2="302.64"
                    />
                    <line
                      id="Line_15-39-5"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="460.98"
                      y1="377.26"
                      x2="500.13"
                      y2="302.57"
                    />
                    <line
                      id="Line_15-40-5"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="457.56"
                      y1="377.2"
                      x2="496.7"
                      y2="302.5"
                    />
                    <line
                      id="Line_15-41-5"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="471.32"
                      y1="374.04"
                      x2="510.47"
                      y2="299.34"
                    />
                    <line
                      id="Line_15-42-5"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="467.9"
                      y1="373.97"
                      x2="507.04"
                      y2="299.28"
                    />
                    <line
                      id="Line_15-43-5"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="464.47"
                      y1="373.9"
                      x2="503.62"
                      y2="299.21"
                    />
                    <line
                      id="Line_15-44-5"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="461.05"
                      y1="373.84"
                      x2="500.19"
                      y2="299.14"
                    />
                    <line
                      id="Line_15-45-5"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="457.62"
                      y1="373.77"
                      x2="496.77"
                      y2="299.07"
                    />
                    <line
                      id="Line_15-46-5"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="471.39"
                      y1="370.61"
                      x2="510.53"
                      y2="295.91"
                    />
                    <line
                      id="Line_15-47-5"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="467.96"
                      y1="370.54"
                      x2="507.11"
                      y2="295.85"
                    />
                    <line
                      id="Line_15-48-5"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="464.54"
                      y1="370.47"
                      x2="503.69"
                      y2="295.78"
                    />
                    <line
                      id="Line_15-49-5"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="461.11"
                      y1="370.41"
                      x2="500.26"
                      y2="295.71"
                    />
                    <line
                      id="Line_15-50-5"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="457.69"
                      y1="370.34"
                      x2="496.84"
                      y2="295.65"
                    />
                    <line
                      id="Line_15-51-5"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="471.45"
                      y1="367.18"
                      x2="510.6"
                      y2="292.49"
                    />
                    <line
                      id="Line_15-52-5"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="468.03"
                      y1="367.11"
                      x2="507.18"
                      y2="292.42"
                    />
                    <line
                      id="Line_15-53-5"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="464.61"
                      y1="367.05"
                      x2="503.75"
                      y2="292.35"
                    />
                    <line
                      id="Line_15-54-5"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="461.18"
                      y1="366.98"
                      x2="500.33"
                      y2="292.28"
                    />
                    <line
                      id="Line_15-55-5"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="457.76"
                      y1="366.91"
                      x2="496.9"
                      y2="292.22"
                    />
                    <line
                      id="Line_15-56-5"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="471.52"
                      y1="363.75"
                      x2="510.67"
                      y2="289.06"
                    />
                    <line
                      id="Line_15-57-5"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="468.1"
                      y1="363.68"
                      x2="507.24"
                      y2="288.99"
                    />
                    <line
                      id="Line_15-58-5"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="464.67"
                      y1="363.62"
                      x2="503.82"
                      y2="288.92"
                    />
                    <line
                      id="Line_15-59-5"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="461.25"
                      y1="363.55"
                      x2="500.4"
                      y2="288.86"
                    />
                    <line
                      id="Line_15-60-5"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="457.83"
                      y1="363.48"
                      x2="496.97"
                      y2="288.79"
                    />
                    <line
                      id="Line_15-61-5"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="471.59"
                      y1="360.32"
                      x2="510.74"
                      y2="285.63"
                    />
                    <line
                      id="Line_15-62-5"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="468.16"
                      y1="360.26"
                      x2="507.31"
                      y2="285.56"
                    />
                    <line
                      id="Line_15-63-5"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="464.74"
                      y1="360.19"
                      x2="503.89"
                      y2="285.49"
                    />
                    <line
                      id="Line_15-64-5"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="461.32"
                      y1="360.12"
                      x2="500.46"
                      y2="285.43"
                    />
                    <line
                      id="Line_15-65-5"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="457.89"
                      y1="360.05"
                      x2="497.04"
                      y2="285.36"
                    />
                    <line
                      id="Line_15-66-5"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="471.66"
                      y1="356.89"
                      x2="510.8"
                      y2="282.2"
                    />
                    <line
                      id="Line_15-67-5"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="468.23"
                      y1="356.83"
                      x2="507.38"
                      y2="282.13"
                    />
                    <line
                      id="Line_15-68-5"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="464.81"
                      y1="356.76"
                      x2="503.95"
                      y2="282.06"
                    />
                    <line
                      id="Line_15-69-5"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="461.38"
                      y1="356.69"
                      x2="500.53"
                      y2="282"
                    />
                    <line
                      id="Line_15-70-5"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="457.96"
                      y1="356.62"
                      x2="497.11"
                      y2="281.93"
                    />
                    <line
                      id="Line_15-71-5"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="471.72"
                      y1="353.46"
                      x2="510.87"
                      y2="278.77"
                    />
                    <line
                      id="Line_15-72-5"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="468.3"
                      y1="353.4"
                      x2="507.45"
                      y2="278.7"
                    />
                    <line
                      id="Line_15-73-5"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="464.88"
                      y1="353.33"
                      x2="504.02"
                      y2="278.64"
                    />
                    <line
                      id="Line_15-74-5"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="461.45"
                      y1="353.26"
                      x2="500.6"
                      y2="278.57"
                    />
                    <line
                      id="Line_15-75-5"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="458.03"
                      y1="353.2"
                      x2="497.17"
                      y2="278.5"
                    />
                    <line
                      id="Line_15-76-5"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="471.79"
                      y1="350.04"
                      x2="510.94"
                      y2="275.34"
                    />
                    <line
                      id="Line_15-77-5"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="468.37"
                      y1="349.97"
                      x2="507.51"
                      y2="275.27"
                    />
                    <line
                      id="Line_15-78-5"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="464.94"
                      y1="349.9"
                      x2="504.09"
                      y2="275.21"
                    />
                    <line
                      id="Line_15-79-5"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="461.52"
                      y1="349.83"
                      x2="500.67"
                      y2="275.14"
                    />
                    <line
                      id="Line_15-80-5"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="458.09"
                      y1="349.77"
                      x2="497.24"
                      y2="275.07"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="455.55"
            y="315.35"
            width="35.83"
            height="60.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor3"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel3"
            className={doorMessage.doorLabel3 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-5"
              data-name="Rectangle 537"
              className="cls-64"
              x="413.59"
              y="273.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-9" data-name="SERIAL 1" className="cls-22">
              <text className="cls-65" transform="translate(433.83 293.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-68" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-69" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-70" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-69" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-74" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
          <text
            id="Door6"
            className="DoorLabelText"
            transform="translate(893 363) rotate(90)"
          >
            DOOR 6
          </text>
          <g
            className={`${
              data && data.doorSensors[5].status.color
            } doorSensorSVG`}
          >
            <g className="cls-82">
              <g
                id="LINE_TEXTURE-6"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-83">
                  <g id="LINE_REPEAT-6" data-name="LINE REPEAT">
                    <line
                      id="Line_15-6-6"
                      data-name="Line 15"
                      className="cls-62"
                      x1="900.78"
                      y1="446.47"
                      x2="939.93"
                      y2="371.77"
                    />
                    <line
                      id="Line_15-2-7"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="897.36"
                      y1="446.4"
                      x2="936.5"
                      y2="371.71"
                    />
                    <line
                      id="Line_15-3-7"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="893.93"
                      y1="446.33"
                      x2="933.08"
                      y2="371.64"
                    />
                    <line
                      id="Line_15-4-7"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="890.51"
                      y1="446.27"
                      x2="929.66"
                      y2="371.57"
                    />
                    <line
                      id="Line_15-5-7"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="887.08"
                      y1="446.2"
                      x2="926.23"
                      y2="371.5"
                    />
                    <line
                      id="Line_15-6-7"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="900.85"
                      y1="443.04"
                      x2="940"
                      y2="368.35"
                    />
                    <line
                      id="Line_15-7-6"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="897.42"
                      y1="442.97"
                      x2="936.57"
                      y2="368.28"
                    />
                    <line
                      id="Line_15-8-6"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="894"
                      y1="442.9"
                      x2="933.15"
                      y2="368.21"
                    />
                    <line
                      id="Line_15-9-6"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="890.58"
                      y1="442.84"
                      x2="929.72"
                      y2="368.14"
                    />
                    <line
                      id="Line_15-10-6"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="887.15"
                      y1="442.77"
                      x2="926.3"
                      y2="368.08"
                    />
                    <line
                      id="Line_15-11-6"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="900.92"
                      y1="439.61"
                      x2="940.06"
                      y2="364.92"
                    />
                    <line
                      id="Line_15-12-6"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="897.49"
                      y1="439.54"
                      x2="936.64"
                      y2="364.85"
                    />
                    <line
                      id="Line_15-13-6"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="894.07"
                      y1="439.48"
                      x2="933.21"
                      y2="364.78"
                    />
                    <line
                      id="Line_15-14-6"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="890.64"
                      y1="439.41"
                      x2="929.79"
                      y2="364.71"
                    />
                    <line
                      id="Line_15-15-6"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="887.22"
                      y1="439.34"
                      x2="926.37"
                      y2="364.65"
                    />
                    <line
                      id="Line_15-16-6"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="900.98"
                      y1="436.18"
                      x2="940.13"
                      y2="361.49"
                    />
                    <line
                      id="Line_15-17-6"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="897.56"
                      y1="436.11"
                      x2="936.71"
                      y2="361.42"
                    />
                    <line
                      id="Line_15-18-6"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="894.13"
                      y1="436.05"
                      x2="933.28"
                      y2="361.35"
                    />
                    <line
                      id="Line_15-19-6"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="890.71"
                      y1="435.98"
                      x2="929.86"
                      y2="361.29"
                    />
                    <line
                      id="Line_15-20-6"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="887.29"
                      y1="435.91"
                      x2="926.43"
                      y2="361.22"
                    />
                    <line
                      id="Line_15-21-6"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="901.05"
                      y1="432.75"
                      x2="940.2"
                      y2="358.06"
                    />
                    <line
                      id="Line_15-22-6"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="897.63"
                      y1="432.69"
                      x2="936.77"
                      y2="357.99"
                    />
                    <line
                      id="Line_15-23-6"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="894.2"
                      y1="432.62"
                      x2="933.35"
                      y2="357.92"
                    />
                    <line
                      id="Line_15-24-6"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="890.78"
                      y1="432.55"
                      x2="929.92"
                      y2="357.86"
                    />
                    <line
                      id="Line_15-25-6"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="887.35"
                      y1="432.48"
                      x2="926.5"
                      y2="357.79"
                    />
                    <line
                      id="Line_15-26-6"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="901.12"
                      y1="429.32"
                      x2="940.26"
                      y2="354.63"
                    />
                    <line
                      id="Line_15-27-6"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="897.69"
                      y1="429.26"
                      x2="936.84"
                      y2="354.56"
                    />
                    <line
                      id="Line_15-28-6"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="894.27"
                      y1="429.19"
                      x2="933.42"
                      y2="354.5"
                    />
                    <line
                      id="Line_15-29-6"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="890.85"
                      y1="429.12"
                      x2="929.99"
                      y2="354.43"
                    />
                    <line
                      id="Line_15-30-6"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="887.42"
                      y1="429.05"
                      x2="926.57"
                      y2="354.36"
                    />
                    <line
                      id="Line_15-31-6"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="901.19"
                      y1="425.9"
                      x2="940.33"
                      y2="351.2"
                    />
                    <line
                      id="Line_15-32-6"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="897.76"
                      y1="425.83"
                      x2="936.91"
                      y2="351.13"
                    />
                    <line
                      id="Line_15-33-6"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="894.34"
                      y1="425.76"
                      x2="933.48"
                      y2="351.07"
                    />
                    <line
                      id="Line_15-34-6"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="890.91"
                      y1="425.69"
                      x2="930.06"
                      y2="351"
                    />
                    <line
                      id="Line_15-35-6"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="887.49"
                      y1="425.63"
                      x2="926.64"
                      y2="350.93"
                    />
                    <line
                      id="Line_15-36-6"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="901.25"
                      y1="422.47"
                      x2="940.4"
                      y2="347.77"
                    />
                    <line
                      id="Line_15-37-6"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="897.83"
                      y1="422.4"
                      x2="936.97"
                      y2="347.7"
                    />
                    <line
                      id="Line_15-38-6"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="894.4"
                      y1="422.33"
                      x2="933.55"
                      y2="347.64"
                    />
                    <line
                      id="Line_15-39-6"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="890.98"
                      y1="422.26"
                      x2="930.13"
                      y2="347.57"
                    />
                    <line
                      id="Line_15-40-6"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="887.56"
                      y1="422.2"
                      x2="926.7"
                      y2="347.5"
                    />
                    <line
                      id="Line_15-41-6"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="901.32"
                      y1="419.04"
                      x2="940.47"
                      y2="344.34"
                    />
                    <line
                      id="Line_15-42-6"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="897.9"
                      y1="418.97"
                      x2="937.04"
                      y2="344.28"
                    />
                    <line
                      id="Line_15-43-6"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="894.47"
                      y1="418.9"
                      x2="933.62"
                      y2="344.21"
                    />
                    <line
                      id="Line_15-44-6"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="891.05"
                      y1="418.84"
                      x2="930.19"
                      y2="344.14"
                    />
                    <line
                      id="Line_15-45-6"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="887.62"
                      y1="418.77"
                      x2="926.77"
                      y2="344.07"
                    />
                    <line
                      id="Line_15-46-6"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="901.39"
                      y1="415.61"
                      x2="940.53"
                      y2="340.91"
                    />
                    <line
                      id="Line_15-47-6"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="897.96"
                      y1="415.54"
                      x2="937.11"
                      y2="340.85"
                    />
                    <line
                      id="Line_15-48-6"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="894.54"
                      y1="415.47"
                      x2="933.69"
                      y2="340.78"
                    />
                    <line
                      id="Line_15-49-6"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="891.11"
                      y1="415.41"
                      x2="930.26"
                      y2="340.71"
                    />
                    <line
                      id="Line_15-50-6"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="887.69"
                      y1="415.34"
                      x2="926.84"
                      y2="340.65"
                    />
                    <line
                      id="Line_15-51-6"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="901.45"
                      y1="412.18"
                      x2="940.6"
                      y2="337.49"
                    />
                    <line
                      id="Line_15-52-6"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="898.03"
                      y1="412.11"
                      x2="937.18"
                      y2="337.42"
                    />
                    <line
                      id="Line_15-53-6"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="894.61"
                      y1="412.05"
                      x2="933.75"
                      y2="337.35"
                    />
                    <line
                      id="Line_15-54-6"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="891.18"
                      y1="411.98"
                      x2="930.33"
                      y2="337.28"
                    />
                    <line
                      id="Line_15-55-6"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="887.76"
                      y1="411.91"
                      x2="926.9"
                      y2="337.22"
                    />
                    <line
                      id="Line_15-56-6"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="901.52"
                      y1="408.75"
                      x2="940.67"
                      y2="334.06"
                    />
                    <line
                      id="Line_15-57-6"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="898.1"
                      y1="408.68"
                      x2="937.24"
                      y2="333.99"
                    />
                    <line
                      id="Line_15-58-6"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="894.67"
                      y1="408.62"
                      x2="933.82"
                      y2="333.92"
                    />
                    <line
                      id="Line_15-59-6"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="891.25"
                      y1="408.55"
                      x2="930.4"
                      y2="333.86"
                    />
                    <line
                      id="Line_15-60-6"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="887.83"
                      y1="408.48"
                      x2="926.97"
                      y2="333.79"
                    />
                    <line
                      id="Line_15-61-6"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="901.59"
                      y1="405.32"
                      x2="940.74"
                      y2="330.63"
                    />
                    <line
                      id="Line_15-62-6"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="898.16"
                      y1="405.26"
                      x2="937.31"
                      y2="330.56"
                    />
                    <line
                      id="Line_15-63-6"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="894.74"
                      y1="405.19"
                      x2="933.89"
                      y2="330.49"
                    />
                    <line
                      id="Line_15-64-6"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="891.32"
                      y1="405.12"
                      x2="930.46"
                      y2="330.43"
                    />
                    <line
                      id="Line_15-65-6"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="887.89"
                      y1="405.05"
                      x2="927.04"
                      y2="330.36"
                    />
                    <line
                      id="Line_15-66-6"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="901.66"
                      y1="401.89"
                      x2="940.8"
                      y2="327.2"
                    />
                    <line
                      id="Line_15-67-6"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="898.23"
                      y1="401.83"
                      x2="937.38"
                      y2="327.13"
                    />
                    <line
                      id="Line_15-68-6"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="894.81"
                      y1="401.76"
                      x2="933.95"
                      y2="327.06"
                    />
                    <line
                      id="Line_15-69-6"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="891.38"
                      y1="401.69"
                      x2="930.53"
                      y2="327"
                    />
                    <line
                      id="Line_15-70-6"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="887.96"
                      y1="401.62"
                      x2="927.11"
                      y2="326.93"
                    />
                    <line
                      id="Line_15-71-6"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="901.72"
                      y1="398.46"
                      x2="940.87"
                      y2="323.77"
                    />
                    <line
                      id="Line_15-72-6"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="898.3"
                      y1="398.4"
                      x2="937.45"
                      y2="323.7"
                    />
                    <line
                      id="Line_15-73-6"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="894.88"
                      y1="398.33"
                      x2="934.02"
                      y2="323.64"
                    />
                    <line
                      id="Line_15-74-6"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="891.45"
                      y1="398.26"
                      x2="930.6"
                      y2="323.57"
                    />
                    <line
                      id="Line_15-75-6"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="888.03"
                      y1="398.2"
                      x2="927.17"
                      y2="323.5"
                    />
                    <line
                      id="Line_15-76-6"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="901.79"
                      y1="395.04"
                      x2="940.94"
                      y2="320.34"
                    />
                    <line
                      id="Line_15-77-6"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="898.37"
                      y1="394.97"
                      x2="937.51"
                      y2="320.27"
                    />
                    <line
                      id="Line_15-78-6"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="894.94"
                      y1="394.9"
                      x2="934.09"
                      y2="320.21"
                    />
                    <line
                      id="Line_15-79-6"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="891.52"
                      y1="394.83"
                      x2="930.67"
                      y2="320.14"
                    />
                    <line
                      id="Line_15-80-6"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="888.09"
                      y1="394.77"
                      x2="927.24"
                      y2="320.07"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="885.55"
            y="360.35"
            width="35.83"
            height="60.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor6"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel6"
            className={doorMessage.doorLabel6 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-6"
              data-name="Rectangle 537"
              className="cls-64"
              x="917.69"
              y="367.76"
              width="127.8"
              height="39.74"
            />
            <g id="SERIAL_1-10" data-name="SERIAL 1" className="cls-22">
              <text className="cls-84" transform="translate(935.91 385.97)">
                DOUBL
                <tspan className="cls-85" x="43.27" y="0">
                  E
                </tspan>
                <tspan x="51.26" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-86">
                  <tspan x="-1.59" y="12.6">
                    T
                  </tspan>
                  <tspan className="cls-87" x="6" y="12.6">
                    O{" "}
                  </tspan>
                  <tspan className="cls-88" x="18.54" y="12.6">
                    F
                  </tspan>
                  <tspan className="cls-87" x="26.31" y="12.6">
                    ORCE O
                  </tspan>
                  <tspan className="cls-89" x="73.34" y="12.6">
                    P
                  </tspan>
                  <tspan className="cls-90" x="81.8" y="12.6">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
          <text
            id="Door4"
            className="DoorLabelText"
            transform="translate(530 103)"
          >
            DOOR 4
          </text>
          <g
            className={`${
              data && data.doorSensors[3].status.color
            } doorSensorSVG`}
          >
            <g className="cls-91">
              <g
                id="LINE_TEXTURE-7"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-92">
                  <g id="LINE_REPEAT-7" data-name="LINE REPEAT">
                    <line
                      id="Line_15-7-7"
                      data-name="Line 15"
                      className="cls-62"
                      x1="614.27"
                      y1="93.48"
                      x2="538.82"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-2-8"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="614.27"
                      y1="96.9"
                      x2="538.82"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-3-8"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="614.27"
                      y1="100.33"
                      x2="538.82"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-4-8"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="614.27"
                      y1="103.75"
                      x2="538.82"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-5-8"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="614.27"
                      y1="107.17"
                      x2="538.82"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-6-8"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="610.84"
                      y1="93.48"
                      x2="535.39"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-7-8"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="610.84"
                      y1="96.9"
                      x2="535.39"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-8-7"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="610.84"
                      y1="100.33"
                      x2="535.39"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-9-7"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="610.84"
                      y1="103.75"
                      x2="535.39"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-10-7"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="610.84"
                      y1="107.17"
                      x2="535.39"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-11-7"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="607.41"
                      y1="93.48"
                      x2="531.96"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-12-7"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="607.41"
                      y1="96.9"
                      x2="531.96"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-13-7"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="607.41"
                      y1="100.33"
                      x2="531.96"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-14-7"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="607.41"
                      y1="103.75"
                      x2="531.96"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-15-7"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="607.41"
                      y1="107.17"
                      x2="531.96"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-16-7"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="603.98"
                      y1="93.48"
                      x2="528.53"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-17-7"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="603.98"
                      y1="96.9"
                      x2="528.53"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-18-7"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="603.98"
                      y1="100.33"
                      x2="528.53"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-19-7"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="603.98"
                      y1="103.75"
                      x2="528.53"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-20-7"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="603.98"
                      y1="107.17"
                      x2="528.53"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-21-7"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="600.55"
                      y1="93.48"
                      x2="525.1"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-22-7"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="600.55"
                      y1="96.9"
                      x2="525.1"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-23-7"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="600.55"
                      y1="100.33"
                      x2="525.1"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-24-7"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="600.55"
                      y1="103.75"
                      x2="525.1"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-25-7"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="600.55"
                      y1="107.17"
                      x2="525.1"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-26-7"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="597.12"
                      y1="93.48"
                      x2="521.67"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-27-7"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="597.12"
                      y1="96.9"
                      x2="521.67"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-28-7"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="597.12"
                      y1="100.33"
                      x2="521.67"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-29-7"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="597.12"
                      y1="103.75"
                      x2="521.67"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-30-7"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="597.12"
                      y1="107.17"
                      x2="521.67"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-31-7"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="593.69"
                      y1="93.48"
                      x2="518.24"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-32-7"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="593.69"
                      y1="96.9"
                      x2="518.24"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-33-7"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="593.69"
                      y1="100.33"
                      x2="518.24"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-34-7"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="593.69"
                      y1="103.75"
                      x2="518.24"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-35-7"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="593.69"
                      y1="107.17"
                      x2="518.24"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-36-7"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="590.26"
                      y1="93.48"
                      x2="514.81"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-37-7"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="590.26"
                      y1="96.9"
                      x2="514.81"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-38-7"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="590.26"
                      y1="100.33"
                      x2="514.81"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-39-7"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="590.26"
                      y1="103.75"
                      x2="514.81"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-40-7"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="590.26"
                      y1="107.17"
                      x2="514.81"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-41-7"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="586.83"
                      y1="93.48"
                      x2="511.38"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-42-7"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="586.83"
                      y1="96.9"
                      x2="511.38"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-43-7"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="586.83"
                      y1="100.33"
                      x2="511.38"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-44-7"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="586.83"
                      y1="103.75"
                      x2="511.38"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-45-7"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="586.83"
                      y1="107.17"
                      x2="511.38"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-46-7"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="583.4"
                      y1="93.48"
                      x2="507.95"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-47-7"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="583.4"
                      y1="96.9"
                      x2="507.95"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-48-7"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="583.4"
                      y1="100.33"
                      x2="507.95"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-49-7"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="583.4"
                      y1="103.75"
                      x2="507.95"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-50-7"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="583.4"
                      y1="107.17"
                      x2="507.95"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-51-7"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="579.97"
                      y1="93.48"
                      x2="504.52"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-52-7"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="579.97"
                      y1="96.9"
                      x2="504.52"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-53-7"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="579.97"
                      y1="100.33"
                      x2="504.52"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-54-7"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="579.97"
                      y1="103.75"
                      x2="504.52"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-55-7"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="579.97"
                      y1="107.17"
                      x2="504.52"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-56-7"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="576.54"
                      y1="93.48"
                      x2="501.09"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-57-7"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="576.54"
                      y1="96.9"
                      x2="501.09"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-58-7"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="576.54"
                      y1="100.33"
                      x2="501.09"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-59-7"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="576.54"
                      y1="103.75"
                      x2="501.09"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-60-7"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="576.54"
                      y1="107.17"
                      x2="501.09"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-61-7"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="573.11"
                      y1="93.48"
                      x2="497.66"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-62-7"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="573.11"
                      y1="96.9"
                      x2="497.66"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-63-7"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="573.11"
                      y1="100.33"
                      x2="497.66"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-64-7"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="573.11"
                      y1="103.75"
                      x2="497.66"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-65-7"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="573.11"
                      y1="107.17"
                      x2="497.66"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-66-7"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="569.68"
                      y1="93.48"
                      x2="494.23"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-67-7"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="569.68"
                      y1="96.9"
                      x2="494.23"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-68-7"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="569.68"
                      y1="100.33"
                      x2="494.23"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-69-7"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="569.68"
                      y1="103.75"
                      x2="494.23"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-70-7"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="569.68"
                      y1="107.17"
                      x2="494.23"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-71-7"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="566.25"
                      y1="93.48"
                      x2="490.8"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-72-7"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="566.25"
                      y1="96.9"
                      x2="490.8"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-73-7"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="566.25"
                      y1="100.33"
                      x2="490.8"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-74-7"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="566.25"
                      y1="103.75"
                      x2="490.8"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-75-7"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="566.25"
                      y1="107.17"
                      x2="490.8"
                      y2="69.5"
                    />
                    <line
                      id="Line_15-76-7"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="562.82"
                      y1="93.48"
                      x2="487.38"
                      y2="55.8"
                    />
                    <line
                      id="Line_15-77-7"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="562.82"
                      y1="96.9"
                      x2="487.38"
                      y2="59.23"
                    />
                    <line
                      id="Line_15-78-7"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="562.82"
                      y1="100.33"
                      x2="487.38"
                      y2="62.65"
                    />
                    <line
                      id="Line_15-79-7"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="562.82"
                      y1="103.75"
                      x2="487.38"
                      y2="66.08"
                    />
                    <line
                      id="Line_15-80-7"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="562.82"
                      y1="107.17"
                      x2="487.38"
                      y2="69.5"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            class="doorSensorClick"
            x="530.55"
            y="77.35"
            width="54.83"
            height="37.08"
            onClick={(e) => {
              tryToOpenDoor(e);
            }}
            onDoubleClick={(e) => {
              forceOpenDoor(e);
            }}
            id="DoorSensor4"
            data-type="DoorSensor"
          ></rect>
          <g
            id="doorLabel4"
            className={doorMessage.doorLabel4 ? "doorLabelSvg" : "cls-63"}
          >
            <rect
              id="Rectangle_537-7"
              data-name="Rectangle 537"
              className="cls-64"
              x="486.59"
              y="33.55"
              width="142"
              height="44.16"
            />
            <g id="SERIAL_1-11" data-name="SERIAL 1" className="cls-22">
              <text className="cls-65" transform="translate(506.83 53.79)">
                DOUBL
                <tspan className="cls-66" x="48.08" y="0">
                  E
                </tspan>
                <tspan className="cls-68" x="56.95" y="0">
                  -CLICK{" "}
                </tspan>
                <tspan className="cls-67">
                  <tspan x="-1.77" y="14">
                    T
                  </tspan>
                  <tspan className="cls-74" x="6.67" y="14">
                    O{" "}
                  </tspan>
                  <tspan className="cls-66" x="20.6" y="14">
                    F
                  </tspan>
                  <tspan className="cls-68" x="29.24" y="14">
                    ORCE O
                  </tspan>
                  <tspan className="cls-66" x="81.49" y="14">
                    P
                  </tspan>
                  <tspan className="cls-68" x="90.89" y="14">
                    EN
                  </tspan>
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g id="Labels">
          <rect
            id="AlarmAlert1"
            data-name="Rectangle 537"
            className={
              data && data.alarms[0].status.currentStatus === "Alert"
                ? "cls-64 alarmAlert"
                : "cls-64"
            }
            x="173"
            y="25.02"
            width="180"
            height="44.16"
          />
          <g id="SERIAL_1-12" data-name="SERIAL 1" className="cls-22">
            <text className="cls-93" transform="translate(217.23 37.26)">
              ALARM{" "}
              <tspan className="cls-94" x="26.77" y="0">
                SY
              </tspan>
              <tspan className="cls-95" x="35.72" y="0">
                S
              </tspan>
              <tspan x="40.29" y="0">
                TEM
              </tspan>
            </text>
          </g>
          <g id="AUX.SYSTEM.1" className="cls-22">
            <text className="cls-96" transform="translate(217.23 57.96)">
              SY
              <tspan className="cls-97" x="25.13" y="0">
                S
              </tspan>
              <tspan className="cls-98" x="38.03" y="0">
                .
              </tspan>
              <tspan className="cls-99" x="42.85" y="0">
                Z
              </tspan>
              <tspan className="cls-98" x="55.17" y="0">
                ONE
              </tspan>
              <tspan className="cls-100" x="96.28" y="0">
                .
              </tspan>
              <tspan className="cls-98" x="99.65" y="0">
                1
              </tspan>
            </text>
          </g>
          <g id="alarmZone1">
            <g className="cls-101">
              <g
                id="LINE_TEXTURE-8"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-102">
                  <g id="LINE_REPEAT-8" data-name="LINE REPEAT">
                    <line
                      id="Line_15-8-8"
                      data-name="Line 15"
                      className="cls-62"
                      x1="200.61"
                      y1="0.18"
                      x2="139.89"
                      y2="60.9"
                    />
                    <line
                      id="Line_15-2-9"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="206.13"
                      y1="0.18"
                      x2="145.41"
                      y2="60.9"
                    />
                    <line
                      id="Line_15-3-9"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="211.65"
                      y1="0.18"
                      x2="150.93"
                      y2="60.9"
                    />
                    <line
                      id="Line_15-4-9"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="217.17"
                      y1="0.18"
                      x2="156.45"
                      y2="60.9"
                    />
                    <line
                      id="Line_15-5-9"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="222.69"
                      y1="0.18"
                      x2="161.97"
                      y2="60.9"
                    />
                    <line
                      id="Line_15-6-9"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="200.61"
                      y1="2.94"
                      x2="139.89"
                      y2="63.66"
                    />
                    <line
                      id="Line_15-7-9"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="206.13"
                      y1="2.94"
                      x2="145.41"
                      y2="63.66"
                    />
                    <line
                      id="Line_15-8-9"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="211.65"
                      y1="2.94"
                      x2="150.93"
                      y2="63.66"
                    />
                    <line
                      id="Line_15-9-8"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="217.17"
                      y1="2.94"
                      x2="156.45"
                      y2="63.66"
                    />
                    <line
                      id="Line_15-10-8"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="222.69"
                      y1="2.94"
                      x2="161.97"
                      y2="63.66"
                    />
                    <line
                      id="Line_15-11-8"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="200.61"
                      y1="5.7"
                      x2="139.89"
                      y2="66.42"
                    />
                    <line
                      id="Line_15-12-8"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="206.13"
                      y1="5.7"
                      x2="145.41"
                      y2="66.42"
                    />
                    <line
                      id="Line_15-13-8"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="211.65"
                      y1="5.7"
                      x2="150.93"
                      y2="66.42"
                    />
                    <line
                      id="Line_15-14-8"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="217.17"
                      y1="5.7"
                      x2="156.45"
                      y2="66.42"
                    />
                    <line
                      id="Line_15-15-8"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="222.69"
                      y1="5.7"
                      x2="161.97"
                      y2="66.42"
                    />
                    <line
                      id="Line_15-16-8"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="200.61"
                      y1="8.46"
                      x2="139.89"
                      y2="69.18"
                    />
                    <line
                      id="Line_15-17-8"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="206.13"
                      y1="8.46"
                      x2="145.41"
                      y2="69.18"
                    />
                    <line
                      id="Line_15-18-8"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="211.65"
                      y1="8.46"
                      x2="150.93"
                      y2="69.18"
                    />
                    <line
                      id="Line_15-19-8"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="217.17"
                      y1="8.46"
                      x2="156.45"
                      y2="69.18"
                    />
                    <line
                      id="Line_15-20-8"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="222.69"
                      y1="8.46"
                      x2="161.97"
                      y2="69.18"
                    />
                    <line
                      id="Line_15-21-8"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="200.61"
                      y1="11.22"
                      x2="139.89"
                      y2="71.94"
                    />
                    <line
                      id="Line_15-22-8"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="206.13"
                      y1="11.22"
                      x2="145.41"
                      y2="71.94"
                    />
                    <line
                      id="Line_15-23-8"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="211.65"
                      y1="11.22"
                      x2="150.93"
                      y2="71.94"
                    />
                    <line
                      id="Line_15-24-8"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="217.17"
                      y1="11.22"
                      x2="156.45"
                      y2="71.94"
                    />
                    <line
                      id="Line_15-25-8"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="222.69"
                      y1="11.22"
                      x2="161.97"
                      y2="71.94"
                    />
                    <line
                      id="Line_15-26-8"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="200.61"
                      y1="13.98"
                      x2="139.89"
                      y2="74.7"
                    />
                    <line
                      id="Line_15-27-8"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="206.13"
                      y1="13.98"
                      x2="145.41"
                      y2="74.7"
                    />
                    <line
                      id="Line_15-28-8"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="211.65"
                      y1="13.98"
                      x2="150.93"
                      y2="74.7"
                    />
                    <line
                      id="Line_15-29-8"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="217.17"
                      y1="13.98"
                      x2="156.45"
                      y2="74.7"
                    />
                    <line
                      id="Line_15-30-8"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="222.69"
                      y1="13.98"
                      x2="161.97"
                      y2="74.7"
                    />
                    <line
                      id="Line_15-31-8"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="200.61"
                      y1="16.74"
                      x2="139.89"
                      y2="77.46"
                    />
                    <line
                      id="Line_15-32-8"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="206.13"
                      y1="16.74"
                      x2="145.41"
                      y2="77.46"
                    />
                    <line
                      id="Line_15-33-8"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="211.65"
                      y1="16.74"
                      x2="150.93"
                      y2="77.46"
                    />
                    <line
                      id="Line_15-34-8"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="217.17"
                      y1="16.74"
                      x2="156.45"
                      y2="77.46"
                    />
                    <line
                      id="Line_15-35-8"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="222.69"
                      y1="16.74"
                      x2="161.97"
                      y2="77.46"
                    />
                    <line
                      id="Line_15-36-8"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="200.61"
                      y1="19.5"
                      x2="139.89"
                      y2="80.22"
                    />
                    <line
                      id="Line_15-37-8"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="206.13"
                      y1="19.5"
                      x2="145.41"
                      y2="80.22"
                    />
                    <line
                      id="Line_15-38-8"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="211.65"
                      y1="19.5"
                      x2="150.93"
                      y2="80.22"
                    />
                    <line
                      id="Line_15-39-8"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="217.17"
                      y1="19.5"
                      x2="156.45"
                      y2="80.22"
                    />
                    <line
                      id="Line_15-40-8"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="222.69"
                      y1="19.5"
                      x2="161.97"
                      y2="80.22"
                    />
                    <line
                      id="Line_15-41-8"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="200.61"
                      y1="22.26"
                      x2="139.89"
                      y2="82.98"
                    />
                    <line
                      id="Line_15-42-8"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="206.13"
                      y1="22.26"
                      x2="145.41"
                      y2="82.98"
                    />
                    <line
                      id="Line_15-43-8"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="211.65"
                      y1="22.26"
                      x2="150.93"
                      y2="82.98"
                    />
                    <line
                      id="Line_15-44-8"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="217.17"
                      y1="22.26"
                      x2="156.45"
                      y2="82.98"
                    />
                    <line
                      id="Line_15-45-8"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="222.69"
                      y1="22.26"
                      x2="161.97"
                      y2="82.98"
                    />
                    <line
                      id="Line_15-46-8"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="200.61"
                      y1="25.02"
                      x2="139.89"
                      y2="85.74"
                    />
                    <line
                      id="Line_15-47-8"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="206.13"
                      y1="25.02"
                      x2="145.41"
                      y2="85.74"
                    />
                    <line
                      id="Line_15-48-8"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="211.65"
                      y1="25.02"
                      x2="150.93"
                      y2="85.74"
                    />
                    <line
                      id="Line_15-49-8"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="217.17"
                      y1="25.02"
                      x2="156.45"
                      y2="85.74"
                    />
                    <line
                      id="Line_15-50-8"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="222.69"
                      y1="25.02"
                      x2="161.97"
                      y2="85.74"
                    />
                    <line
                      id="Line_15-51-8"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="200.61"
                      y1="27.78"
                      x2="139.89"
                      y2="88.5"
                    />
                    <line
                      id="Line_15-52-8"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="206.13"
                      y1="27.78"
                      x2="145.41"
                      y2="88.5"
                    />
                    <line
                      id="Line_15-53-8"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="211.65"
                      y1="27.78"
                      x2="150.93"
                      y2="88.5"
                    />
                    <line
                      id="Line_15-54-8"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="217.17"
                      y1="27.78"
                      x2="156.45"
                      y2="88.5"
                    />
                    <line
                      id="Line_15-55-8"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="222.69"
                      y1="27.78"
                      x2="161.97"
                      y2="88.5"
                    />
                    <line
                      id="Line_15-56-8"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="200.61"
                      y1="30.54"
                      x2="139.89"
                      y2="91.26"
                    />
                    <line
                      id="Line_15-57-8"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="206.13"
                      y1="30.54"
                      x2="145.41"
                      y2="91.26"
                    />
                    <line
                      id="Line_15-58-8"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="211.65"
                      y1="30.54"
                      x2="150.93"
                      y2="91.26"
                    />
                    <line
                      id="Line_15-59-8"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="217.17"
                      y1="30.54"
                      x2="156.45"
                      y2="91.26"
                    />
                    <line
                      id="Line_15-60-8"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="222.69"
                      y1="30.54"
                      x2="161.97"
                      y2="91.26"
                    />
                    <line
                      id="Line_15-61-8"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="200.61"
                      y1="33.3"
                      x2="139.89"
                      y2="94.02"
                    />
                    <line
                      id="Line_15-62-8"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="206.13"
                      y1="33.3"
                      x2="145.41"
                      y2="94.02"
                    />
                    <line
                      id="Line_15-63-8"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="211.65"
                      y1="33.3"
                      x2="150.93"
                      y2="94.02"
                    />
                    <line
                      id="Line_15-64-8"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="217.17"
                      y1="33.3"
                      x2="156.45"
                      y2="94.02"
                    />
                    <line
                      id="Line_15-65-8"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="222.69"
                      y1="33.3"
                      x2="161.97"
                      y2="94.02"
                    />
                    <line
                      id="Line_15-66-8"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="200.61"
                      y1="36.06"
                      x2="139.89"
                      y2="96.78"
                    />
                    <line
                      id="Line_15-67-8"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="206.13"
                      y1="36.06"
                      x2="145.41"
                      y2="96.78"
                    />
                    <line
                      id="Line_15-68-8"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="211.65"
                      y1="36.06"
                      x2="150.93"
                      y2="96.78"
                    />
                    <line
                      id="Line_15-69-8"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="217.17"
                      y1="36.06"
                      x2="156.45"
                      y2="96.78"
                    />
                    <line
                      id="Line_15-70-8"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="222.69"
                      y1="36.06"
                      x2="161.97"
                      y2="96.78"
                    />
                    <line
                      id="Line_15-71-8"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="200.61"
                      y1="38.82"
                      x2="139.89"
                      y2="99.54"
                    />
                    <line
                      id="Line_15-72-8"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="206.13"
                      y1="38.82"
                      x2="145.41"
                      y2="99.54"
                    />
                    <line
                      id="Line_15-73-8"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="211.65"
                      y1="38.82"
                      x2="150.93"
                      y2="99.54"
                    />
                    <line
                      id="Line_15-74-8"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="217.17"
                      y1="38.82"
                      x2="156.45"
                      y2="99.54"
                    />
                    <line
                      id="Line_15-75-8"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="222.69"
                      y1="38.82"
                      x2="161.97"
                      y2="99.54"
                    />
                    <line
                      id="Line_15-76-8"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="200.61"
                      y1="41.58"
                      x2="139.89"
                      y2="102.3"
                    />
                    <line
                      id="Line_15-77-8"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="206.13"
                      y1="41.58"
                      x2="145.41"
                      y2="102.3"
                    />
                    <line
                      id="Line_15-78-8"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="211.65"
                      y1="41.58"
                      x2="150.93"
                      y2="102.3"
                    />
                    <line
                      id="Line_15-79-8"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="217.17"
                      y1="41.58"
                      x2="156.45"
                      y2="102.3"
                    />
                    <line
                      id="Line_15-80-8"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="222.69"
                      y1="41.58"
                      x2="161.97"
                      y2="102.3"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            id="AlarmAlert2"
            data-name="Rectangle 537"
            className={
              data && data.alarms[1].status.currentStatus === "Alert"
                ? "cls-64 alarmAlert"
                : "cls-64"
            }
            x="396"
            y="189.02"
            width="180"
            height="44.16"
          />
          <text className="cls-93" transform="translate(440.23 201.26)">
            ALARM{" "}
            <tspan className="cls-94" x="26.77" y="0">
              SY
            </tspan>
            <tspan className="cls-95" x="35.72" y="0">
              S
            </tspan>
            <tspan x="40.29" y="0">
              TEM
            </tspan>
          </text>
          <text className="cls-96" transform="translate(440.23 221.96)">
            SY
            <tspan className="cls-97" x="25.13" y="0">
              S
            </tspan>
            <tspan className="cls-98" x="38.03" y="0">
              .
            </tspan>
            <tspan className="cls-99" x="42.85" y="0">
              Z
            </tspan>
            <tspan className="cls-98" x="55.17" y="0">
              ONE.2
            </tspan>
          </text>
          <g id="alarmZone2">
            <g className="cls-103">
              <g
                id="LINE_TEXTURE-9"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-104">
                  <g id="LINE_REPEAT-9" data-name="LINE REPEAT">
                    <line
                      id="Line_15-9-9"
                      data-name="Line 15"
                      className="cls-62"
                      x1="423.61"
                      y1="164.18"
                      x2="362.89"
                      y2="224.9"
                    />
                    <line
                      id="Line_15-2-10"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="429.13"
                      y1="164.18"
                      x2="368.41"
                      y2="224.9"
                    />
                    <line
                      id="Line_15-3-10"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="434.65"
                      y1="164.18"
                      x2="373.93"
                      y2="224.9"
                    />
                    <line
                      id="Line_15-4-10"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="440.17"
                      y1="164.18"
                      x2="379.45"
                      y2="224.9"
                    />
                    <line
                      id="Line_15-5-10"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="445.69"
                      y1="164.18"
                      x2="384.97"
                      y2="224.9"
                    />
                    <line
                      id="Line_15-6-10"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="423.61"
                      y1="166.94"
                      x2="362.89"
                      y2="227.66"
                    />
                    <line
                      id="Line_15-7-10"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="429.13"
                      y1="166.94"
                      x2="368.41"
                      y2="227.66"
                    />
                    <line
                      id="Line_15-8-10"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="434.65"
                      y1="166.94"
                      x2="373.93"
                      y2="227.66"
                    />
                    <line
                      id="Line_15-9-10"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="440.17"
                      y1="166.94"
                      x2="379.45"
                      y2="227.66"
                    />
                    <line
                      id="Line_15-10-9"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="445.69"
                      y1="166.94"
                      x2="384.97"
                      y2="227.66"
                    />
                    <line
                      id="Line_15-11-9"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="423.61"
                      y1="169.7"
                      x2="362.89"
                      y2="230.42"
                    />
                    <line
                      id="Line_15-12-9"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="429.13"
                      y1="169.7"
                      x2="368.41"
                      y2="230.42"
                    />
                    <line
                      id="Line_15-13-9"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="434.65"
                      y1="169.7"
                      x2="373.93"
                      y2="230.42"
                    />
                    <line
                      id="Line_15-14-9"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="440.17"
                      y1="169.7"
                      x2="379.45"
                      y2="230.42"
                    />
                    <line
                      id="Line_15-15-9"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="445.69"
                      y1="169.7"
                      x2="384.97"
                      y2="230.42"
                    />
                    <line
                      id="Line_15-16-9"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="423.61"
                      y1="172.46"
                      x2="362.89"
                      y2="233.18"
                    />
                    <line
                      id="Line_15-17-9"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="429.13"
                      y1="172.46"
                      x2="368.41"
                      y2="233.18"
                    />
                    <line
                      id="Line_15-18-9"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="434.65"
                      y1="172.46"
                      x2="373.93"
                      y2="233.18"
                    />
                    <line
                      id="Line_15-19-9"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="440.17"
                      y1="172.46"
                      x2="379.45"
                      y2="233.18"
                    />
                    <line
                      id="Line_15-20-9"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="445.69"
                      y1="172.46"
                      x2="384.97"
                      y2="233.18"
                    />
                    <line
                      id="Line_15-21-9"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="423.61"
                      y1="175.22"
                      x2="362.89"
                      y2="235.94"
                    />
                    <line
                      id="Line_15-22-9"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="429.13"
                      y1="175.22"
                      x2="368.41"
                      y2="235.94"
                    />
                    <line
                      id="Line_15-23-9"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="434.65"
                      y1="175.22"
                      x2="373.93"
                      y2="235.94"
                    />
                    <line
                      id="Line_15-24-9"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="440.17"
                      y1="175.22"
                      x2="379.45"
                      y2="235.94"
                    />
                    <line
                      id="Line_15-25-9"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="445.69"
                      y1="175.22"
                      x2="384.97"
                      y2="235.94"
                    />
                    <line
                      id="Line_15-26-9"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="423.61"
                      y1="177.98"
                      x2="362.89"
                      y2="238.7"
                    />
                    <line
                      id="Line_15-27-9"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="429.13"
                      y1="177.98"
                      x2="368.41"
                      y2="238.7"
                    />
                    <line
                      id="Line_15-28-9"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="434.65"
                      y1="177.98"
                      x2="373.93"
                      y2="238.7"
                    />
                    <line
                      id="Line_15-29-9"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="440.17"
                      y1="177.98"
                      x2="379.45"
                      y2="238.7"
                    />
                    <line
                      id="Line_15-30-9"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="445.69"
                      y1="177.98"
                      x2="384.97"
                      y2="238.7"
                    />
                    <line
                      id="Line_15-31-9"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="423.61"
                      y1="180.74"
                      x2="362.89"
                      y2="241.46"
                    />
                    <line
                      id="Line_15-32-9"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="429.13"
                      y1="180.74"
                      x2="368.41"
                      y2="241.46"
                    />
                    <line
                      id="Line_15-33-9"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="434.65"
                      y1="180.74"
                      x2="373.93"
                      y2="241.46"
                    />
                    <line
                      id="Line_15-34-9"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="440.17"
                      y1="180.74"
                      x2="379.45"
                      y2="241.46"
                    />
                    <line
                      id="Line_15-35-9"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="445.69"
                      y1="180.74"
                      x2="384.97"
                      y2="241.46"
                    />
                    <line
                      id="Line_15-36-9"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="423.61"
                      y1="183.5"
                      x2="362.89"
                      y2="244.22"
                    />
                    <line
                      id="Line_15-37-9"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="429.13"
                      y1="183.5"
                      x2="368.41"
                      y2="244.22"
                    />
                    <line
                      id="Line_15-38-9"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="434.65"
                      y1="183.5"
                      x2="373.93"
                      y2="244.22"
                    />
                    <line
                      id="Line_15-39-9"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="440.17"
                      y1="183.5"
                      x2="379.45"
                      y2="244.22"
                    />
                    <line
                      id="Line_15-40-9"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="445.69"
                      y1="183.5"
                      x2="384.97"
                      y2="244.22"
                    />
                    <line
                      id="Line_15-41-9"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="423.61"
                      y1="186.26"
                      x2="362.89"
                      y2="246.98"
                    />
                    <line
                      id="Line_15-42-9"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="429.13"
                      y1="186.26"
                      x2="368.41"
                      y2="246.98"
                    />
                    <line
                      id="Line_15-43-9"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="434.65"
                      y1="186.26"
                      x2="373.93"
                      y2="246.98"
                    />
                    <line
                      id="Line_15-44-9"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="440.17"
                      y1="186.26"
                      x2="379.45"
                      y2="246.98"
                    />
                    <line
                      id="Line_15-45-9"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="445.69"
                      y1="186.26"
                      x2="384.97"
                      y2="246.98"
                    />
                    <line
                      id="Line_15-46-9"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="423.61"
                      y1="189.02"
                      x2="362.89"
                      y2="249.74"
                    />
                    <line
                      id="Line_15-47-9"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="429.13"
                      y1="189.02"
                      x2="368.41"
                      y2="249.74"
                    />
                    <line
                      id="Line_15-48-9"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="434.65"
                      y1="189.02"
                      x2="373.93"
                      y2="249.74"
                    />
                    <line
                      id="Line_15-49-9"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="440.17"
                      y1="189.02"
                      x2="379.45"
                      y2="249.74"
                    />
                    <line
                      id="Line_15-50-9"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="445.69"
                      y1="189.02"
                      x2="384.97"
                      y2="249.74"
                    />
                    <line
                      id="Line_15-51-9"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="423.61"
                      y1="191.78"
                      x2="362.89"
                      y2="252.5"
                    />
                    <line
                      id="Line_15-52-9"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="429.13"
                      y1="191.78"
                      x2="368.41"
                      y2="252.5"
                    />
                    <line
                      id="Line_15-53-9"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="434.65"
                      y1="191.78"
                      x2="373.93"
                      y2="252.5"
                    />
                    <line
                      id="Line_15-54-9"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="440.17"
                      y1="191.78"
                      x2="379.45"
                      y2="252.5"
                    />
                    <line
                      id="Line_15-55-9"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="445.69"
                      y1="191.78"
                      x2="384.97"
                      y2="252.5"
                    />
                    <line
                      id="Line_15-56-9"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="423.61"
                      y1="194.54"
                      x2="362.89"
                      y2="255.26"
                    />
                    <line
                      id="Line_15-57-9"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="429.13"
                      y1="194.54"
                      x2="368.41"
                      y2="255.26"
                    />
                    <line
                      id="Line_15-58-9"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="434.65"
                      y1="194.54"
                      x2="373.93"
                      y2="255.26"
                    />
                    <line
                      id="Line_15-59-9"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="440.17"
                      y1="194.54"
                      x2="379.45"
                      y2="255.26"
                    />
                    <line
                      id="Line_15-60-9"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="445.69"
                      y1="194.54"
                      x2="384.97"
                      y2="255.26"
                    />
                    <line
                      id="Line_15-61-9"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="423.61"
                      y1="197.3"
                      x2="362.89"
                      y2="258.02"
                    />
                    <line
                      id="Line_15-62-9"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="429.13"
                      y1="197.3"
                      x2="368.41"
                      y2="258.02"
                    />
                    <line
                      id="Line_15-63-9"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="434.65"
                      y1="197.3"
                      x2="373.93"
                      y2="258.02"
                    />
                    <line
                      id="Line_15-64-9"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="440.17"
                      y1="197.3"
                      x2="379.45"
                      y2="258.02"
                    />
                    <line
                      id="Line_15-65-9"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="445.69"
                      y1="197.3"
                      x2="384.97"
                      y2="258.02"
                    />
                    <line
                      id="Line_15-66-9"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="423.61"
                      y1="200.06"
                      x2="362.89"
                      y2="260.78"
                    />
                    <line
                      id="Line_15-67-9"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="429.13"
                      y1="200.06"
                      x2="368.41"
                      y2="260.78"
                    />
                    <line
                      id="Line_15-68-9"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="434.65"
                      y1="200.06"
                      x2="373.93"
                      y2="260.78"
                    />
                    <line
                      id="Line_15-69-9"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="440.17"
                      y1="200.06"
                      x2="379.45"
                      y2="260.78"
                    />
                    <line
                      id="Line_15-70-9"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="445.69"
                      y1="200.06"
                      x2="384.97"
                      y2="260.78"
                    />
                    <line
                      id="Line_15-71-9"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="423.61"
                      y1="202.82"
                      x2="362.89"
                      y2="263.54"
                    />
                    <line
                      id="Line_15-72-9"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="429.13"
                      y1="202.82"
                      x2="368.41"
                      y2="263.54"
                    />
                    <line
                      id="Line_15-73-9"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="434.65"
                      y1="202.82"
                      x2="373.93"
                      y2="263.54"
                    />
                    <line
                      id="Line_15-74-9"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="440.17"
                      y1="202.82"
                      x2="379.45"
                      y2="263.54"
                    />
                    <line
                      id="Line_15-75-9"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="445.69"
                      y1="202.82"
                      x2="384.97"
                      y2="263.54"
                    />
                    <line
                      id="Line_15-76-9"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="423.61"
                      y1="205.58"
                      x2="362.89"
                      y2="266.3"
                    />
                    <line
                      id="Line_15-77-9"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="429.13"
                      y1="205.58"
                      x2="368.41"
                      y2="266.3"
                    />
                    <line
                      id="Line_15-78-9"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="434.65"
                      y1="205.58"
                      x2="373.93"
                      y2="266.3"
                    />
                    <line
                      id="Line_15-79-9"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="440.17"
                      y1="205.58"
                      x2="379.45"
                      y2="266.3"
                    />
                    <line
                      id="Line_15-80-9"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="445.69"
                      y1="205.58"
                      x2="384.97"
                      y2="266.3"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            id="AlarmAlert4"
            data-name="Rectangle 537"
            className={
              data && data.alarms[3].status.currentStatus === "Alert"
                ? "cls-64 alarmAlert"
                : "cls-64"
            }
            x="866"
            y="474.02"
            width="169"
            height="44.16"
          />
          <g id="SERIAL_1-13" data-name="SERIAL 1" className="cls-22">
            <text className="cls-93" transform="translate(910.23 486.26)">
              ALARM{" "}
              <tspan className="cls-94" x="26.77" y="0">
                SY
              </tspan>
              <tspan className="cls-95" x="35.72" y="0">
                S
              </tspan>
              <tspan x="40.29" y="0">
                TEM
              </tspan>
            </text>
          </g>
          <g id="AUX.SYSTEM.1-2" data-name="AUX.SYSTEM.1" className="cls-22">
            <text className="cls-96" transform="translate(910.23 506.96)">
              SY
              <tspan className="cls-97" x="25.13" y="0">
                S
              </tspan>
              <tspan className="cls-98" x="38.03" y="0">
                .
              </tspan>
              <tspan className="cls-99" x="42.85" y="0">
                Z
              </tspan>
              <tspan className="cls-98" x="55.17" y="0">
                ONE
              </tspan>
              <tspan className="cls-105" x="96.28" y="0">
                .
              </tspan>
              <tspan className="cls-98" x="100.68" y="0">
                4
              </tspan>
            </text>
          </g>
          <g id="alarmZone4">
            <g className="cls-106">
              <g
                id="LINE_TEXTURE-10"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-107">
                  <g id="LINE_REPEAT-10" data-name="LINE REPEAT">
                    <line
                      id="Line_15-10-10"
                      data-name="Line 15"
                      className="cls-62"
                      x1="893.61"
                      y1="449.18"
                      x2="832.89"
                      y2="509.9"
                    />
                    <line
                      id="Line_15-2-11"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="899.13"
                      y1="449.18"
                      x2="838.41"
                      y2="509.9"
                    />
                    <line
                      id="Line_15-3-11"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="904.65"
                      y1="449.18"
                      x2="843.93"
                      y2="509.9"
                    />
                    <line
                      id="Line_15-4-11"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="910.17"
                      y1="449.18"
                      x2="849.45"
                      y2="509.9"
                    />
                    <line
                      id="Line_15-5-11"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="915.69"
                      y1="449.18"
                      x2="854.97"
                      y2="509.9"
                    />
                    <line
                      id="Line_15-6-11"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="893.61"
                      y1="451.94"
                      x2="832.89"
                      y2="512.66"
                    />
                    <line
                      id="Line_15-7-11"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="899.13"
                      y1="451.94"
                      x2="838.41"
                      y2="512.66"
                    />
                    <line
                      id="Line_15-8-11"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="904.65"
                      y1="451.94"
                      x2="843.93"
                      y2="512.66"
                    />
                    <line
                      id="Line_15-9-11"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="910.17"
                      y1="451.94"
                      x2="849.45"
                      y2="512.66"
                    />
                    <line
                      id="Line_15-10-11"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="915.69"
                      y1="451.94"
                      x2="854.97"
                      y2="512.66"
                    />
                    <line
                      id="Line_15-11-10"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="893.61"
                      y1="454.7"
                      x2="832.89"
                      y2="515.42"
                    />
                    <line
                      id="Line_15-12-10"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="899.13"
                      y1="454.7"
                      x2="838.41"
                      y2="515.42"
                    />
                    <line
                      id="Line_15-13-10"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="904.65"
                      y1="454.7"
                      x2="843.93"
                      y2="515.42"
                    />
                    <line
                      id="Line_15-14-10"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="910.17"
                      y1="454.7"
                      x2="849.45"
                      y2="515.42"
                    />
                    <line
                      id="Line_15-15-10"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="915.69"
                      y1="454.7"
                      x2="854.97"
                      y2="515.42"
                    />
                    <line
                      id="Line_15-16-10"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="893.61"
                      y1="457.46"
                      x2="832.89"
                      y2="518.18"
                    />
                    <line
                      id="Line_15-17-10"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="899.13"
                      y1="457.46"
                      x2="838.41"
                      y2="518.18"
                    />
                    <line
                      id="Line_15-18-10"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="904.65"
                      y1="457.46"
                      x2="843.93"
                      y2="518.18"
                    />
                    <line
                      id="Line_15-19-10"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="910.17"
                      y1="457.46"
                      x2="849.45"
                      y2="518.18"
                    />
                    <line
                      id="Line_15-20-10"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="915.69"
                      y1="457.46"
                      x2="854.97"
                      y2="518.18"
                    />
                    <line
                      id="Line_15-21-10"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="893.61"
                      y1="460.22"
                      x2="832.89"
                      y2="520.94"
                    />
                    <line
                      id="Line_15-22-10"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="899.13"
                      y1="460.22"
                      x2="838.41"
                      y2="520.94"
                    />
                    <line
                      id="Line_15-23-10"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="904.65"
                      y1="460.22"
                      x2="843.93"
                      y2="520.94"
                    />
                    <line
                      id="Line_15-24-10"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="910.17"
                      y1="460.22"
                      x2="849.45"
                      y2="520.94"
                    />
                    <line
                      id="Line_15-25-10"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="915.69"
                      y1="460.22"
                      x2="854.97"
                      y2="520.94"
                    />
                    <line
                      id="Line_15-26-10"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="893.61"
                      y1="462.98"
                      x2="832.89"
                      y2="523.7"
                    />
                    <line
                      id="Line_15-27-10"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="899.13"
                      y1="462.98"
                      x2="838.41"
                      y2="523.7"
                    />
                    <line
                      id="Line_15-28-10"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="904.65"
                      y1="462.98"
                      x2="843.93"
                      y2="523.7"
                    />
                    <line
                      id="Line_15-29-10"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="910.17"
                      y1="462.98"
                      x2="849.45"
                      y2="523.7"
                    />
                    <line
                      id="Line_15-30-10"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="915.69"
                      y1="462.98"
                      x2="854.97"
                      y2="523.7"
                    />
                    <line
                      id="Line_15-31-10"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="893.61"
                      y1="465.74"
                      x2="832.89"
                      y2="526.46"
                    />
                    <line
                      id="Line_15-32-10"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="899.13"
                      y1="465.74"
                      x2="838.41"
                      y2="526.46"
                    />
                    <line
                      id="Line_15-33-10"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="904.65"
                      y1="465.74"
                      x2="843.93"
                      y2="526.46"
                    />
                    <line
                      id="Line_15-34-10"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="910.17"
                      y1="465.74"
                      x2="849.45"
                      y2="526.46"
                    />
                    <line
                      id="Line_15-35-10"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="915.69"
                      y1="465.74"
                      x2="854.97"
                      y2="526.46"
                    />
                    <line
                      id="Line_15-36-10"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="893.61"
                      y1="468.5"
                      x2="832.89"
                      y2="529.22"
                    />
                    <line
                      id="Line_15-37-10"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="899.13"
                      y1="468.5"
                      x2="838.41"
                      y2="529.22"
                    />
                    <line
                      id="Line_15-38-10"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="904.65"
                      y1="468.5"
                      x2="843.93"
                      y2="529.22"
                    />
                    <line
                      id="Line_15-39-10"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="910.17"
                      y1="468.5"
                      x2="849.45"
                      y2="529.22"
                    />
                    <line
                      id="Line_15-40-10"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="915.69"
                      y1="468.5"
                      x2="854.97"
                      y2="529.22"
                    />
                    <line
                      id="Line_15-41-10"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="893.61"
                      y1="471.26"
                      x2="832.89"
                      y2="531.98"
                    />
                    <line
                      id="Line_15-42-10"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="899.13"
                      y1="471.26"
                      x2="838.41"
                      y2="531.98"
                    />
                    <line
                      id="Line_15-43-10"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="904.65"
                      y1="471.26"
                      x2="843.93"
                      y2="531.98"
                    />
                    <line
                      id="Line_15-44-10"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="910.17"
                      y1="471.26"
                      x2="849.45"
                      y2="531.98"
                    />
                    <line
                      id="Line_15-45-10"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="915.69"
                      y1="471.26"
                      x2="854.97"
                      y2="531.98"
                    />
                    <line
                      id="Line_15-46-10"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="893.61"
                      y1="474.02"
                      x2="832.89"
                      y2="534.74"
                    />
                    <line
                      id="Line_15-47-10"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="899.13"
                      y1="474.02"
                      x2="838.41"
                      y2="534.74"
                    />
                    <line
                      id="Line_15-48-10"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="904.65"
                      y1="474.02"
                      x2="843.93"
                      y2="534.74"
                    />
                    <line
                      id="Line_15-49-10"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="910.17"
                      y1="474.02"
                      x2="849.45"
                      y2="534.74"
                    />
                    <line
                      id="Line_15-50-10"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="915.69"
                      y1="474.02"
                      x2="854.97"
                      y2="534.74"
                    />
                    <line
                      id="Line_15-51-10"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="893.61"
                      y1="476.78"
                      x2="832.89"
                      y2="537.5"
                    />
                    <line
                      id="Line_15-52-10"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="899.13"
                      y1="476.78"
                      x2="838.41"
                      y2="537.5"
                    />
                    <line
                      id="Line_15-53-10"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="904.65"
                      y1="476.78"
                      x2="843.93"
                      y2="537.5"
                    />
                    <line
                      id="Line_15-54-10"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="910.17"
                      y1="476.78"
                      x2="849.45"
                      y2="537.5"
                    />
                    <line
                      id="Line_15-55-10"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="915.69"
                      y1="476.78"
                      x2="854.97"
                      y2="537.5"
                    />
                    <line
                      id="Line_15-56-10"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="893.61"
                      y1="479.54"
                      x2="832.89"
                      y2="540.26"
                    />
                    <line
                      id="Line_15-57-10"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="899.13"
                      y1="479.54"
                      x2="838.41"
                      y2="540.26"
                    />
                    <line
                      id="Line_15-58-10"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="904.65"
                      y1="479.54"
                      x2="843.93"
                      y2="540.26"
                    />
                    <line
                      id="Line_15-59-10"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="910.17"
                      y1="479.54"
                      x2="849.45"
                      y2="540.26"
                    />
                    <line
                      id="Line_15-60-10"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="915.69"
                      y1="479.54"
                      x2="854.97"
                      y2="540.26"
                    />
                    <line
                      id="Line_15-61-10"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="893.61"
                      y1="482.3"
                      x2="832.89"
                      y2="543.02"
                    />
                    <line
                      id="Line_15-62-10"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="899.13"
                      y1="482.3"
                      x2="838.41"
                      y2="543.02"
                    />
                    <line
                      id="Line_15-63-10"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="904.65"
                      y1="482.3"
                      x2="843.93"
                      y2="543.02"
                    />
                    <line
                      id="Line_15-64-10"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="910.17"
                      y1="482.3"
                      x2="849.45"
                      y2="543.02"
                    />
                    <line
                      id="Line_15-65-10"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="915.69"
                      y1="482.3"
                      x2="854.97"
                      y2="543.02"
                    />
                    <line
                      id="Line_15-66-10"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="893.61"
                      y1="485.06"
                      x2="832.89"
                      y2="545.78"
                    />
                    <line
                      id="Line_15-67-10"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="899.13"
                      y1="485.06"
                      x2="838.41"
                      y2="545.78"
                    />
                    <line
                      id="Line_15-68-10"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="904.65"
                      y1="485.06"
                      x2="843.93"
                      y2="545.78"
                    />
                    <line
                      id="Line_15-69-10"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="910.17"
                      y1="485.06"
                      x2="849.45"
                      y2="545.78"
                    />
                    <line
                      id="Line_15-70-10"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="915.69"
                      y1="485.06"
                      x2="854.97"
                      y2="545.78"
                    />
                    <line
                      id="Line_15-71-10"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="893.61"
                      y1="487.82"
                      x2="832.89"
                      y2="548.54"
                    />
                    <line
                      id="Line_15-72-10"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="899.13"
                      y1="487.82"
                      x2="838.41"
                      y2="548.54"
                    />
                    <line
                      id="Line_15-73-10"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="904.65"
                      y1="487.82"
                      x2="843.93"
                      y2="548.54"
                    />
                    <line
                      id="Line_15-74-10"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="910.17"
                      y1="487.82"
                      x2="849.45"
                      y2="548.54"
                    />
                    <line
                      id="Line_15-75-10"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="915.69"
                      y1="487.82"
                      x2="854.97"
                      y2="548.54"
                    />
                    <line
                      id="Line_15-76-10"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="893.61"
                      y1="490.58"
                      x2="832.89"
                      y2="551.3"
                    />
                    <line
                      id="Line_15-77-10"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="899.13"
                      y1="490.58"
                      x2="838.41"
                      y2="551.3"
                    />
                    <line
                      id="Line_15-78-10"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="904.65"
                      y1="490.58"
                      x2="843.93"
                      y2="551.3"
                    />
                    <line
                      id="Line_15-79-10"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="910.17"
                      y1="490.58"
                      x2="849.45"
                      y2="551.3"
                    />
                    <line
                      id="Line_15-80-10"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="915.69"
                      y1="490.58"
                      x2="854.97"
                      y2="551.3"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            id="AlarmAlert3"
            data-name="Rectangle 537"
            className={
              data && data.alarms[2].status.currentStatus === "Alert"
                ? "cls-64 alarmAlert"
                : "cls-64"
            }
            x="388"
            y="469.02"
            width="180"
            height="44.16"
          />
          <g id="SERIAL_1-14" data-name="SERIAL 1" className="cls-22">
            <text className="cls-93" transform="translate(432.23 481.26)">
              ALARM{" "}
              <tspan className="cls-94" x="26.77" y="0">
                SY
              </tspan>
              <tspan className="cls-95" x="35.72" y="0">
                S
              </tspan>
              <tspan x="40.29" y="0">
                TEM
              </tspan>
            </text>
          </g>
          <g id="AUX.SYSTEM.1-3" data-name="AUX.SYSTEM.1" className="cls-22">
            <text className="cls-96" transform="translate(432.23 501.96)">
              SY
              <tspan className="cls-97" x="25.13" y="0">
                S
              </tspan>
              <tspan className="cls-98" x="38.03" y="0">
                .
              </tspan>
              <tspan className="cls-99" x="42.85" y="0">
                Z
              </tspan>
              <tspan className="cls-98" x="55.17" y="0">
                ONE
              </tspan>
              <tspan className="cls-97" x="96.28" y="0">
                .
              </tspan>
              <tspan className="cls-108" x="100.93" y="0">
                3
              </tspan>
            </text>
          </g>
          <g id="alarmZone3">
            <g className="cls-109">
              <g
                id="LINE_TEXTURE-11"
                data-name="LINE TEXTURE"
                className="cls-60"
              >
                <g className="cls-110">
                  <g id="LINE_REPEAT-11" data-name="LINE REPEAT">
                    <line
                      id="Line_15-11-11"
                      data-name="Line 15"
                      className="cls-62"
                      x1="415.61"
                      y1="444.18"
                      x2="354.89"
                      y2="504.9"
                    />
                    <line
                      id="Line_15-2-12"
                      data-name="Line 15-2"
                      className="cls-62"
                      x1="421.13"
                      y1="444.18"
                      x2="360.41"
                      y2="504.9"
                    />
                    <line
                      id="Line_15-3-12"
                      data-name="Line 15-3"
                      className="cls-62"
                      x1="426.65"
                      y1="444.18"
                      x2="365.93"
                      y2="504.9"
                    />
                    <line
                      id="Line_15-4-12"
                      data-name="Line 15-4"
                      className="cls-62"
                      x1="432.17"
                      y1="444.18"
                      x2="371.45"
                      y2="504.9"
                    />
                    <line
                      id="Line_15-5-12"
                      data-name="Line 15-5"
                      className="cls-62"
                      x1="437.69"
                      y1="444.18"
                      x2="376.97"
                      y2="504.9"
                    />
                    <line
                      id="Line_15-6-12"
                      data-name="Line 15-6"
                      className="cls-62"
                      x1="415.61"
                      y1="446.94"
                      x2="354.89"
                      y2="507.66"
                    />
                    <line
                      id="Line_15-7-12"
                      data-name="Line 15-7"
                      className="cls-62"
                      x1="421.13"
                      y1="446.94"
                      x2="360.41"
                      y2="507.66"
                    />
                    <line
                      id="Line_15-8-12"
                      data-name="Line 15-8"
                      className="cls-62"
                      x1="426.65"
                      y1="446.94"
                      x2="365.93"
                      y2="507.66"
                    />
                    <line
                      id="Line_15-9-12"
                      data-name="Line 15-9"
                      className="cls-62"
                      x1="432.17"
                      y1="446.94"
                      x2="371.45"
                      y2="507.66"
                    />
                    <line
                      id="Line_15-10-12"
                      data-name="Line 15-10"
                      className="cls-62"
                      x1="437.69"
                      y1="446.94"
                      x2="376.97"
                      y2="507.66"
                    />
                    <line
                      id="Line_15-11-12"
                      data-name="Line 15-11"
                      className="cls-62"
                      x1="415.61"
                      y1="449.7"
                      x2="354.89"
                      y2="510.42"
                    />
                    <line
                      id="Line_15-12-11"
                      data-name="Line 15-12"
                      className="cls-62"
                      x1="421.13"
                      y1="449.7"
                      x2="360.41"
                      y2="510.42"
                    />
                    <line
                      id="Line_15-13-11"
                      data-name="Line 15-13"
                      className="cls-62"
                      x1="426.65"
                      y1="449.7"
                      x2="365.93"
                      y2="510.42"
                    />
                    <line
                      id="Line_15-14-11"
                      data-name="Line 15-14"
                      className="cls-62"
                      x1="432.17"
                      y1="449.7"
                      x2="371.45"
                      y2="510.42"
                    />
                    <line
                      id="Line_15-15-11"
                      data-name="Line 15-15"
                      className="cls-62"
                      x1="437.69"
                      y1="449.7"
                      x2="376.97"
                      y2="510.42"
                    />
                    <line
                      id="Line_15-16-11"
                      data-name="Line 15-16"
                      className="cls-62"
                      x1="415.61"
                      y1="452.46"
                      x2="354.89"
                      y2="513.18"
                    />
                    <line
                      id="Line_15-17-11"
                      data-name="Line 15-17"
                      className="cls-62"
                      x1="421.13"
                      y1="452.46"
                      x2="360.41"
                      y2="513.18"
                    />
                    <line
                      id="Line_15-18-11"
                      data-name="Line 15-18"
                      className="cls-62"
                      x1="426.65"
                      y1="452.46"
                      x2="365.93"
                      y2="513.18"
                    />
                    <line
                      id="Line_15-19-11"
                      data-name="Line 15-19"
                      className="cls-62"
                      x1="432.17"
                      y1="452.46"
                      x2="371.45"
                      y2="513.18"
                    />
                    <line
                      id="Line_15-20-11"
                      data-name="Line 15-20"
                      className="cls-62"
                      x1="437.69"
                      y1="452.46"
                      x2="376.97"
                      y2="513.18"
                    />
                    <line
                      id="Line_15-21-11"
                      data-name="Line 15-21"
                      className="cls-62"
                      x1="415.61"
                      y1="455.22"
                      x2="354.89"
                      y2="515.94"
                    />
                    <line
                      id="Line_15-22-11"
                      data-name="Line 15-22"
                      className="cls-62"
                      x1="421.13"
                      y1="455.22"
                      x2="360.41"
                      y2="515.94"
                    />
                    <line
                      id="Line_15-23-11"
                      data-name="Line 15-23"
                      className="cls-62"
                      x1="426.65"
                      y1="455.22"
                      x2="365.93"
                      y2="515.94"
                    />
                    <line
                      id="Line_15-24-11"
                      data-name="Line 15-24"
                      className="cls-62"
                      x1="432.17"
                      y1="455.22"
                      x2="371.45"
                      y2="515.94"
                    />
                    <line
                      id="Line_15-25-11"
                      data-name="Line 15-25"
                      className="cls-62"
                      x1="437.69"
                      y1="455.22"
                      x2="376.97"
                      y2="515.94"
                    />
                    <line
                      id="Line_15-26-11"
                      data-name="Line 15-26"
                      className="cls-62"
                      x1="415.61"
                      y1="457.98"
                      x2="354.89"
                      y2="518.7"
                    />
                    <line
                      id="Line_15-27-11"
                      data-name="Line 15-27"
                      className="cls-62"
                      x1="421.13"
                      y1="457.98"
                      x2="360.41"
                      y2="518.7"
                    />
                    <line
                      id="Line_15-28-11"
                      data-name="Line 15-28"
                      className="cls-62"
                      x1="426.65"
                      y1="457.98"
                      x2="365.93"
                      y2="518.7"
                    />
                    <line
                      id="Line_15-29-11"
                      data-name="Line 15-29"
                      className="cls-62"
                      x1="432.17"
                      y1="457.98"
                      x2="371.45"
                      y2="518.7"
                    />
                    <line
                      id="Line_15-30-11"
                      data-name="Line 15-30"
                      className="cls-62"
                      x1="437.69"
                      y1="457.98"
                      x2="376.97"
                      y2="518.7"
                    />
                    <line
                      id="Line_15-31-11"
                      data-name="Line 15-31"
                      className="cls-62"
                      x1="415.61"
                      y1="460.74"
                      x2="354.89"
                      y2="521.46"
                    />
                    <line
                      id="Line_15-32-11"
                      data-name="Line 15-32"
                      className="cls-62"
                      x1="421.13"
                      y1="460.74"
                      x2="360.41"
                      y2="521.46"
                    />
                    <line
                      id="Line_15-33-11"
                      data-name="Line 15-33"
                      className="cls-62"
                      x1="426.65"
                      y1="460.74"
                      x2="365.93"
                      y2="521.46"
                    />
                    <line
                      id="Line_15-34-11"
                      data-name="Line 15-34"
                      className="cls-62"
                      x1="432.17"
                      y1="460.74"
                      x2="371.45"
                      y2="521.46"
                    />
                    <line
                      id="Line_15-35-11"
                      data-name="Line 15-35"
                      className="cls-62"
                      x1="437.69"
                      y1="460.74"
                      x2="376.97"
                      y2="521.46"
                    />
                    <line
                      id="Line_15-36-11"
                      data-name="Line 15-36"
                      className="cls-62"
                      x1="415.61"
                      y1="463.5"
                      x2="354.89"
                      y2="524.22"
                    />
                    <line
                      id="Line_15-37-11"
                      data-name="Line 15-37"
                      className="cls-62"
                      x1="421.13"
                      y1="463.5"
                      x2="360.41"
                      y2="524.22"
                    />
                    <line
                      id="Line_15-38-11"
                      data-name="Line 15-38"
                      className="cls-62"
                      x1="426.65"
                      y1="463.5"
                      x2="365.93"
                      y2="524.22"
                    />
                    <line
                      id="Line_15-39-11"
                      data-name="Line 15-39"
                      className="cls-62"
                      x1="432.17"
                      y1="463.5"
                      x2="371.45"
                      y2="524.22"
                    />
                    <line
                      id="Line_15-40-11"
                      data-name="Line 15-40"
                      className="cls-62"
                      x1="437.69"
                      y1="463.5"
                      x2="376.97"
                      y2="524.22"
                    />
                    <line
                      id="Line_15-41-11"
                      data-name="Line 15-41"
                      className="cls-62"
                      x1="415.61"
                      y1="466.26"
                      x2="354.89"
                      y2="526.98"
                    />
                    <line
                      id="Line_15-42-11"
                      data-name="Line 15-42"
                      className="cls-62"
                      x1="421.13"
                      y1="466.26"
                      x2="360.41"
                      y2="526.98"
                    />
                    <line
                      id="Line_15-43-11"
                      data-name="Line 15-43"
                      className="cls-62"
                      x1="426.65"
                      y1="466.26"
                      x2="365.93"
                      y2="526.98"
                    />
                    <line
                      id="Line_15-44-11"
                      data-name="Line 15-44"
                      className="cls-62"
                      x1="432.17"
                      y1="466.26"
                      x2="371.45"
                      y2="526.98"
                    />
                    <line
                      id="Line_15-45-11"
                      data-name="Line 15-45"
                      className="cls-62"
                      x1="437.69"
                      y1="466.26"
                      x2="376.97"
                      y2="526.98"
                    />
                    <line
                      id="Line_15-46-11"
                      data-name="Line 15-46"
                      className="cls-62"
                      x1="415.61"
                      y1="469.02"
                      x2="354.89"
                      y2="529.74"
                    />
                    <line
                      id="Line_15-47-11"
                      data-name="Line 15-47"
                      className="cls-62"
                      x1="421.13"
                      y1="469.02"
                      x2="360.41"
                      y2="529.74"
                    />
                    <line
                      id="Line_15-48-11"
                      data-name="Line 15-48"
                      className="cls-62"
                      x1="426.65"
                      y1="469.02"
                      x2="365.93"
                      y2="529.74"
                    />
                    <line
                      id="Line_15-49-11"
                      data-name="Line 15-49"
                      className="cls-62"
                      x1="432.17"
                      y1="469.02"
                      x2="371.45"
                      y2="529.74"
                    />
                    <line
                      id="Line_15-50-11"
                      data-name="Line 15-50"
                      className="cls-62"
                      x1="437.69"
                      y1="469.02"
                      x2="376.97"
                      y2="529.74"
                    />
                    <line
                      id="Line_15-51-11"
                      data-name="Line 15-51"
                      className="cls-62"
                      x1="415.61"
                      y1="471.78"
                      x2="354.89"
                      y2="532.5"
                    />
                    <line
                      id="Line_15-52-11"
                      data-name="Line 15-52"
                      className="cls-62"
                      x1="421.13"
                      y1="471.78"
                      x2="360.41"
                      y2="532.5"
                    />
                    <line
                      id="Line_15-53-11"
                      data-name="Line 15-53"
                      className="cls-62"
                      x1="426.65"
                      y1="471.78"
                      x2="365.93"
                      y2="532.5"
                    />
                    <line
                      id="Line_15-54-11"
                      data-name="Line 15-54"
                      className="cls-62"
                      x1="432.17"
                      y1="471.78"
                      x2="371.45"
                      y2="532.5"
                    />
                    <line
                      id="Line_15-55-11"
                      data-name="Line 15-55"
                      className="cls-62"
                      x1="437.69"
                      y1="471.78"
                      x2="376.97"
                      y2="532.5"
                    />
                    <line
                      id="Line_15-56-11"
                      data-name="Line 15-56"
                      className="cls-62"
                      x1="415.61"
                      y1="474.54"
                      x2="354.89"
                      y2="535.26"
                    />
                    <line
                      id="Line_15-57-11"
                      data-name="Line 15-57"
                      className="cls-62"
                      x1="421.13"
                      y1="474.54"
                      x2="360.41"
                      y2="535.26"
                    />
                    <line
                      id="Line_15-58-11"
                      data-name="Line 15-58"
                      className="cls-62"
                      x1="426.65"
                      y1="474.54"
                      x2="365.93"
                      y2="535.26"
                    />
                    <line
                      id="Line_15-59-11"
                      data-name="Line 15-59"
                      className="cls-62"
                      x1="432.17"
                      y1="474.54"
                      x2="371.45"
                      y2="535.26"
                    />
                    <line
                      id="Line_15-60-11"
                      data-name="Line 15-60"
                      className="cls-62"
                      x1="437.69"
                      y1="474.54"
                      x2="376.97"
                      y2="535.26"
                    />
                    <line
                      id="Line_15-61-11"
                      data-name="Line 15-61"
                      className="cls-62"
                      x1="415.61"
                      y1="477.3"
                      x2="354.89"
                      y2="538.02"
                    />
                    <line
                      id="Line_15-62-11"
                      data-name="Line 15-62"
                      className="cls-62"
                      x1="421.13"
                      y1="477.3"
                      x2="360.41"
                      y2="538.02"
                    />
                    <line
                      id="Line_15-63-11"
                      data-name="Line 15-63"
                      className="cls-62"
                      x1="426.65"
                      y1="477.3"
                      x2="365.93"
                      y2="538.02"
                    />
                    <line
                      id="Line_15-64-11"
                      data-name="Line 15-64"
                      className="cls-62"
                      x1="432.17"
                      y1="477.3"
                      x2="371.45"
                      y2="538.02"
                    />
                    <line
                      id="Line_15-65-11"
                      data-name="Line 15-65"
                      className="cls-62"
                      x1="437.69"
                      y1="477.3"
                      x2="376.97"
                      y2="538.02"
                    />
                    <line
                      id="Line_15-66-11"
                      data-name="Line 15-66"
                      className="cls-62"
                      x1="415.61"
                      y1="480.06"
                      x2="354.89"
                      y2="540.78"
                    />
                    <line
                      id="Line_15-67-11"
                      data-name="Line 15-67"
                      className="cls-62"
                      x1="421.13"
                      y1="480.06"
                      x2="360.41"
                      y2="540.78"
                    />
                    <line
                      id="Line_15-68-11"
                      data-name="Line 15-68"
                      className="cls-62"
                      x1="426.65"
                      y1="480.06"
                      x2="365.93"
                      y2="540.78"
                    />
                    <line
                      id="Line_15-69-11"
                      data-name="Line 15-69"
                      className="cls-62"
                      x1="432.17"
                      y1="480.06"
                      x2="371.45"
                      y2="540.78"
                    />
                    <line
                      id="Line_15-70-11"
                      data-name="Line 15-70"
                      className="cls-62"
                      x1="437.69"
                      y1="480.06"
                      x2="376.97"
                      y2="540.78"
                    />
                    <line
                      id="Line_15-71-11"
                      data-name="Line 15-71"
                      className="cls-62"
                      x1="415.61"
                      y1="482.82"
                      x2="354.89"
                      y2="543.54"
                    />
                    <line
                      id="Line_15-72-11"
                      data-name="Line 15-72"
                      className="cls-62"
                      x1="421.13"
                      y1="482.82"
                      x2="360.41"
                      y2="543.54"
                    />
                    <line
                      id="Line_15-73-11"
                      data-name="Line 15-73"
                      className="cls-62"
                      x1="426.65"
                      y1="482.82"
                      x2="365.93"
                      y2="543.54"
                    />
                    <line
                      id="Line_15-74-11"
                      data-name="Line 15-74"
                      className="cls-62"
                      x1="432.17"
                      y1="482.82"
                      x2="371.45"
                      y2="543.54"
                    />
                    <line
                      id="Line_15-75-11"
                      data-name="Line 15-75"
                      className="cls-62"
                      x1="437.69"
                      y1="482.82"
                      x2="376.97"
                      y2="543.54"
                    />
                    <line
                      id="Line_15-76-11"
                      data-name="Line 15-76"
                      className="cls-62"
                      x1="415.61"
                      y1="485.58"
                      x2="354.89"
                      y2="546.3"
                    />
                    <line
                      id="Line_15-77-11"
                      data-name="Line 15-77"
                      className="cls-62"
                      x1="421.13"
                      y1="485.58"
                      x2="360.41"
                      y2="546.3"
                    />
                    <line
                      id="Line_15-78-11"
                      data-name="Line 15-78"
                      className="cls-62"
                      x1="426.65"
                      y1="485.58"
                      x2="365.93"
                      y2="546.3"
                    />
                    <line
                      id="Line_15-79-11"
                      data-name="Line 15-79"
                      className="cls-62"
                      x1="432.17"
                      y1="485.58"
                      x2="371.45"
                      y2="546.3"
                    />
                    <line
                      id="Line_15-80-11"
                      data-name="Line 15-80"
                      className="cls-62"
                      x1="437.69"
                      y1="485.58"
                      x2="376.97"
                      y2="546.3"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="Cameras">
          <g
            id="Camera4"
            className={
              data && data.cameras[3].status.currentStatus === "Recording"
                ? ""
                : "CameraSVGOff"
            }
          >
            <g id="HTML_JUMBLE_2-2" data-name="HTML JUMBLE 2-2">
              <circle
                id="Ellipse_73-2"
                data-name="Ellipse 73"
                className="cls-111"
                cx="858.12"
                cy="45.32"
                r="1.8"
              />
              <g id="RECORDING" className="cls-22">
                <text className="cls-112" transform="translate(861.38 46.82)">
                  R
                  <tspan className="cls-113" x="3.79" y="0">
                    E
                  </tspan>
                  <tspan x="7.25" y="0">
                    CORDING
                  </tspan>
                </text>
              </g>
            </g>
            <g id="HTML_JUMBLE_2" data-name="HTML JUMBLE 2">
              <g id="CAM" className="cls-22">
                <text className="cls-114" transform="translate(855.08 39.96)">
                  C
                  <tspan className="cls-115" x="12.11" y="0">
                    AM
                  </tspan>
                </text>
              </g>
            </g>
          </g>
          <g
            id="Camera3"
            className={
              data && data.cameras[2].status.currentStatus === "Recording"
                ? ""
                : "CameraSVGOff"
            }
          >
            <g id="HTML_JUMBLE_2-2-2" data-name="HTML JUMBLE 2-2">
              <circle
                id="Ellipse_73-3"
                data-name="Ellipse 73"
                className="cls-111"
                cx="818.12"
                cy="517.32"
                r="1.8"
              />
              <g id="RECORDING-2" data-name="RECORDING" className="cls-22">
                <text className="cls-112" transform="translate(821.38 518.82)">
                  R
                  <tspan className="cls-113" x="3.79" y="0">
                    E
                  </tspan>
                  <tspan x="7.25" y="0">
                    CORDING
                  </tspan>
                </text>
              </g>
            </g>
            <g id="HTML_JUMBLE_2-2-3" data-name="HTML JUMBLE 2">
              <g id="CAM-2" data-name="CAM" className="cls-22">
                <text className="cls-114" transform="translate(815.08 511.96)">
                  C
                  <tspan className="cls-115" x="12.11" y="0">
                    AM
                  </tspan>
                </text>
              </g>
            </g>
          </g>
          <g
            id="Camera2"
            className={
              data && data.cameras[1].status.currentStatus === "Recording"
                ? ""
                : "CameraSVGOff"
            }
          >
            <g id="HTML_JUMBLE_2-2-4" data-name="HTML JUMBLE 2-2">
              <circle
                id="Ellipse_73-4"
                data-name="Ellipse 73"
                className="cls-111"
                cx="808.12"
                cy="45.32"
                r="1.8"
              />
              <g id="RECORDING-3" data-name="RECORDING" className="cls-22">
                <text className="cls-112" transform="translate(811.38 46.82)">
                  R
                  <tspan className="cls-113" x="3.79" y="0">
                    E
                  </tspan>
                  <tspan x="7.25" y="0">
                    CORDING
                  </tspan>
                </text>
              </g>
            </g>
            <g id="HTML_JUMBLE_2-3" data-name="HTML JUMBLE 2">
              <g id="CAM-3" data-name="CAM" className="cls-22">
                <text className="cls-114" transform="translate(805.08 39.96)">
                  C
                  <tspan className="cls-115" x="12.11" y="0">
                    AM
                  </tspan>
                </text>
              </g>
            </g>
          </g>
          <g
            id="Camera1"
            className={
              data && data.cameras[0].status.currentStatus === "Recording"
                ? ""
                : "CameraSVGOff"
            }
          >
            <g id="HTML_JUMBLE_2-2-5" data-name="HTML JUMBLE 2-2">
              <circle
                id="Ellipse_73-5"
                data-name="Ellipse 73"
                className="cls-111"
                cx="301.22"
                cy="452.08"
                r="1.8"
              />
              <g id="RECORDING-4" data-name="RECORDING" className="cls-22">
                <text className="cls-116" transform="translate(304.48 453.59)">
                  R
                  <tspan className="cls-113" x="3.79" y="0">
                    E
                  </tspan>
                  <tspan x="7.25" y="0">
                    CORDING
                  </tspan>
                </text>
              </g>
            </g>
            <g id="HTML_JUMBLE_2-4" data-name="HTML JUMBLE 2">
              <g id="CAM-4" data-name="CAM" className="cls-22">
                <text className="cls-117" transform="translate(298.18 446.73)">
                  C
                  <tspan className="cls-118" x="12.11" y="0">
                    AM
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
        <g id="Zones" className="cls-7">
          <polygon
            id="zone1"
            className={
              data && data.zones.zone1.status === "Alert"
                ? "zoneAlert"
                : data && data.zones.zone1.status === "Unrestricted"
                ? "UnrestrictedZone"
                : "cls-11"
            }
            points="379.4 20.35 379.32 160.55 368.2 169.15 368.2 199.72 379.32 205.71 378.92 233.99 373.29 238.79 372.55 272.52 368.2 275.13 368.2 325.15 378.01 330.16 378.41 360.52 370.93 366.36 370.93 399.15 373.8 400.84 373.29 449 367.4 452.35 367.4 481.85 372.82 487.57 373 521.95 367.55 521.95 341 461.15 340.2 460.35 339.4 460.35 156.81 460.35 68.2 382.75 4.2 382.75 3.4 382.75 3.4 379.55 4.2 157.15 6.6 157.15 69 157.15 162.6 77.95 162.6 77.95 162.6 77.15 163.4 20.35 379.4 20.35"
          />
          <polygon
            id="zone2"
            className={
              data && data.zones.zone2.status === "Alert"
                ? "zoneAlert"
                : data && data.zones.zone2.status === "Unrestricted"
                ? "UnrestrictedZone"
                : "cls-11"
            }
            points="379.94 20.35 849.8 20.35 849.8 231.55 849.8 231.55 849.8 231.93 849.8 260.31 837 269.95 782.87 269.95 779.4 265.15 729 265.15 613.58 265.6 591.25 246.56 469.21 245.24 455.89 259.73 373.29 259.76 373.8 239.55 380.2 233.95 380.2 205.15 369 198.75 369 197.68 369 169.22 380.18 160.55 379.94 20.35"
          />
          <polygon
            id="zone3"
            className={
              data && data.zones.zone3.status === "Alert"
                ? "zoneAlert"
                : data && data.zones.zone3.status === "Unrestricted"
                ? "UnrestrictedZone"
                : "cls-11"
            }
            points="373 260.35 456.2 260.35 469.8 245.95 580.59 247.04 591.25 247.43 613.4 266.43 778.6 265.95 779.4 265.95 782.6 270.75 837.14 270.75 850.6 260.73 860.75 275.13 861 522.75 861 523.55 373.45 521.95 373.8 489.95 373.8 487.55 373.8 487.55 373.8 486.75 368.2 481.15 368.2 452.35 373.8 449.15 374.6 400.35 371.4 398.75 371.4 366.75 379.4 360.35 379.4 348.35 378.6 329.15 369 324.35 369 275.41 373.29 272.52 373 260.35"
          />
          <polygon
            id="zone4"
            className={
              data && data.zones.zone4.status === "Alert"
                ? "zoneAlert"
                : data && data.zones.zone4.status === "Unrestricted"
                ? "UnrestrictedZone"
                : "cls-11"
            }
            points="861.8 523.55 1040.2 523.55 1040.2 452.35 1040.2 429.95 1040.2 20.35 1037.66 20.35 850.6 20.35 850.6 260.34 857 269.15 861 274.75 861 275.55 861.8 523.55"
          />
        </g>
      </svg>
    </div>
  );
}
