import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, clearUserInfo } from '../../store/reducers/user';
import './top.scss';
import { Avatar, Popover, Modal, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function PersonPopover({ onLogout }) {
  return (
    <div className="avatar-pop">
      <p>我的主页</p>
      <p>设置</p>
      <p onClick={onLogout}>退出</p>
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
        <div className="nav-list">
          <NavLink to="/index" className="link">主页</NavLink>
          <NavLink to="/message-board" className="link">留言板</NavLink>
          <NavLink to="/form" className="link">表单</NavLink>
          {username ? (
            <Popover
              content={<PersonPopover onLogout={() => dispatch(clearUserInfo())} />}
              trigger="click"
            >
              <Avatar className="top-avatar" size="large" icon={<UserOutlined />} />
            </Popover>
          ) : (
            <a className="link" onClick={() => setIsModalVisible(true)}>登录</a>
          )}
          <Modal
            title="登录"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ username: '', password: '' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
