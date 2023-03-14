import myRequest from '..'

export function accountLogin(account: any) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return myRequest.get({
    url: '/users/' + id
  })
}

export function getRoleMenus(id: number) {
  return myRequest.get({
    url: `/role/${id}/menu`
  })
}
