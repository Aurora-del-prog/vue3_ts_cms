export const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      label: '商品名称',
      prop: 'name',
      type: 'input',
      // 初识化值
      initialValue: '',
      placeholder: '请输入商品名称'
    },
    {
      label: '商品地址',
      prop: 'address',
      type: 'input',
      // 初识化值
      initialValue: '',
      placeholder: '请输入商品地址'
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      placeholder: '请输入商品状态'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date-picker',
      placeholder: '请选择创建时间范围'
    }
  ]
}
