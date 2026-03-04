import {
  FontSizeOutlined,
  AlignLeftOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DownCircleOutlined,
  CalendarOutlined,
  SwapOutlined,
  StarOutlined,
  UploadOutlined,
  NumberOutlined,
} from '@ant-design/icons';

export const COMPONENT_LIST = [
  {
    key: 'input',
    label: '单行输入',
    icon: FontSizeOutlined,
    defaultPlaceholder: '请输入',
  },
  {
    key: 'textarea',
    label: '多行输入',
    icon: AlignLeftOutlined,
    defaultPlaceholder: '请输入',
  },
  {
    key: 'number',
    label: '数字输入',
    icon: NumberOutlined,
    defaultPlaceholder: '请输入数字',
  },
  {
    key: 'radio',
    label: '单选框',
    icon: CheckCircleOutlined,
    defaultOptions: [
      { label: '选项一', value: 'opt1' },
      { label: '选项二', value: 'opt2' },
    ],
  },
  {
    key: 'checkbox',
    label: '多选框',
    icon: CheckSquareOutlined,
    defaultOptions: [
      { label: '选项一', value: 'opt1' },
      { label: '选项二', value: 'opt2' },
    ],
  },
  {
    key: 'select',
    label: '下拉选择',
    icon: DownCircleOutlined,
    defaultPlaceholder: '请选择',
    defaultOptions: [
      { label: '选项一', value: 'opt1' },
      { label: '选项二', value: 'opt2' },
    ],
  },
  {
    key: 'datepicker',
    label: '日期选择',
    icon: CalendarOutlined,
    defaultPlaceholder: '请选择日期',
  },
  {
    key: 'switch',
    label: '开关',
    icon: SwapOutlined,
  },
  {
    key: 'rate',
    label: '评分',
    icon: StarOutlined,
    defaultProps: { count: 5 },
  },
  {
    key: 'upload',
    label: '文件上传',
    icon: UploadOutlined,
    defaultProps: { buttonText: '点击上传' },
  },
];
