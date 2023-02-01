import {
    DEFAULT_NOTIF,
    HIDE_NOTIFICATION,
    SHOW_NOTIFICATION,
} from '@/utils/constant'
import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const initialState = {
    title: '',
    message: '',
    show: false,
    type: 'default',
}

const reducer = (state, action) => {
    const { payload } = action
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                title: payload.title ?? 'Notification',
                message: payload.message ?? 'New notification',
                show: true,
                type: payload.type ?? DEFAULT_NOTIF,
            }
        case HIDE_NOTIFICATION:
            return {
                ...state,
                show: false,
                message: '',
                title: '',
                type: DEFAULT_NOTIF,
            }

        default:
            return state
    }
}

const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationProvider, NotificationContext }
