import logo from "./logo.svg";
import "./App.css";
import { Case1 } from "./Case1";
import { Case2 } from "./Case2";
import { Case3 } from "./Case3";

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <Case1 />
        <Case2 />
        <Case3 />
      </header>
    </div>
  );
}

export default App;
