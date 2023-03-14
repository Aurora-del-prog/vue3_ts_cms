<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <users-search @query-click="handleQueryClick" @reset-click="handleResetClick" />

    <!-- 2.展示区域 -->
    <users-content
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />

    <!-- 3.新建和编辑 -->
    <users-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UsersSearch from './c-cpns/users-search.vue'
import UsersContent from './c-cpns/users-content.vue'
import UsersModal from './c-cpns/users-modal.vue'
import { ref } from 'vue'

// 1.重置功能
const contentRef = ref<InstanceType<typeof UsersContent>>()
function handleQueryClick(searchInfo: any) {
  contentRef.value?.fetchUserListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}

// 2.新建和编辑数据
const modalRef = ref<InstanceType<typeof UsersModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
function handleEditDataClick(data: any) {
  modalRef.value?.setDialogVisible(false, data)
}
</script>

<style lang="less" scoped></style>
