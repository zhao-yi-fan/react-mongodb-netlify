import { Radio, Space, Form } from 'antd'

function RadioComponent (props) {
  const options = props.options || []
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={props.rules}
    >
      <Radio.Group >
        <Space direction="vertical">
          {
            options.map((item, index) => {
              return <Radio key={index} value={item.value}>{item.label}</Radio>
            })
          }
        </Space>
      </Radio.Group>
    </Form.Item>

  )
}

export default RadioComponent