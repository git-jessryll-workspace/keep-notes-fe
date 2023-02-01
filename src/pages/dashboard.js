import AppLayout from '@/components/Layouts/AppLayout'
import Notes from '@/components/notes/Notes';
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    return (
        <AppLayout>
            <Head>
                <title>Keep-notes - Dashboard</title>
            </Head>

            <div className="p-6">
                
                <Notes/>
            </div>
        </AppLayout>
    )
}

export default Dashboard
