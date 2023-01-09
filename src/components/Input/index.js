import { Input, Form } from 'antd'

function InputComponent (props) {
  const { options, label, name, rules, ...restProps } = props || {}
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={props.rules}
    >
      <Input {...restProps} />
    </Form.Item>
  )
}

export default InputComponent