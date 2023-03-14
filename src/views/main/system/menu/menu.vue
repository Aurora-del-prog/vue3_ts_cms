<template>
  <div class="menu">
    <page-content :content-config="contentConfig" ref="contentRef">
      <template #leader="scope"> 111{{ scope.row.leader }}222 </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="department">
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config/content-config'
</script>

<style scoped></style>
