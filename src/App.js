import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from "react-router-dom";
import 'antd';
import "./App.scss";
import Home from './pages/home'
import MessageBoard from './pages/messageBoard'
import Posts from './pages/posts/index'
import Top from './pages/Top'
import Form from './pages/Form'

function App () {
  return (
    <Router>
      <Top />
      <Routes>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/index" element={<Home />}></Route>
        <Route path="/message-board" element={<MessageBoard />}></Route>
        <Route path="/posts/:id" element={<Posts />}></Route>
        <Route path="*" element={<Navigate to="/index" />} />
      </Routes>
    </Router>
  );
}

export default App;
