import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig, MyRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'
//单独引入loading 样式

import 'element-plus/theme-chalk/el-loading.css'
import useLoginStore from '@/store/login/login'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'
// 拦截器类型定义 :type.ts
// 分类：
// 不同实例的所有请求
// 同个实例的所有请求
// 同个实例的部分请求

const DEAFULT_LOADING = true

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    // 添加拦截器
    this.interceptors = config.interceptors
    // 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 不同实例可以单独传递各自的拦截器（即每个实例可以拥有自己的拦截器），比如loading，token...  实例拦截器

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器，即全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局请求捕获')
        // setTimeout(() => {
        //   // 将loading移除
        //   this.loading?.close()
        // }, 1000)
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        } else if (err.response.status === 401) {
          const loginStore = useLoginStore()
          console.log('刷新')
          loginStore.loadLocalDataAction()
        }
        return err
      }
    )
  }

  //相同实例里面，不同请求拥有各自的拦截器（请求拦截器）
  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // requestInterceptor会对config进行转化，对数据进行处理
        // 或者 transformRequest：
        // 作用：
        // 表示允许在向服务器发送前，修改请求数据
        config = config.interceptors?.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // res在前面的全局拦截已经去除里面的data，已经不再是AxiosResponse<T>类型
      // res的类型有由Promise<R>决定，即<T,R>R决定，所有在request需要注明类型，其返回Promise<R>，决定着res的类型，
      // 还需要对responseInterceptor的类型进行更改
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
