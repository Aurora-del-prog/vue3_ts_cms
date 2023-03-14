export const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建数据'
  },
  propsList: [
    { type: 'selection', label: '选择' },
    { type: 'index', label: '序号', width: 80 },

    { type: 'normal', prop: 'name', label: '角色名称', width: 250 },

    { type: 'time', prop: 'createAt', label: '创建时间' },
    { type: 'time', prop: 'updateAt', label: '更新时间' },

    // 按钮
    { type: 'handler', label: '操作', width: 200 }
  ]
}
