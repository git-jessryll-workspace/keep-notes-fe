import { useContext, useEffect, useState } from 'react'
import { CancelToken } from 'axios'
import axios from '@/lib/axios'
import { NoteContext } from '@/context/notes'
import { SET_FOLDER_LIST } from '@/utils/constant'

const FolderList = () => {
    const { state, dispatch } = useContext(NoteContext)
    useEffect(() => {
        let source = CancelToken.source()

        axios.get('/api/folders').then(res =>
            dispatch({
                type: SET_FOLDER_LIST,
                payload: res.data,
            }),
        )
        return () => {
            source.cancel()
        }
    }, [])
    return (
        <>
            <div className="ml-3.5 pt-6 flex items-center font-bold text-gray-700 pb-2.5">
                <div className="rounded-full p-1.5 ml-0.5 bg-blue-500 mr-3"></div>
                Folders
            </div>
            <div className='ml-[42px] space-y-0.5 text-sm'>
                {
                    state.folders.map((item, index) => <div key={index} className="font-bold text-gray-500 hover:text-gray-600 cursor-pointer">{item.name}</div>)
                }
            </div>
        </>
    )
}

export default FolderList
