<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    >
      <template #leader="scope"> 111{{ scope.row.leader }}222 </template>
    </page-content>

    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import { searchConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'

import { computed } from 'vue'
import useMainStore from '@/store/main/main'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对下拉框数据进行处理  在登陆的时候已经获取过main里面的数据，刷新也会再次获取
const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = mainStore.entireDepartments as any
    }
  })
  return modalConfig
})

// 1.重置功能  // content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 2.新建和编辑数据
// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
</script>

<style scoped></style>
