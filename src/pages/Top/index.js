import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { bindActionCreators } from 'redux';
import store from '../../store'
import actions from '../../store/actions/user'
import './top.scss'
import { Avatar, Popover, Modal, Form, Input, Button } from 'antd';

let boundActions = bindActionCreators(actions, store.dispatch)


function personPopover () {
  const clearUserInfo = () => {
    boundActions.clearUserInfo()
  }
  return (
    <>
      <div className="avatar-pop">
        <p>我的主页</p>
        <p>设置</p>
        <p onClick={clearUserInfo}>退出</p>
      </div>

    </>
  )
}

export default function Top () {
  let state = store.getState().user;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loginDialog = () => {
    console.log(123);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    boundActions.setUserName(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="top-f">
      <div className="top">
        <div className="nav-list">
          <NavLink to="/index" className="link">主页</NavLink>
          <NavLink to="/message-board" className="link">留言板</NavLink>
          {
            state.username ?
              (
                <Popover content={personPopover()} trigger="click">
                  <Avatar className="top-avatar" size="large" src={require('../../static/avatar.jpg')} />
                </Popover>
              ) :
              (
                <a className="link"  onClick={loginDialog}>登录</a>
              )

          }
          <Modal title="Basic Modal" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ username: '', password: '' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}

