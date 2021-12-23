import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Ready...");

  const onDemoClick = () => {
    fetch("/.netlify/functions/demo")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMessage(json.value);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <button onClick={onDemoClick}>Demo Button</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
