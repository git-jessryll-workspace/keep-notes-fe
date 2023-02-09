import { NoteContext } from '@/context/notes'
import { useNote } from '@/hooks/note'
import axios from '@/lib/axios'
import { dateTimeFormat } from '@/utils'
import { ADD_FAVORITE, DELETE_FAVORITE, SET_NOTE_LIST } from '@/utils/constant'
import {
    FolderIcon,
    HeartIcon as HeartIconSolid,
} from '@heroicons/react/20/solid'
import {
    ChevronDownIcon,
    EllipsisVerticalIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Fragment, useContext, useState } from 'react'
import useSWR from 'swr'
import LinkFolderNoteModal from '../folders/LinkFolderNoteModal'
import { Menu, Transition } from '@headlessui/react'
import Dropdown from '../Dropdown'

const Notes = ({ filteredFavorites = false }) => {
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const { state, dispatch } = useContext(NoteContext)
    const { addFavorite, deleteFavorite, deleteNote } = useNote()
    const router = useRouter()

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
                    className="cursor-pointer w-6 h-6 text-[#44469a]"
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
                className="cursor-pointer w-6 h-6"
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
                            className="border bg-[#f5f5f5] select-none border-gray-300 p-3 shadow-sm rounded-xl h-[120px]"
                            key={index}>
                            <div className="flex justify-between">
                                <div>
                                    <FolderName
                                        folderId={item.folder?.folder_id}
                                    />
                                </div>
                                <div className="flex space-x-0.5">
                                    <FavoriteComponent noteId={item.id} />
                                    <Dropdown
                                        trigger={
                                            <div>
                                                <EllipsisVerticalIcon className="w-6 h-6 cursor-pointer" />
                                            </div>
                                        }
                                        children={
                                            <>
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => {
                                                                    router.push(
                                                                        `/note/${item.id}`,
                                                                    )
                                                                }}
                                                                className={`${
                                                                    active
                                                                        ? 'bg-[#44469a] text-white'
                                                                        : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                                {active ? (
                                                                    <EditActiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <EditInactiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                Edit Note
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                
                                                                className={`${
                                                                    active
                                                                        ? 'bg-[#44469a] text-white'
                                                                        : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                                {active ? (
                                                                    
                                                                    <HeartIcon
                                                                        className="mr-2 h-5 w-5 text-white"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <HeartIcon
                                                                        className="mr-2 h-5 w-5 text-[#44469a]"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                Favorate
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => {
                                                                    setShowLinkModal(
                                                                        true,
                                                                    )
                                                                    setSelectedNote(
                                                                        item,
                                                                    )
                                                                }}
                                                                className={`${
                                                                    active
                                                                        ? 'bg-[#44469a] text-white'
                                                                        : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                                {active ? (
                                                                    <MoveActiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <MoveInactiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                Move Folder
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                            onClick={() => {
                                                                let timeout = setTimeout(deleteNote({id: item.id}), 2000)
                                                                clearTimeout(timeout)
                                                            }}
                                                                className={`${
                                                                    active
                                                                        ? 'bg-[#44469a] text-white'
                                                                        : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                                {active ? (
                                                                    <DeleteActiveIcon
                                                                        className="mr-2 h-5 w-5 text-violet-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <DeleteInactiveIcon
                                                                        className="mr-2 h-5 w-5 text-violet-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                Delete
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </>
                                        }
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
function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="white"
                stroke="#44469a"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#44469a"
                stroke="white"
                strokeWidth="2"
            />
        </svg>
    )
}

function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4H16V10" stroke="#44469a" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#44469a" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#44469a" strokeWidth="2" />
        </svg>
    )
}

function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4H16V10" stroke="white" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="white" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="white" strokeWidth="2" />
        </svg>
    )
}

function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="white"
                stroke="#44469a"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#44469a" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#44469a" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#44469a"
                stroke="white"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="white" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="white" strokeWidth="2" />
        </svg>
    )
}
export default Notes
