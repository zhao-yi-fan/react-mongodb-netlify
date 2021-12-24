import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from './home'
import Top from './top'
import MessageBoard from './messageBoard'

function App () {
  return (
    <div className="app">
      <Top />
        
      <Router>
        <Routes>
          <Route path="/index" element={<Home />}></Route>
          <Route path="/messageBoard" element={<MessageBoard />}></Route>
          <Route path="*" element={<Navigate to="/index" />} />
        </Routes>
        {/* 当以上Route组件都匹配失败时，重定向到/home */}
        {/* <Navigate to="/home" element={<Home />} /> */}
      </Router>
    </div>
  );
}

export default App;
