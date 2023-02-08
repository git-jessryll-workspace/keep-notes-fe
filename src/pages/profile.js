import AppLayout from '@/components/Layouts/AppLayout'
import { useAuth } from '@/hooks/auth';
import Head from 'next/head';
const ProfilePage = () => {
    const { user, logout } = useAuth()
    if (!user) return;

    return <AppLayout>
    <Head>
        <title>Keep-notes - Profile</title>
    </Head>

    <div className="p-6">
        <div className="flex justify-start h-screen pt-4">
        <div className="space-y-2 w-full lg:w-1/4">
            <h1 className="text-2xl leading-3 text-gray-600 font-bold">Profile</h1>
            <div className="space-y-2">
                <label className="text-gray-500">Name</label>
                <div>
                    <input className="w-full border border-gray-300 p-2 rounded-lg text-gray-600" value={user?.name} placeholder="Fullname"/>
                </div>
            </div>
            <div>
                <label className="text-gray-500">Email</label>
                <div>
                    <input disabled={true} className="w-full border border-gray-300 p-2 rounded-lg text-gray-600" value={user?.email}/>
                </div>
            </div>
        <div className="pt-4">
            <button onClick={logout} className="bg-[#44469a] text-white font-medium px-6 py-1 rounded-lg">Sign out</button>
        </div>
        </div>
    </div>
    </div>
</AppLayout>
}

export default ProfilePage;