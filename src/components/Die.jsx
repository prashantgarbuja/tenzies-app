import React from "react";
export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  function diceFace() {
    switch (props.value) {
      case 1:
        return "first-face";
      case 2:
        return "second-face";
      case 3:
        return "third-face";
      case 4:
        return "fourth-face";
      case 5:
        return "fifth-face";
      case 6:
        return "sixth-face";
      default:
        return "";
    }
  }
  const dotElements = [];
  if (props.value < 4) {
    for (let i = 0; i < props.value; i++) {
      dotElements.push(<span className="dot"></span>);
    }
  } else {
    dotElements.push(
      <>
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
          {props.value === 6 && <span className="dot"></span>}
        </div>
        {props.value % 2 === 1 && (
          <div className="column">
            <span className="dot"></span>
          </div>
        )}
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
          {props.value === 6 && <span className="dot"></span>}
        </div>
      </>
    );
  }
  return (
    <div
      className={`die-face ${diceFace()}`}
      style={styles}
      onClick={props.holdDice}
    >
      {/* <h2 classNameName="die-num">{props.value}</h2> */}
      {dotElements}
    </div>
  );
}
