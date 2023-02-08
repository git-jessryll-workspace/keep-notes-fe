import AppLayout from '@/components/Layouts/AppLayout'
import Notes from '@/components/notes/Notes'
import Head from 'next/head'
import { useContext } from 'react'
import { NoteContext } from '@/context/notes'
import { HeartIcon } from '@heroicons/react/24/outline'

const FavoritePage = () => {
    const { state } = useContext(NoteContext)
    return (
        <AppLayout>
            <Head>
                <title>Keep-notes - Favorites</title>
            </Head>

            <div className="p-6">
                <div className="py-3">
                    <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                        All Favorites
                    </h1>
                </div>
                {state.favorites.length === 0 ? (
                    <div className="flex justify-center items-center h-[320px]">
                        <div className="space-y-2">
                            <div className="flex justify-center">
                            <HeartIcon className="h-12 w-12" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl text-center leading-3 font-bold">
                                    No favorites yet!
                                </h2>
                                <p className="w-full text-xs flex space-x-3 items-center">
                                    Keep track of the note listings you're
                                    interested in clicking the{' '}
                                    <HeartIcon className="h-3 w-3 mx-1" /> icon.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Notes filteredFavorites={true} />
                )}
            </div>
        </AppLayout>
    )
}

export default FavoritePage
