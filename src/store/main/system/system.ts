import {
  deletePageData,
  deleteUserData,
  editPageData,
  editUserData,
  getPageListData,
  getUserListData,
  newPageData,
  newUserData
} from '@/service/main/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUserListDataAction(queryInfo: any) {
      // 1.请求用户列表数据
      const userListResult = await getUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建用户数据
      const res = await newUserData(userInfo)
      console.log(res)

      // 2.请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async deleteUserDataAction(id: number) {
      const res = await deleteUserData(id)
      console.log(res)
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const res = await editUserData(id, userInfo)
      console.log(res)
      this.getUserListDataAction({ offset: 0, size: 10 })
    },

    // 统一封装，页面的网络请求 查
    async getPageListDataAction(pageName: string, queryInfo: any) {
      // 1.获取用户列表数据
      // queryInfo: 请求数据的数量{ offset: 0, size: 10 }
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataAction(pageName: string, id: number) {
      deletePageData(pageName, id).then(() => {
        this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      })
    },
    async newPageDataAction(pageName: string, pageData: any) {
      newPageData(pageName, pageData).then(() => {
        this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      })
    },
    async editPageDataAction(pageName: string, id: number, pageData: any) {
      editPageData(pageName, id, pageData).then(() => {
        this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      })
    }
  }
})

export default useSystemStore
