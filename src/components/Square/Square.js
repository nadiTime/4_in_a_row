import React from "react";
import styles from "./Square.module.css";

const Square = ({ colIndex, rowIndex, player, onColClick }) => {
  const squareClass = [styles.Square];
  if (player) {
    squareClass.push(styles[player]);
  }
  return (
    <div
      className={squareClass.join(" ")}
      onClick={() => onColClick(colIndex)}
    ></div>
  );
};

export default Square;
