import styles from "./App.module.css";

import Board from "./containers/Board/Board";

const App = () => {
  return (
    <div className={styles.App}>
      <Board />
    </div>
  );
};

export default App;
