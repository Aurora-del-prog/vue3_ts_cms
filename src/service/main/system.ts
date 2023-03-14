import myRequest from '..'

/** 用户的网络请求 */
export function getUserListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function newUserData(userInfo: any) {
  return myRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function deleteUserData(id: number) {
  return myRequest.delete({
    url: '/users/' + id
  })
}

export function editUserData(id: number, userInfo: any) {
  return myRequest.patch({
    url: '/users/' + id,
    data: userInfo
  })
}

/** 获取部门的信息 */
export function getDepartmentData(queryInfo: any) {
  return myRequest.post({
    url: '/department/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any) {
  return myRequest.post({
    url: '/role/list',
    data: queryInfo
  })
}

/** 获取菜单的信息 */
export function getMenuData() {
  return myRequest.post({
    url: '/menu/list'
  })
}

/** 获取页面的数据 */
export function getPageListData(pageName: string, queryInfo: any) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageData(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, dataInfo: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: dataInfo
  })
}

export function editPageData(pageName: string, id: number, dataInfo: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: dataInfo
  })
}
