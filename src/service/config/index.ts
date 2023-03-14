//  const BASE_URL1 = 'http://152.136.185.210:5000'
let BASE_URL = 'http://152.136.185.210:5000'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  // 开发环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
