import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'


interface MoralProps {
    elementShownWhenModalIsClose?:React.ReactNode;
    modalTitle?: string;
    modalDescription?: React.ReactNode;
    openModalButtonTitle?: string;
    cancelButtonTitle?: string;
    buttonOnClickCancel?: () => void;
    successButtonTitle?: string;
    buttonOnClickSuccess?: () => void;
    className?: string;
    style?: React.CSSProperties;

    cerrarModal?: boolean;

}

export default function Modal({elementShownWhenModalIsClose, cerrarModal = true, modalTitle, modalDescription, openModalButtonTitle, cancelButtonTitle, buttonOnClickCancel, successButtonTitle, buttonOnClickSuccess, className = "", style = {} }: MoralProps) {

    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div onClick={openModal} className="">
                {elementShownWhenModalIsClose}
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={cerrarModal ? closeModal : () => { }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {/* {modalTitle && */}
                                    <Dialog.Title
                                        as="h3"
                                        className=" mb-5 text-lg font-medium leading-6 text-gray-900 grid grid-flow-col "
                                    >
                                        {modalTitle}

                                        <div className='justify-self-end hover:cursor-pointer hover:hover:text-red-700' onClick={closeModal}>X</div>
                                    </Dialog.Title>
                                    {/* } */}

                                    {modalDescription &&
                                        <div className="mb-5">
                                            {modalDescription}
                                        </div>
                                    }

                                    <div className="grid grid-flow-col">
                                        {cancelButtonTitle &&
                                            <button
                                                type="button"
                                                className="inline-flex rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                {cancelButtonTitle}
                                            </button>
                                        }

                                        {successButtonTitle &&
                                            <button
                                                type="button"
                                                className="justify-self-end inline-flex self-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                {successButtonTitle}
                                            </button>
                                        }

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
