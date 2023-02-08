import { useContext, useEffect, useState } from 'react'
import { CancelToken } from 'axios'
import axios from '@/lib/axios'
import { NoteContext } from '@/context/notes'
import {
    SET_FOLDER_LIST,
    SET_FOLDER_DATA,
    UPDATE_NOTE_LIST,
    SET_NAVIGATION_UPDATE,
} from '@/utils/constant'
import { FolderIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/global'

const FolderList = () => {
    const { state, dispatch } = useContext(NoteContext)
    const { dispatch: globalDispatch } = useContext(GlobalContext)
    const router = useRouter()
    
    return (
        <>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
                {state.folders.map((item, index) => (
                    <div
                        key={index}
                        className={`font-bold ${item?.folder_notes?.length > 0 ?  "bg-[#44469a] text-white" : "bg-[#f5f5f5] text-gray-500 hover:text-gray-600 hover:bg-gray-100"} cursor-pointer p-1.5 rounded-lg shadow-md`}
                        onClick={() => {
                            dispatch({
                                type: SET_FOLDER_DATA,
                                payload: item,
                            })
                            globalDispatch({
                                type: SET_NAVIGATION_UPDATE,
                                payload: 'All notes',
                            })
                            router.push('/dashboard')
                        }}>
                        <div className="flex justify-center">
                            <FolderIcon className="h-14 w-14" />
                        </div>
                        <div className="flex justify-center">{item.name}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FolderList
