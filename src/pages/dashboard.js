import AppLayout from '@/components/Layouts/AppLayout'
import Notes from '@/components/notes/Notes'
import { NoteContext } from '@/context/notes'
import { SET_FOLDER_DATA } from '@/utils/constant'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import { useContext } from 'react'

const Dashboard = () => {
    const { state, dispatch } = useContext(NoteContext)
    return (
        <AppLayout>
            <Head>
                <title>Keep-notes - Dashboard</title>
            </Head>

            <div className="p-6">
                <div className="py-3">
                    {state.folder ? (
                        <div
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => {
                                dispatch({
                                    type: SET_FOLDER_DATA,
                                    payload: null,
                                })
                            }}>
                            <div>
                                <h3 className="leading-3 text-xl font-bold text-gray-600">
                                    Folder:
                                </h3>
                            </div>
                            <div className="flex p-1.5 rounded-lg bg-[#f5f5f5] space-x-3 items-center border border-gray-300 w-auto">
                                <h1 className="font-bold text-xl text-gray-600 flex items-center">
                                    {state.folder.name}
                                </h1>
                                <XMarkIcon className="h-6 w-6 p-0.5" />
                            </div>
                        </div>
                    ) : (
                        <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                            All Notes
                        </h1>
                    )}
                </div>
                <Notes />
            </div>
        </AppLayout>
    )
}

export default Dashboard
