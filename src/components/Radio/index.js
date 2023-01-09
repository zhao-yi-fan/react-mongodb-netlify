import { Radio, Space, Form } from 'antd'

function RadioComponent (props) {
  const { options, label, name, rules, ...restProps } = props || {}
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
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