import { XMarkIcon } from '@heroicons/react/24/outline'
import type { DialogProps } from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@radix-ui/react-dialog'

export const Modal = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay className="modal-overlay fixed inset-0 flex justify-center overflow-auto bg-gray-600/50">
          <DialogContent className="modal-content my-4 inline-block h-fit w-full max-w-lg transform rounded bg-white px-4 py-8 text-left shadow-xl transition-all sm:my-8 sm:px-6">
            <DialogClose
              type="button"
              className="absolute top-1.5 right-1.5 rounded border border-transparent p-0.5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
            >
              <XMarkIcon className="h-5 w-5" />
            </DialogClose>
            {children}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  )
}
