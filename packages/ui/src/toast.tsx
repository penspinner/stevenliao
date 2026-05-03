import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Text,
  UNSTABLE_ToastRegion,
  UNSTABLE_ToastContent,
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastQueue,
} from 'react-aria-components'

interface ToastContentType {
  description: string
  type?: 'success' | 'error'
}

export const toastQueue = new UNSTABLE_ToastQueue<ToastContentType>()

export const ToastViewport = () => {
  return (
    <UNSTABLE_ToastRegion
      queue={toastQueue}
      className="fixed right-0 bottom-0 z-50 flex w-96 max-w-screen-xl list-none flex-col gap-3 p-6 outline-none"
    >
      {({ toast }) => (
        <RACToast
          toast={toast}
          className="ring-opacity-5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black"
        >
          <div className="flex items-start gap-x-3 p-4">
            {toast.content.type === 'success' ? (
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
            ) : (
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
            )}
            <div className="w-0 flex-1 pt-0.5">
              <UNSTABLE_ToastContent>
                <Text slot="title" className="text-sm font-medium text-gray-900">
                  {toast.content.description}
                </Text>
              </UNSTABLE_ToastContent>
            </div>
            <div className="flex flex-shrink-0">
              <Button
                slot="close"
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </RACToast>
      )}
    </UNSTABLE_ToastRegion>
  )
}
