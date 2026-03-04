import { useState } from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Button, Form } from 'antd';
import { Input, Radio } from '../../components';
import './index.scss';

const components = {
  Input,
  Radio,
};

const defaultConfig = [
  {
    type: 'Input',
    placeholder: '请输入',
    name: 'username',
    label: '姓名',
    rules: [{ required: true, message: '请输入用户名' }],
  },
  {
    type: 'Radio',
    placeholder: 'xxx2',
    name: 'xxx2',
    label: 'xxx2',
    options: [
      { label: 'xxx1', value: 1 },
      { label: 'xxx2', value: 2 },
      { label: 'xxx3', value: 3 },
    ],
  },
];

function AutoForm() {
  const [dataModel] = useState(defaultConfig);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="auto-form">
      <div className="view">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          {dataModel.map((item, index) => {
            const Component = components[item.type];
            return <Component key={index} {...item} />;
          })}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="code">
        <JsonView data={defaultConfig} style={defaultStyles} />
      </div>
    </div>
  );
}

export default AutoForm;
