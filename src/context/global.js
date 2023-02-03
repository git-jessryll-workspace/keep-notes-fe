import {
    DEFAULT_NOTIF,
    HIDE_NOTIFICATION,
    SET_NAVIGATION_UPDATE,
    SHOW_NOTIFICATION,
} from '@/utils/constant'
import {
    ClipboardIcon,
    FolderIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'
import { createContext, useReducer } from 'react'

const NotificationContext = createContext()
const GlobalContext = createContext()

const initialState = {
    title: '',
    message: '',
    show: false,
    type: 'default',
}

const initialGlobalState = {
    navigation: [
        {
            name: 'All notes',
            href: '/dashboard',
            icon: ClipboardIcon,
            current: true,
        },
        {
            name: 'All Folders',
            href: '/folders',
            icon: FolderIcon,
            current: false,
        },
        {
            name: 'Favorites',
            href: '/favorites',
            icon: HeartIcon,
            current: false,
        },
    ],
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

const globalReducer = (state, action) => {
    const { payload, type } = action

    switch (type) {
        case SET_NAVIGATION_UPDATE:
            return {
                ...state,
                navigation: state.navigation.map(item => {
                    if (item.name === payload) {
                        return {
                            ...item,
                            current: true,
                        }
                    }
                    return {
                        ...item,
                        current: false,
                    }
                }),
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

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialGlobalState)
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export {
    NotificationProvider,
    NotificationContext,
    GlobalContext,
    GlobalProvider,
}
