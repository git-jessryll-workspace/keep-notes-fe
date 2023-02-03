import { useNote } from '@/hooks/note'
import {
    DocumentPlusIcon,
    FolderPlusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import CreateFolderModal from './folders/CreateFolderModal'

const FabAction = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const { createNote } = useNote()
    return (
        <div>
            <CreateFolderModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
            />
            {showMenu && (
                <div className="w-[30%]">
                    <button
                        className={`text-gray-500 fixed z-90 bottom-[154px] right-[38px] duration-300 drop-shadow-lg hover:font-bold hover:drop-shadow-2xl cursor-pointer animate-fade-in flex items-center`}
                        onClick={() => {
                            setShowCreateModal(true)
                            setShowMenu(false)
                        }}>
                        Create new folder
                        <FolderPlusIcon className="h-10 w-10 hover:h-12 hover:w-12 p-2.5 ml-4 border ease-out duration-300 border-gray-300 rounded-full shadow-lg bg-[#44469a] hover:bg-[#444692] text-white" />
                    </button>
                    <button
                        onClick={async () => {
                            await createNote({
                                title: 'New note',
                                body: JSON.stringify({
                                    ops: [{ insert: 'Write your note' }],
                                }),
                            })
                        }}
                        className={`text-gray-500 fixed z-90 animate-fade-in bottom-[100px] right-[38px] duration-300 drop-shadow-lg hover:font-bold hover:drop-shadow-2xl cursor-pointer flex items-center`}>
                        Create new note{' '}
                        <DocumentPlusIcon className="h-10 w-10 hover:h-12 hover:w-12 ease-out duration-300 p-2.5 ml-4 bg-[#44469a] hover:bg-[#444692] rounded-full border border-gray-200 text-white" />
                    </button>
                </div>
            )}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className={`fixed z-90 bottom-10 right-8 bg-[#44469a] hover:bg-[#444692] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl duration-300 ${
                    showMenu && 'rotate-45'
                }`}>
                <PlusIcon className="w-8 h-8 text-white" />
            </button>
        </div>
    )
}

export default FabAction
