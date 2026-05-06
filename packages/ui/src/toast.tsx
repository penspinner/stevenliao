import { Toast, toast } from '@heroui/react'

export { toast }

export const ToastProvider = () => {
  return <Toast.Provider placement="bottom end" />
}
