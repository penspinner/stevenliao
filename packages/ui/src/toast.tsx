import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { ToastProps as RadixToastProps } from '@radix-ui/react-toast'
import {
  Toast as RadixToast,
  ToastViewport as RadixToastViewport,
  ToastClose,
  ToastDescription,
  ToastProvider,
} from '@radix-ui/react-toast'

type ToastProps = Omit<RadixToastProps, 'type'> & {
  description: string
  type?: 'success' | 'error'
}

export const Toast = ({ description, type, ...props }: ToastProps) => {
  return (
    <RadixToast
      className="[&[data-state='closed']]:animate-toast-out [&[data-state='open']]:animate-toast-in [&[data-swipe='end']]:animate-toast-swipe-out [&[data-swipe='move']]:translate-x-[var(--radix-toast-swipe-move-x)]"
      {...props}
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="flex items-start gap-x-3 p-4">
          {type === 'success' ? (
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
            </div>
          ) : (
            <div className="flex-shrink-0">
              <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
            </div>
          )}
          <div className="w-0 flex-1 pt-0.5">
            <ToastDescription className="text-sm font-medium text-gray-900">
              {description}
            </ToastDescription>
          </div>
          <div className="flex flex-shrink-0">
            <ToastClose
              type="button"
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </ToastClose>
          </div>
        </div>
      </div>
    </RadixToast>
  )
}

export { ToastProvider }

export const ToastViewport = () => {
  return (
    <RadixToastViewport className="fixed bottom-0 right-0 z-50 flex w-96 max-w-screen-xl list-none flex-col gap-3 p-6 outline-none" />
  )
}
