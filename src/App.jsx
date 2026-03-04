import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/home';
import MessageBoard from './pages/messageBoard';
import Posts from './pages/posts';
import UserManage from './pages/UserManage';
import FormDesigner from './pages/FormDesigner';
import FormList from './pages/FormList';
import FormPreview from './pages/FormPreview';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((s) => s.user);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<Home />} />
          <Route path="posts/:id" element={<Posts />} />
          <Route path="message-board" element={<MessageBoard />} />
          <Route path="users" element={<UserManage />} />
          <Route path="form-designer" element={<FormDesigner />} />
          <Route path="form-designer/:id" element={<FormDesigner />} />
          <Route path="forms" element={<FormList />} />
          <Route path="form-preview/:id" element={<FormPreview />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
