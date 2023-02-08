import { NotificationContext } from '@/context/global'
import { NoteContext } from '@/context/notes'
import axios from '@/lib/axios'
import { SET_NOTE_DATA, SHOW_NOTIFICATION } from '@/utils/constant'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const useNote = () => {
    const { dispatch } = useContext(NotificationContext)
    const { dispatch: dispatchNote } = useContext(NoteContext)
    const router = useRouter()

    const createNote = async ({...props }) => {
        

        await axios.post('/api/notes', props).then(res => {
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: {
            //         title: 'Successfully created note',
            //         message: '',
            //     },
            // })
            router.push(`/note/${res.data.id}`)
        })
    }

    const updateNote = async ({ setErrors, ...props }) => {
        setErrors([])
        await axios.patch(`/api/notes/${router.query.id}`, props).then(res => {
            dispatchNote({
                type: SET_NOTE_DATA,
                payload: res.data,
            })
        })
    }

    const addNoteTag = async ({ ...props }) => {
        return await axios.post('/api/tags', props)
    }

    const removeNoteTag = async ({...props}) => {
        return await axios.delete(`/api/tags/${props.id}`)
    }

    const createFolder = async ({...props}) => {
        return await axios.post('/api/folders', props);
    }

    const updateFolder = async ({...props}) => {
        return await axios.put(`/api/folders/${props.id}`, props);
    }

    const deleteFolder = async ({...props}) => {
        return await axios.delete(`/api/folders/${props.id}`);
    }

    const addFolderNote = async ({...props}) => {
        return await axios.post('/api/folder-notes', props);
    }

    const addFavorite = async ({...props}) => {
        return await axios.post('/api/favorites', props);
    }

    const deleteFolderNote = async ({...props}) => {
        return await axios.delete(`/api/folder-notes/${props.id}`);
    }

    const deleteFavorite = async ({...props}) => {
        return await axios.delete(`/api/favorites/${props.id}`)
    }

    return {
        createNote,
        updateNote,
        addNoteTag,
        removeNoteTag,
        createFolder,
        updateFolder,
        deleteFolder,
        addFolderNote,
        deleteFolder,
        addFavorite,
        deleteFavorite
    }
}
