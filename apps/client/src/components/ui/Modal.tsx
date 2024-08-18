import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { Button } from './Button'

export interface ModalProps {
  visible: boolean
  onClose: () => void
  onOk?: () => void
  title?: string
  children: React.ReactNode
  cancelTitle?: string
  okTitle?: string
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  okButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export default function Modal({
  visible,
  onClose,
  onOk,
  title,
  okTitle,
  cancelTitle,
  children,
  cancelButtonProps = {},
  okButtonProps = {},
}: ModalProps) {
  return (
    <Transition
      show={visible}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='bg/75 fixed inset-0 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md overflow-hidden rounded-lg border-2 border-inverted bg p-6 text-left shadow-xl transition-all'>
                {title && (
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-semibold leading-6'
                  >
                    {title}
                  </Dialog.Title>
                )}
                <div className='mt-4'>{children}</div>
                <div className='mt-6 flex justify-end gap-2'>
                  <Button
                    variant='alternative'
                    onClick={onClose}
                    {...cancelButtonProps}
                  >
                    {cancelTitle ? cancelTitle : 'Close'}
                  </Button>
                  <Button
                    onClick={onOk}
                    {...okButtonProps}
                  >
                    {okTitle ? okTitle : 'Submit'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
