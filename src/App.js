import React from "react";
import Board from "./Components/Board";
export const startNode = [5, 5];
export const endNode = [10, 15];
export const size = [15, 20];


function App() {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
        <Board />
      </div>

    </React.Fragment>
  );
}

export default App;
