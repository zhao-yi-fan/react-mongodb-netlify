import { Input, Form } from 'antd';

function InputComponent({ label, name, rules, options, ...restProps }) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input {...restProps} />
    </Form.Item>
  );
}

export default InputComponent;
