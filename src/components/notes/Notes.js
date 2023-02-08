import { NoteContext } from '@/context/notes'
import { useNote } from '@/hooks/note'
import axios from '@/lib/axios'
import { dateTimeFormat } from '@/utils'
import { ADD_FAVORITE, DELETE_FAVORITE, SET_NOTE_LIST } from '@/utils/constant'
import {
    FolderIcon,
    HeartIcon as HeartIconSolid,
} from '@heroicons/react/20/solid'
import { EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useSWR from 'swr'
import LinkFolderNoteModal from '../folders/LinkFolderNoteModal'

const Notes = ({ filteredFavorites = false }) => {
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const { state, dispatch } = useContext(NoteContext)
    const { addFavorite, deleteFavorite } = useNote()
    const router = useRouter()
    const { error } = useSWR('/api/notes', () =>
        axios
            .get('/api/notes')
            .then(res =>
                dispatch({
                    type: SET_NOTE_LIST,
                    payload: res.data,
                }),
            )
            .catch(error => {
                if (error.response.status === 401) return router.push('/login')
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

    const FavoriteComponent = ({ noteId }) => {
        let favorite = state.favorites
            .filter(item => item.favorable_id === noteId)
            .filter(item => item.favorable_type === 'NOTE')

        if (favorite.length !== 0) {
            return (
                <HeartIconSolid
                    onClick={async () => {
                        dispatch({
                            type: DELETE_FAVORITE,
                            payload: favorite[0].id,
                        })
                        let timeout = setTimeout(
                            await deleteFavorite({ id: favorite[0].id }),
                            2000,
                        )
                        clearTimeout(timeout)
                    }}
                    className="cursor-pointer"
                />
            )
        }
        return (
            <HeartIcon
                onClick={async () => {
                    await addFavorite({
                        favorable_id: noteId,
                        favorable_type: 'NOTE',
                    }).then(res => {
                        dispatch({
                            type: ADD_FAVORITE,
                            payload: res.data,
                        })
                    })
                }}
                className="cursor-pointer"
            />
        )
    }

    const queryFilter = () => {
        if (!state.folder) {
            if (!filteredFavorites) {
                return state.notes
            }
            const favoriteNoteIds = state.favorites
                .filter(item => item.favorable_type === 'NOTE')
                .map(item => item.favorable_id)
            return state.notes.filter(
                item => favoriteNoteIds.indexOf(item.id) !== -1,
            )
        }
        if (!filteredFavorites) {
            return state.notes.filter(
                item => item.folder?.folder_id === state.folder.id,
            )
        }
        const favoriteNoteIds = state.favorites
            .filter(item => item.favorable_type === 'NOTE')
            .map(item => item.favorable_id)
        return state.notes
            .filter(item => favoriteNoteIds.indexOf(item.id) !== -1)
            .filter(item => item?.folder?.folder_id === state.folder.id)
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {state.notes &&
                    queryFilter().map((item, index) => (
                        <div
                            className="border bg-[#f5f5f5] border-gray-300 p-3 shadow-sm rounded-xl h-[120px]"
                            key={index}>
                            <div className="flex justify-between">
                                <div>
                                    <FolderName
                                        folderId={item.folder?.folder_id}
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <FavoriteComponent noteId={item.id} />
                                    <EllipsisHorizontalIcon
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => {
                                            setShowLinkModal(true)
                                            setSelectedNote(item)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={`${!item.folder && '-mt-6'}`}>
                                <a
                                    className="font-bold cursor-pointer hover:text-gray-900"
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
