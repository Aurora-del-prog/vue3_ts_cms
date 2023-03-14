<template>
  <div class="dashboard">
    <!-- 顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelDatas" :key="item.amount">
        <el-col :span="6">
          <header-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 卡片区域 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <my-card title="分类商品的销量">
          <line-echart :labels="categoryGoodsSale.labels" :values="categoryGoodsSale.values" />
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="分类商品的收藏">
          <bar-echart :labels="categoryGoodsSale.labels" :values="categoryGoodsSale.values" />
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import useAnalysisStore from '@/store/main/analysis/analysis'
import HeaderCard from './cpns/header-card.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import MyCard from '@/base-card/base-card.vue'
import {
  PieEchart,
  MapEchart,
  RoseEchart,
  BarEchart,
  LineEchart
} from '@/components/page-echart/index'

// 获取数据
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 数据列表
const { topPanelDatas } = storeToRefs(analysisStore)

// 卡片

const categoryGoodsCount = computed(() => {
  return analysisStore.categoryGoodsCount.map((item: any) => {
    return { value: item.goodsCount, name: item.name }
  })
})
const categoryGoodsSale = computed(() => {
  const goodsSale = analysisStore.categoryGoodsSale
  const labels: string[] = []
  const values: any[] = []
  for (const item of goodsSale) {
    labels.push(item.name)
    values.push(item.goodsCount)
  }
  return { labels, values }
})
const addressGoodsSale = computed(() => {
  return analysisStore.goodsAddressSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.dashboard {
  .el-row {
    .el-col {
      margin-bottom: 10px;
    }
  }
}
</style>
