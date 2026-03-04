import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, Typography } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  FormOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { logout } from '../store/reducers/user';
import './AdminLayout.scss';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '仪表盘' },
  { key: '/posts', icon: <FileTextOutlined />, label: '文章管理' },
  { key: '/message-board', icon: <MessageOutlined />, label: '留言板' },
  { key: '/users', icon: <UserOutlined />, label: '用户管理' },
  { key: '/form-designer', icon: <FormOutlined />, label: '表单设计器' },
  { key: '/forms', icon: <UnorderedListOutlined />, label: '表单列表' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = '/' + location.pathname.split('/')[1];

  const handleMenuClick = ({ key }) => navigate(key);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const dropdownItems = {
    items: [
      { key: 'role', label: `角色：${userInfo?.role || '-'}`, disabled: true },
      { type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
    ],
    onClick: ({ key }) => {
      if (key === 'logout') handleLogout();
    },
  };

  return (
    <Layout className="admin-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        className="admin-sider"
      >
        <div className="admin-logo">
          {collapsed ? <span className="logo-icon">A</span> : <span className="logo-text">Admin</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
          />
          <div className="header-right">
            <Dropdown menu={dropdownItems} placement="bottomRight">
              <div className="user-info">
                <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#667eea' }} />
                <Text className="username">{userInfo?.username || '用户'}</Text>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
