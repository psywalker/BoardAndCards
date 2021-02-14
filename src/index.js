import React from "react";
import ReactDOM from "react-dom";
import { Board } from "./components/Board";
import './index.css'

const App = () => {
  return <Board />;
};

ReactDOM.render(<App />, document.getElementById("app"));
