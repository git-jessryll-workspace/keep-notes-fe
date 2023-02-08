import AppLayout from '@/components/Layouts/AppLayout'
import TextEditor from '@/components/notes/TextEditor'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

const EditNote = () => {
    const router = useRouter()
    const { data: note, error } = useSWR(
        `/api/notes/${router.query.id}`,
        () =>
            router.query.id &&
            axios
                .get(`/api/notes/${router.query.id}`)
                .then(res => res.data)
                .catch(error => {

                    if (error.response.status === 401) return router.push('/dashboard')
                    if (error.response.status !== 409) throw error

                    router.push('/dashboard')
                }),
    )


    useEffect(() => {
        document.documentElement.style.setProperty('--bodyColor', 'white');
        return () => {
            document.documentElement.style.setProperty('--bodyColor', '#e9edf4')
        }
    }, []);
    if (!note) return <div>Fetching data...</div>
    return (
        <AppLayout disableSearch={true}>
            <Head>
                <title>Keep-notes - {note.title}</title>
            </Head>
            <div className="bg-white">
            <TextEditor note={note}/>
            </div>
        </AppLayout>
    )
}

export default EditNote
