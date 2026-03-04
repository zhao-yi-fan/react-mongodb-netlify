import { Radio, Space, Form } from 'antd';

function RadioComponent({ options = [], label, name, rules }) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Radio.Group>
        <Space direction="vertical">
          {options.map((item, index) => (
            <Radio key={index} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
}

export default RadioComponent;
