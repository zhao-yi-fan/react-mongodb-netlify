import { BrowserRouter as Router, NavLink , Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from './home'
import MessageBoard from './messageBoard'

function App () {
  return (
    <div className="App">
      <Router>
        <NavLink to="/home" className="link">主页</NavLink>
        <NavLink to="/messageBoard" className="link">留言板</NavLink>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/messageBoard" element={<MessageBoard/>}></Route>
        </Routes>
        <Navigate to="/home" element={<Home/>}/>    {/* 当以上Route组件都匹配失败时，重定向到/home */}
      </Router>
    </div>

  );
}

export default App;
