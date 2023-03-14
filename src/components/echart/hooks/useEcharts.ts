import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// 注册地图
import chinaJson from '../data/china.json'
// 对类型要求较为严格
echarts.registerMap('china', chinaJson as any)

// 对普通图进行初始化
export function useEcharts(domEl: HTMLElement, theme = 'light') {
  // 初始化echarts
  const echartsInstance = echarts.init(domEl, theme, { renderer: 'svg' })
  // 设置options
  const setOptions = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }
  // 监听window尺寸的变化，折叠的时候也可以监听（需要额外设置）
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  // 返回元祖，提取时要按序
  return [setOptions]
}
