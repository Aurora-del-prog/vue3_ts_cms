<template>
  <div class="search">
    <!-- 1.1.表单输入 -->
    <el-form :model="searchForm" ref="formRef" label-width="120px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 普通类型 -->
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <!-- 日历类型 -->
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option label="可用" :value="1" />
                  <el-option label="禁用" :value="0" />
                </el-select>
              </template>
              <!-- 密码类型 -->
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 1.2.搜索按钮  -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="page-search">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['queryClick', 'resetClick'])

// 1.创建表单的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  // 有初始值则赋予，无则''
  initialForm[item['prop']] = item['initialValue'] ?? ''
}
const searchForm = reactive(initialForm)

// 2.监听按钮的点击
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  console.log(formRef.value)
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 20px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 30px 10px 0;
  .el-button {
    margin-right: 10px;
  }
}
</style>
