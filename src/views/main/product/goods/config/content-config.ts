export const contentConfig = {
  pageName: 'goods',
  header: {
    title: '类别列表',
    btnTitle: '新建数据'
  },
  propsList: [
    { type: 'selection', label: '选择' },
    { type: 'index', label: '序号', width: 80 },
    { type: 'normal', prop: 'name', label: '商品名称', width: '100' },
    { type: 'normal', prop: 'oldPrice', label: '原价格', width: '80' },
    { type: 'normal', prop: 'newPrice', label: '新价格', width: '80' },
    { type: 'normal', prop: 'desc', label: '商品描述', width: '100' },
    { type: 'normal', prop: 'status', label: '状态', width: '80' },
    { type: 'custom', prop: 'imgUrl', label: '图片', width: '100', slotName: 'imageSlot' },
    { type: 'normal', prop: 'inventoryCount', label: '库存', width: '80' },
    { type: 'normal', prop: 'saleCount', label: '销量', width: '80' },
    { type: 'normal', prop: 'favorCount', label: '收藏', width: '80' },
    { type: 'normal', prop: 'address', label: '地址', width: '80' },
    { type: 'time', prop: 'createAt', label: '创建时间', width: '400' },
    { type: 'time', prop: 'updateAt', label: '更新时间', width: '400' },
    // 按钮
    { type: 'handler', label: '操作', width: 150 }
  ]
}
