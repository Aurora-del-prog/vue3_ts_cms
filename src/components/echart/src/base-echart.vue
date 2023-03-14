<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef" :style="{ width: props.width, height: props.height }"></div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref, onMounted, watchEffect } from 'vue'
import { useEcharts } from '../hooks/useEcharts'

interface IProps {
  options: EChartsOption
  width?: string
  height?: string
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({}),
  width: '100%',
  height: '350px'
})

// 挂载dom
const echartRef = ref<HTMLElement>()
// 等到dom挂载完成再把值传递
// watchEffect 也是一个帧听器，是一个副作用函数。 它会监听引用数据类型的所有属性，不需要具体到某个属性，一旦运行就会立即监听，组件卸载的时候会停止监听
onMounted(() => {
  const [setOptions] = useEcharts(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped>
.echart {
  background-color: #fff;
}
</style>
