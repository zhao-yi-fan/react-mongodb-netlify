import { Input, Form } from 'antd'

function InputComponent (props) {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={props.rules}
    >
      <Input {...props} />
    </Form.Item>
  )
}

export default InputComponent