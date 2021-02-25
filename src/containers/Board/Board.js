import React, { useState } from "react";
import Row from "../../components/Row/Row";

import styles from "./Board.module.css";

const boardInitialState = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const checkOpenSpot = (board, colIndex) => {
  let openSpot = null;
  board.forEach((row, index) => {
    if (!row[colIndex]) {
      openSpot = index;
    } else return;
  });
  return openSpot;
};

const areEqual = (...args) => {
  const len = args.length;
  for (let i = 1; i < len; i += 1) {
    if (args[i] === null || args[i] === undefined || args[i] !== args[i - 1])
      return false;
  }
  return true;
};

const checkWin = board => {
  // row win
  for (const row of board)
    if (areEqual(row[0], row[1], row[2], row[3])) {
      return true;
    }
  // col win
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i < 4) {
        if (
          areEqual(
            board[i][j],
            board[i + 1][j],
            board[i + 2][j],
            board[i + 3][j]
          )
        ) {
          return true;
        }
      }
    }
  }
  // right diagwin
  for (let i = 0; i < board.length; i++) {
    if (i < 4) {
      if (
        areEqual(board[i][0], board[i + 1][1], board[i + 2][2], board[i + 3][3])
      ) {
        return true;
      }
    }
  }
  // left diagwin
  for (let i = board.length - 1; i >= 0; i--) {
    if (i < 4) {
      if (
        areEqual(board[i][3], board[i + 1][3], board[i + 2][3], board[i + 3][3])
      ) {
        return true;
      }
    }
  }
  return false;
};

const Board = () => {
  const [boardState, setBoardState] = useState(boardInitialState);
  const [playerTurn, setPlayerTurn] = useState("player1");
  const [winState, setWinState] = useState(false);

  const squareClickHandler = colIndex => {
    // Check Column lowest open space
    const openSpot = checkOpenSpot(boardState, colIndex);
    if (openSpot) {
      // We have a turn
      const newBoard = [...boardState];
      newBoard[openSpot][colIndex] = playerTurn;
      setBoardState(newBoard);
      if (checkWin(newBoard)) {
        setWinState(playerTurn);
      } else {
        const whoToPlay = playerTurn === "player1" ? "player2" : "player1";
        setPlayerTurn(whoToPlay);
      }
    } else {
      console.log("Colomn is full");
    }
  };

  const resetGameHandler = () => {
    setBoardState(boardInitialState);
    setWinState(false);
    setPlayerTurn("player1");
  };
  return (
    <div className={styles.Board}>
      <div>
        <h1>
          {playerTurn}{" "}
          {winState && (
            <span>
              WINNER
              <button onClick={resetGameHandler}>again</button>{" "}
            </span>
          )}
        </h1>
      </div>
      {boardState.map((row, index) => (
        <Row
          rowIndex={index}
          columns={row}
          squareClicked={squareClickHandler}
          key={index}
        />
      ))}
    </div>
  );
};

export default Board;
