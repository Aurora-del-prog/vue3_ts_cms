export const searchConfig = {
  pageName: 'category',
  formItems: [
    {
      label: '类别名称',
      prop: 'name',
      type: 'input',
      // 初识化值
      initialValue: '',
      placeholder: '请输入类别名称'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date-picker',
      placeholder: '请选择创建时间范围'
    }
  ]
}
