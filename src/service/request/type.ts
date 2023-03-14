import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 拦截器类型定义
export interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// config扩展：把拦截器和config一起组成新的类型，主要为了扩展拦截器
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>
  showLoading?: boolean
}
