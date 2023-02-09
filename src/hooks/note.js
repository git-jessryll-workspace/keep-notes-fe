import { NotificationContext } from '@/context/global'
import { NoteContext } from '@/context/notes'
import axios from '@/lib/axios'
import { DELETE_NOTE_LIST, SET_NOTE_DATA, SHOW_NOTIFICATION } from '@/utils/constant'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const useNote = () => {
    const { dispatch } = useContext(NoteContext)
    const router = useRouter()

    const createNote = async ({...props }) => {
        await axios.post('/api/notes', props).then(res => {
            router.push(`/note/${res.data.id}`)
        })
    }

    const updateNote = async ({ ...props }) => {
        return await axios.patch(`/api/notes/${router.query.id}`, props).then(res => {
            dispatch({
                type: SET_NOTE_DATA,
                payload: res.data,
            })
        })
    }

    const deleteNote = async ({...props}) => {
        console.log(props)
        return await axios.delete(`/api/notes/${props.id}`).then(() => dispatch({
            type: DELETE_NOTE_LIST,
            payload: props.id
        }))
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
        deleteNote,
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
