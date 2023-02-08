import { useAuth } from '@/hooks/auth'
import { useState, Fragment, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CancelToken } from 'axios'
import axios from '@/lib/axios'
import { NoteContext } from '@/context/notes'
import { SET_FAVORITE_LIST, SET_FOLDER_LIST, SET_TAG_LIST } from '@/utils/constant'
import ToggleSidebarButton from '../ToggleSidebarButton'
import CloseSidebarButton from '../CloseSidebarButton'
import ProfileSidebar from '../ProfileSidebar'
import NavigationList from '../NavigationList'
import GlobalSearchPanel from '../GlobalSearchPanel'
import FabAction from '../FabAction'

const AppLayout = ({ children, disableSearch = false }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const { dispatch } = useContext(NoteContext)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        let source = CancelToken.source()
        axios
            .get('/api/tags')
            .then(res => dispatch({ type: SET_TAG_LIST, payload: res.data }))

        return () => source.cancel()
    }, [])
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
    }, []);

    useEffect(() => {
        let source = CancelToken.source();
        axios.get('/api/favorites').then(res => {
            dispatch({
                type: SET_FAVORITE_LIST,
                payload: res.data
            })
        })
        return () => {
            source.cancel();
        }
    }, []);
    
    if (!user) return

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 md:hidden"
                    onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#f5f5f5]">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <CloseSidebarButton
                                            setSidebarOpen={setSidebarOpen}
                                        />
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <NavigationList />
                                </div>
                                <ProfileSidebar />
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-[#f5f5f5]">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <NavigationList />
                    </div>
                    <ProfileSidebar />
                </div>
            </div>
            <div className="flex flex-1 flex-col md:pl-64">
                <ToggleSidebarButton setSidebarOpen={setSidebarOpen} />
                {!disableSearch && <GlobalSearchPanel />}
                <main className="flex-1">{children}</main>
                <FabAction />
            </div>
        </div>
    )
}

export default AppLayout
