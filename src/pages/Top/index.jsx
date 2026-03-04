import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, clearUserInfo } from '../../store/reducers/user';
import './top.scss';
import { Avatar, Popover, Modal, Form, Input, Button } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

function PersonPopover({ onLogout, username }) {
  return (
    <div className="avatar-pop">
      <div className="avatar-pop-header">{username}</div>
      <div className="avatar-pop-item">我的主页</div>
      <div className="avatar-pop-item">设置</div>
      <div className="avatar-pop-item" onClick={onLogout}>
        <LogoutOutlined style={{ marginRight: 6 }} />退出
      </div>
    </div>
  );
}

export default function Top() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    dispatch(setUserName(values));
    setIsModalVisible(false);
  };

  return (
    <div className="top-f">
      <div className="top">
        <div className="nav-inner">
          <div className="nav-left">
            <span className="brand">MyBlog</span>
            <nav className="nav-links">
              <NavLink to="/index">主页</NavLink>
              <NavLink to="/message-board">留言板</NavLink>
              <NavLink to="/form">表单</NavLink>
            </nav>
          </div>
          <div className="nav-right">
            {username ? (
              <Popover
                content={
                  <PersonPopover
                    username={username}
                    onLogout={() => dispatch(clearUserInfo())}
                  />
                }
                trigger="click"
                placement="bottomRight"
              >
                <Avatar className="top-avatar" size={36} icon={<UserOutlined />} />
              </Popover>
            ) : (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="登录"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={420}
        centered
      >
        <Form
          name="login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ username: '', password: '' }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
