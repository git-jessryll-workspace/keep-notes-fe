import AppLayout from '@/components/Layouts/AppLayout'
import Notes from '@/components/notes/Notes'
import Head from 'next/head'

const FavoritePage = () => {
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
                <Notes filteredFavorites={true} />
            </div>
        </AppLayout>
    )
}

export default FavoritePage
