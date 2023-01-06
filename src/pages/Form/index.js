import { useState } from 'react'
import ReactJson from 'react-json-view'
import { Button, Form } from 'antd';
import { Input, Radio } from '../../components/index.js';
import './index.scss';

const config = [
  {
    type: Input,
    placeholder: '请输入',
    name: 'username',
    label: '姓名',
    rules: [
      {
        required: true,
        message: 'Please input your username!',
      },
    ]
  },
  {
    type: Radio,
    placeholder: 'xxx2',
    name: 'xxx2',
    label: 'xxx2',
    options: [
      {
        label: 'xxx1',
        value: 1
      },
      {
        label: 'xxx2',
        value: 2
      },
      {
        label: 'xxx3',
        value: 3
      },
    ]
  },
]

function AutoForm () {
  const [dataModel, setDataModel] = useState(config)
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="auto-form">
      <div className="view">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {
            dataModel.map((item, index) => {
              return <item.type key={index} {...item} />
            })
          }
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </div>
      <div className='code'>
        <ReactJson
          src={config}
          enableClipboard={false}
          onEdit={(edit) => { console.log(edit); setDataModel(edit.updated_src); }}
          onAdd={(add) => { console.log(add); }} />
      </div>
    </div >
  )
}


export default AutoForm;