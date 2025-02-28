import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export default function Modal({isOpen, onClose, children}: ModalProps) {

    return (
        <Dialog open={isOpen} onClose={onClose} 
            className="fixed inset-0 z-50"
        >
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25 dark:bg-white/25 backdrop-blur-sm" />
            </Transition.Child>
            
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
                    <Dialog.Panel className=" w-full max-w-2xl transform rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-xl transition-all">                
                        {children}
                    </Dialog.Panel>
                </Transition.Child>  
            </div>
            
        </Dialog>
    )
}