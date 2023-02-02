import { NoteContext } from '@/context/notes'
import axios from '@/lib/axios'
import { dateTimeFormat } from '@/utils'
import { SET_NOTE_LIST } from '@/utils/constant'
import { FolderIcon } from '@heroicons/react/20/solid'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useSWR from 'swr'
import LinkFolderNoteModal from '../folders/LinkFolderNoteModal'

const Notes = () => {
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const { state, dispatch } = useContext(NoteContext)
    const router = useRouter()
    const { error } = useSWR('/api/notes', () =>
        axios
            .get('/api/notes')
            .then(res => dispatch({
                type: SET_NOTE_LIST,
                payload: res.data,
            }))
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/login')
            }),
    )

    const FolderName = ({ folderId }) => {
        let folder = state.folders.filter(i => i.id === folderId)
        if (folder.length === 0) return null

        return (
            <div className="text-xs font-[900] mb-1 flex space-x-1 items-center text-gray-600">
                <FolderIcon className="h-4 w-4 mr-1" />
                {folder[0].name}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {showLinkModal && (
                <LinkFolderNoteModal
                    openModal={showLinkModal}
                    setOpenModal={setShowLinkModal}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                />
            )}
            <div>
                <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                    Notes
                </h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {state.notes &&
                    state.notes.map((item, index) => (
                        <div
                            className="border border-gray-300 p-3 cursor-pointer shadow-sm rounded-md h-[112px]"
                            key={index}>
                            <div className="flex justify-between">
                                <div>
                                    <FolderName folderId={item.folder?.folder_id} />
                                </div>
                                <div>
                                    <EllipsisHorizontalIcon
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => {
                                            setShowLinkModal(true)
                                            setSelectedNote(item)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={`${!item.folder && "-mt-6"}`}>
                                <a
                                    className="font-bold text-sm cursor-pointer hover:border-b"
                                    onClick={() =>
                                        router.push(`/note/${item.id}`)
                                    }>
                                    {item.title}
                                </a>
                                <p className="text-xs -mt-0.5">
                                    {dateTimeFormat(item.updated_at)}
                                </p>
                                {item.tags && (
                                    <div className="flex pt-2 flex-wrap -mt-1.5">
                                        {item.tags.map((i, idx) => (
                                            <div
                                                key={idx}
                                                className="text-xs font-bold bg-gray-300 px-1.5 rounded-md mt-1 mr-1">
                                                {i.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Notes
