import { useState, useMemo } from 'react';
import { Button, Form, Input as AntInput, Modal, message, Alert } from 'antd';
import { CodeOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Input, Radio } from '../../components';
import './index.scss';

const components = { Input, Radio };

const defaultConfig = [
  {
    type: 'Input',
    placeholder: '请输入姓名',
    name: 'name',
    label: '姓名',
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    type: 'Input',
    placeholder: '请输入邮箱',
    name: 'email',
    label: '邮箱',
    rules: [{ required: true, message: '请输入邮箱' }],
  },
  {
    type: 'Radio',
    name: 'gender',
    label: '性别',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    type: 'Radio',
    name: 'education',
    label: '学历',
    options: [
      { label: '本科', value: 'bachelor' },
      { label: '硕士', value: 'master' },
      { label: '博士', value: 'phd' },
    ],
  },
  {
    type: 'Input',
    placeholder: '请输入备注信息',
    name: 'remark',
    label: '备注',
  },
];

function AutoForm() {
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultConfig, null, 2));
  const [jsonError, setJsonError] = useState('');
  const [form] = Form.useForm();

  const dataModel = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setJsonError('配置必须是数组格式');
        return [];
      }
      setJsonError('');
      return parsed;
    } catch {
      setJsonError('JSON 格式错误，请检查语法');
      return [];
    }
  }, [jsonText]);

  const onFinish = (values) => {
    Modal.success({
      title: '表单提交成功',
      icon: <CheckCircleOutlined />,
      content: (
        <pre style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8, fontSize: 13, maxHeight: 300, overflow: 'auto' }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
      width: 480,
    });
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(defaultConfig, null, 2));
    form.resetFields();
    message.info('已重置为默认配置');
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1><CodeOutlined style={{ marginRight: 8 }} />动态表单</h1>
        <p>编辑右侧 JSON 配置，实时预览左侧表单效果</p>
      </div>
      <div className="form-page-body">
        <div className="form-preview">
          <div className="section-title">
            <EyeOutlined style={{ marginRight: 6 }} />表单预览
          </div>
          <Form
            form={form}
            name="dynamic-form"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={onFinish}
          >
            {dataModel.map((item, index) => {
              const Component = components[item.type];
              if (!Component) return null;
              return <Component key={`${item.name}-${index}`} {...item} />;
            })}
            {dataModel.length > 0 && (
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button onClick={() => form.resetFields()}>
                    清空
                  </Button>
                </div>
              </Form.Item>
            )}
          </Form>
          {dataModel.length === 0 && !jsonError && (
            <div className="form-empty">请在右侧编辑 JSON 配置</div>
          )}
        </div>
        <div className="form-editor">
          <div className="section-title">
            <CodeOutlined style={{ marginRight: 6 }} />JSON 配置
            <Button size="small" onClick={handleReset} style={{ marginLeft: 'auto' }}>
              重置
            </Button>
          </div>
          {jsonError && (
            <Alert message={jsonError} type="error" showIcon style={{ marginBottom: 12 }} />
          )}
          <AntInput.TextArea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            autoSize={{ minRows: 18, maxRows: 30 }}
            style={{ fontFamily: 'Menlo, Monaco, Consolas, monospace', fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AutoForm;
