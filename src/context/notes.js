import { SET_NOTE_DATA, SET_NOTE_LIST, SET_TAG_LIST } from '@/utils/constant'
import { createContext, useReducer } from 'react'

const NoteContext = createContext()

const initialState = {
    note: {},
    notes: [],
    tags: [],
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
        case SET_TAG_LIST:
            return {
                ...state,
                tags: payload,
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
