import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, Modal as RACModal, ModalOverlay } from 'react-aria-components'

export const Modal = ({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ModalOverlay>, 'children'> & {
  children: React.ReactNode
}) => {
  return (
    <ModalOverlay
      isDismissable
      className="modal-overlay fixed inset-0 flex justify-center overflow-auto bg-gray-600/50"
      {...props}
    >
      <RACModal className="modal-content my-4 inline-block h-fit w-full max-w-lg transform rounded bg-white px-4 py-8 text-left shadow-xl sm:my-8 sm:px-6">
        <Dialog>
          <Button
            slot="close"
            className="absolute top-1.5 right-1.5 rounded border border-transparent p-0.5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
          {children}
        </Dialog>
      </RACModal>
    </ModalOverlay>
  )
}
