import {
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Rate,
  Upload,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function FieldRenderer({ field, disabled = false, value, onChange }) {
  const props = { disabled, value, onChange };

  switch (field.type) {
    case 'input':
      return <Input {...props} placeholder={field.placeholder} />;
    case 'textarea':
      return <Input.TextArea {...props} placeholder={field.placeholder} rows={3} />;
    case 'number':
      return <InputNumber {...props} placeholder={field.placeholder} style={{ width: '100%' }} />;
    case 'radio':
      return (
        <Radio.Group {...props}>
          {(field.options || []).map((opt) => (
            <Radio key={opt.value} value={opt.value}>
              {opt.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case 'checkbox':
      return (
        <Checkbox.Group
          {...props}
          options={(field.options || []).map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
        />
      );
    case 'select':
      return (
        <Select
          {...props}
          placeholder={field.placeholder}
          style={{ width: '100%' }}
          options={(field.options || []).map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
        />
      );
    case 'datepicker':
      return <DatePicker {...props} placeholder={field.placeholder} style={{ width: '100%' }} />;
    case 'switch':
      return <Switch checked={value} onChange={onChange} disabled={disabled} />;
    case 'rate':
      return <Rate {...props} count={field.count || 5} />;
    case 'upload':
      return (
        <Upload disabled={disabled}>
          <Button icon={<UploadOutlined />} disabled={disabled}>
            {field.buttonText || '点击上传'}
          </Button>
        </Upload>
      );
    default:
      return <Input {...props} placeholder="未知组件" />;
  }
}
