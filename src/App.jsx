import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Home from './pages/home';
import MessageBoard from './pages/messageBoard';
import Posts from './pages/posts';
import Top from './pages/Top';
import FormPage from './pages/Form';

function App() {
  return (
    <Router>
      <Top />
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/index" element={<Home />} />
        <Route path="/message-board" element={<MessageBoard />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="*" element={<Navigate to="/index" />} />
      </Routes>
    </Router>
  );
}

export default App;
