import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type callbackType = (item: any) => void
type newCallbackType = () => void

function usePageModal(editCallback?: callbackType, newCallback?: newCallbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewDataClick() {
    if (newCallback) newCallback()
    modalRef.value?.setDialogVisible()
  }
  function handleEditDataClick(data: any) {
    // 回显编辑框的权限数据
    if (editCallback) editCallback(data)
    modalRef.value?.setDialogVisible(false, data)
  }

  return {
    modalRef,
    handleNewDataClick,
    handleEditDataClick
  }
}

export default usePageModal
