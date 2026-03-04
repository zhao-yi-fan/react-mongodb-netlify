import { useEffect, useState } from 'react';
import { Table, Button, Tag, Typography, message, Popconfirm, Space } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import request from '../../utils/request';
import './userManage.scss';

const { Title } = Typography;

export default function UserManage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await request.get('/userAll');
      setUsers(res.data || []);
    } catch (err) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await request.delete(`/userDelete?id=${id}`);
      message.success('删除成功');
      fetchUsers();
    } catch (err) {
      message.error(err.error || '删除失败');
    }
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 180,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (v) => v || '-',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <Tag color={role === 'admin' ? 'purple' : 'blue'}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (v) => (v ? new Date(v).toLocaleString('zh-CN') : '-'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="确定删除该用户？"
          onConfirm={() => handleDelete(record._id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="user-manage-page">
      <div className="page-header">
        <Title level={4}>用户管理</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
            刷新
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered={false}
        className="user-table"
      />
    </div>
  );
}
