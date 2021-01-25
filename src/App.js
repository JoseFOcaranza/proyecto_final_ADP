import "./App.css";
import * as React from "react";

import DecToMaya from "./Views/DecToMaya";
import MayaToDec from "./Views/MayaToDec";

function App() {
  const [showMaya, setShowMaya] = React.useState(true);

  return (
    <div className="container">
      <div className="header">
        <div onClick={() => setShowMaya(true)} className="header-button">
          {"Décimal => Maya"}
        </div>
        <div onClick={() => setShowMaya(false)} className="header-button">
          {"Maya => Décimal"}
        </div>
      </div>
      <div className="view-container">
        {showMaya ? <DecToMaya /> : <MayaToDec />}
      </div>
    </div>
  );
}

export default App;
