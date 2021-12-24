import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from "react-router-dom";
import "./App.css";
import Home from './home'
import MessageBoard from './messageBoard'

function App () {
  return (
    <Router>
      <div className="top-f">
        <div className="top">
          <div className="nav-list">
            <NavLink to="/index" className="link">主页</NavLink>
            <NavLink to="/messageBoard" className="link">留言板</NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/index" element={<Home />}></Route>
        <Route path="/messageBoard" element={<MessageBoard />}></Route>
        <Route path="*" element={<Navigate to="/index" />} />
      </Routes>
    </Router>
  );
}

export default App;
