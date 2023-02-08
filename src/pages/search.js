import AppLayout from "@/components/Layouts/AppLayout";
import Notes from "@/components/notes/Notes";
import Head from "next/head";


const SearchPage = () => {
    return <AppLayout>
    <Head>
        <title>Keep-notes - Search Result</title>
    </Head>

    <div className="p-6">
        <div className="py-3">
            <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                Search Result
            </h1>
        </div>
        <Notes filteredFavorites={true} />
    </div>
</AppLayout>
}

export default SearchPage;