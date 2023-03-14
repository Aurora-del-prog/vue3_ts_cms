<template>
  <div class="overview">
    <div class="top">
      <span class="title">关于</span>
      Vue3Admin 是基于 Vue3、Pinia、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
      等后台系统解决方案。
    </div>
    <div class="center">
      <span class="title">技术栈</span>
      <ul>
        <template v-for="(item, index) in contentConfig" :key="index">
          <li>{{ item }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="overview">
import { contentConfig } from './config/content-config'
</script>

<style scoped lang="less">
.overview {
  background-color: #fff;
  .top {
    padding: 20px;
  }
  .title {
    display: block;
    font-style: 18px;
    padding: 15px;
    padding-left: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #000;
  }
  .center {
    padding: 20px;
    ul {
      list-style: none;
      li {
        padding: 5px 8px;
      }
    }
  }
}
</style>
