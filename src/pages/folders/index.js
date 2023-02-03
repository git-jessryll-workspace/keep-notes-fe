import FolderList from "@/components/folders/FolderList";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";


const FoldersPage = () => {
    return <AppLayout>
    <Head>
        <title>Keep-notes - Folders</title>
    </Head>

    <div className="p-6">
        <div className="py-3">
            <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                All Folders
            </h1>
        </div>
        <FolderList/>
    </div>
</AppLayout>
}

export default FoldersPage;