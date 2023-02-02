import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNote } from '@/hooks/note'
import { ADD_FOLDER } from '@/utils/constant'
import { NoteContext } from '@/context/notes'

const CreateFolderModal = ({ openModal, setOpenModal }) => {
    const [open, setOpen] = useState(false)
    const { createFolder } = useNote()
    const { dispatch } = useContext(NoteContext)
    const inputRef = useRef()

    useEffect(() => {
        setOpen(openModal)
    }, [openModal])

    const handleCreateFolder = async () => {
        if (!inputRef.current?.value) return
        setOpen(false)
        setOpenModal(false)
        let timeout = setTimeout(
            await createFolder({
                name: inputRef.current.value,
            }).then(res =>
                dispatch({
                    type: ADD_FOLDER,
                    payload: res.data,
                }),
            ),
            2000,
        )
        clearTimeout(timeout)
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    setOpen(false)
                    setOpenModal(false)
                }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="space-y-1">
                                    <label>Folder Name</label>
                                    <input
                                        ref={inputRef}
                                        className="border border-gray-300 rounded-md w-full p-2"
                                        placeholder="Folder name..."
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <div className="pt-2 flex items-center space-x-3">
                                        <button
                                            className="font-bold text-gray-500 hover:text-gray-600"
                                            onClick={() => {
                                                setOpen(false)
                                                setOpenModal(false)
                                            }}>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleCreateFolder}
                                            className="bg-blue-600 hover:bg-blue-700 drop-shadow-lg hover:drop-shadow-2xl text-white px-3 py-1 rounded-md">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CreateFolderModal
