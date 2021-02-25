import React from "react";
import Square from "../Square/Square";
import styles from "./Row.module.css";

const Row = ({ rowIndex, columns, squareClicked }) => {
  return (
    <div className={styles.Row}>
      {columns.map((player, index) => (
        <Square
          colIndex={index}
          rowIndex={rowIndex}
          player={player}
          key={index}
          onColClick={squareClicked}
        />
      ))}
    </div>
  );
};

export default Row;
