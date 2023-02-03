import AppLayout from '@/components/Layouts/AppLayout'
import TextEditor from '@/components/notes/TextEditor'
import { NoteContext } from '@/context/notes'
import axios from '@/lib/axios'
import { SET_NOTE_DATA } from '@/utils/constant'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'

const EditNote = () => {
    const router = useRouter()
    const { dispatch } = useContext(NoteContext)
    const { data: note, error } = useSWR(
        `/api/notes/${router.query.id}`,
        () =>
            router.query.id &&
            axios
                .get(`/api/notes/${router.query.id}`)
                .then(res => res.data)
                .catch(error => {
                    if (errorNote.response.status !== 409) throw error

                    router.push('/dashboard')
                }),
    )
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
