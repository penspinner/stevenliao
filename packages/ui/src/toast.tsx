import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Toast,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastTitle,
  toast,
} from '@heroui/react'
import type { ToastContentValue } from '@heroui/react'

export { toast }

export const ToastProvider = () => {
  return (
    <Toast.Provider placement="bottom end">
      {({ toast: toastItem }) => {
        const content = toastItem.content as ToastContentValue & {
          type?: 'success' | 'error'
          description?: string
        }

        return (
          <Toast
            toast={toastItem}
            className="ring-opacity-5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black"
          >
            <div className="flex items-start gap-x-3 p-4">
              {content.type === 'success' ? (
                <div className="shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
              ) : content.type === 'error' ? (
                <div className="shrink-0">
                  <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                </div>
              ) : (
                <ToastIndicator className="shrink-0" />
              )}
              <div className="w-0 flex-1">
                <ToastContent>
                  {content.title ? (
                    <ToastTitle className="text-sm font-medium text-gray-900">
                      {content.title}
                    </ToastTitle>
                  ) : null}
                  {content.description ? (
                    <ToastDescription className="text-sm text-gray-500">
                      {content.description}
                    </ToastDescription>
                  ) : null}
                </ToastContent>
              </div>
              <div className="flex shrink-0">
                <Button
                  slot="close"
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Toast>
        )
      }}
    </Toast.Provider>
  )
}
