import useLoginStore from '@/store/login/login'
export function usePermission(pageName: string, handleName: string) {
  const queryPermission = `${pageName}:${handleName}`
  const permissions = useLoginStore().permissions
  // console.log(permissions)
  return !!permissions.find((item) => item.includes(queryPermission))
}
