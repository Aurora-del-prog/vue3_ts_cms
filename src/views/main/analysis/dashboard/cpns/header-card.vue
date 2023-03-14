<template>
  <div class="header-card">
    <div class="header">
      <div class="title">
        <span>{{ props.title }}</span>
        <el-icon><Warning /></el-icon>
      </div>
      <div class="count" ref="countRef1">{{ props.number1 }}</div>
      <div class="total" ref="countRef2">
        <span>{{ props.number2 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
// 赋予默认值
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品的总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})
//创建countup的实例对象
const countRef1 = ref<HTMLElement>()
const countRef2 = ref<HTMLElement>()
// 参数1：执行动画的元素
// 参数2：数字增加到多少
// 参数3：前缀
const option1 = {
  prefix: props.amount === 'saleroom' ? '¥' : ''
}
const option2 = {
  prefix: props.amount === 'saleroom' ? `${props.subtitle} ¥` : `${props.subtitle} `
}
// 等到dom挂在成功后再开始挂载
onMounted(() => {
  const countup1 = new CountUp(countRef1.value!, props.number1, option1)
  const countup2 = new CountUp(countRef2.value!, props.number2, option2)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.header-card {
  width: 100%;
  color: black;
  font-size: 18px;

  .header {
    padding: 20px;
    border: 1px solid #fff;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 13px;
      color: #ccc;
    }
    .count {
      font-size: 24px;
    }
    .total {
      font-size: 16px;
      margin-top: 13px;
      padding-top: 13px;
      border-top: 1px solid #fff;
      .name {
        display: inline-block;
      }
    }
  }
}
</style>
