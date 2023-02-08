import {
    ADD_FOLDER,
    SET_FOLDER_LIST,
    SET_NOTE_DATA,
    SET_NOTE_LIST,
    SET_TAG_LIST,
    UPDATE_NOTE_LIST,
    SET_FOLDER_DATA,
    SET_FAVORITE_LIST,
    ADD_FAVORITE,
    DELETE_FAVORITE,
} from '@/utils/constant'
import { createContext, useReducer } from 'react'

const NoteContext = createContext()

const initialState = {
    note: {},
    notes: [],
    tags: [],
    folders: [],
    folder: null,
    favorites: [],
}

const reducer = (state, action) => {
    const { payload } = action

    switch (action.type) {
        case SET_NOTE_DATA:
            return {
                ...state,
                note: payload,
            }
        case SET_NOTE_LIST:
            return {
                ...state,
                notes: payload,
            }
        case UPDATE_NOTE_LIST:
            return {
                ...state,
                notes: state.notes.map(i => {
                    if (i.id === payload.note_id) {
                        return {
                            ...i,
                            folder: payload,
                        }
                    }
                    return i
                }),
            }
        case SET_TAG_LIST:
            return {
                ...state,
                tags: payload,
            }
        case SET_FOLDER_LIST:
            return {
                ...state,
                folders: payload,
            }
        case ADD_FOLDER:
            return {
                ...state,
                folders: [payload, ...state.folders],
            }
        case SET_FOLDER_DATA:
            return {
                ...state,
                folder: payload,
            }
        case SET_FAVORITE_LIST:
            return {
                ...state,
                favorites: payload,
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, payload],
            }
        case DELETE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(i => i.id !== payload),
            }
        default:
            return state
    }
}

const NoteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {children}
        </NoteContext.Provider>
    )
}

export { NoteProvider, NoteContext }
