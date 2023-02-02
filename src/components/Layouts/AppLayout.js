import { useAuth } from '@/hooks/auth'
import { useState, Fragment, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    HomeIcon,
    XMarkIcon,
    PlusIcon,
    FolderPlusIcon,
    ClipboardDocumentListIcon,
    DocumentPlusIcon,
} from '@heroicons/react/24/outline'
import axios from '@/lib/axios'
import { NoteContext } from '@/context/notes'
import { SET_TAG_LIST } from '@/utils/constant'
import { useNote } from '@/hooks/note'
import { CircleStackIcon, FolderOpenIcon } from '@heroicons/react/20/solid'
import CreateFolderModal from '../folders/CreateFolderModal'
import FolderList from '../folders/FolderList'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const { dispatch } = useContext(NoteContext)
    const { createNote } = useNote()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)

    useEffect(() => {
        axios
            .get('/api/tags')
            .then(res => dispatch({ type: SET_TAG_LIST, payload: res.data }))
    }, [])
    if (!user) return

    return (
        <div>
            <CreateFolderModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
            />
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
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }>
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        {/* <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      /> */}
                                        <h2 className="text-2xl font-bold">
                                            Keep-notes
                                        </h2>
                                    </div>
                                    <nav className="mt-5 space-y-1 px-2">
                                        {navigation.map(item => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                                )}>
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? 'text-gray-500'
                                                            : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-4 flex-shrink-0 h-6 w-6',
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                    <a
                                        href="#"
                                        className="group block flex-shrink-0">
                                        <div className="flex items-center">
                                            <div></div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                                                    Tom Cook
                                                </p>
                                                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                                                    View profile
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
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
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}
                            <h2 className="text-2xl font-bold">Keep-notes</h2>
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                            {navigation.map(item => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                    )}>
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? 'text-gray-500'
                                                : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6',
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                            <FolderList />
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <a
                            href="#"
                            className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                {/* <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div> */}
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                        View profile
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col md:pl-64">
                <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <main className="flex-1">{children}</main>
                <div>
                    {showMenu && (
                        <div className="w-[30%]">
                            <button
                                className={`text-gray-500 fixed z-90 bottom-[160px] right-8 duration-300 drop-shadow-lg hover:font-bold hover:drop-shadow-2xl cursor-pointer animate-fade-in flex items-center`}
                                onClick={() => {
                                    setShowCreateModal(true)
                                    setShowMenu(false)
                                }}>
                                Create new folder
                                <FolderPlusIcon className="h-12 w-12 p-2.5 ml-4 border border-gray-300 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white" />
                            </button>
                            <button
                                onClick={async () => {
                                    await createNote({
                                        title: 'New note',
                                        body: JSON.stringify({
                                            ops: [
                                                { insert: 'Write your note' },
                                            ],
                                        }),
                                    })
                                }}
                                className={`text-gray-500 fixed z-90 animate-fade-in bottom-[100px] right-8 duration-300 drop-shadow-lg hover:font-bold hover:drop-shadow-2xl cursor-pointer flex items-center`}>
                                Create new note{' '}
                                <DocumentPlusIcon className="h-12 w-12 p-2.5 ml-4 bg-blue-600 hover:bg-blue-700 rounded-full border border-gray-200 text-white" />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className={`fixed z-90 bottom-10 right-8 bg-blue-600 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl duration-300 ${
                            showMenu && 'rotate-45'
                        }`}>
                        <PlusIcon className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppLayout
