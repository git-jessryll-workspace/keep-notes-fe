import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import 'quill/dist/quill.snow.css'
import { useNote } from '@/hooks/note'
import { NoteContext } from '@/context/notes'
import { dateTimeFormat } from '@/utils'
import SelectTags from '../SelectTags'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const SAVE_INTERVAL_MS = 2000

export default function TextEditor({ note }) {
    const router = useRouter()
    const { state } = useContext(NoteContext)
    const [quill, setQuill] = useState()
    const [errors, setErrors] = useState([])
    const [debounceTimeout, setDebounceTimeout] = useState()
    const [updatedAt, setUpdatedAt] = useState()

    const titleRef = useRef()

    const { updateNote } = useNote()

    const wrapperRef = useCallback(async wrapper => {
        if (wrapper === null) return
        wrapper.innerHTML = ''
        const editor = window.document.createElement('div')
        wrapper.append(editor)
        const Quill = (await import('quill')).default
        const q = new Quill(editor, { theme: 'snow' })
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])

    useEffect(() => {
        if (!note || !quill) return

        if (titleRef) {
            titleRef.current.value = note.title
        }
        quill.setContents(JSON.parse(note.body))
        quill.enable()
        setUpdatedAt(dateTimeFormat(note.updated_at))
        console.log(quill.getContents());
    }, [note, quill])

    useEffect(() => {
        if (!note || !quill) return
        clearTimeout(debounceTimeout)
        const handler = (delta, oldData, source) => {
            if (source !== 'user') return
            setDebounceTimeout(() =>
                setTimeout(async () => {
                    await updateNote({
                        setErrors,
                        title: titleRef.current.value,
                        body: JSON.stringify(quill.getContents()),
                    })
                }, SAVE_INTERVAL_MS),
            )
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [note, quill])

    useEffect(() => {
        if (state.note.updated_at) {
            setUpdatedAt(dateTimeFormat(state.note.updated_at))
        }
    }, [state.note])

    const handleChangeTitle = event => {
        clearTimeout(debounceTimeout)
        setDebounceTimeout(() =>
            setTimeout(() => {
                updateNote({
                    setErrors,
                    title: event.target.value,
                    body: JSON.stringify(quill.getContents()),
                })
            }, SAVE_INTERVAL_MS),
        )
    }

    return (
        <div className="pb-6 pt-2">
            <XCircleIcon
                className="w-10 lg:w-14 fixed -right-6 top-6 z-10 h-10 lg:h-14 cursor-pointer text-gray-400 hover:text-gray-500 -mt-4 mr-10"
                onClick={() => {
                    router.push('/dashboard')
                }}
            />
            <div className="px-4 pt-4">
                <div>
                    <input
                        ref={titleRef}
                        className="w-full focus:border-none border-none focus:ring-0 focus:outline-none font-bold text-2xl mb-2"
                        placeholder="Insert title here..."
                        onChange={handleChangeTitle}
                    />
                    <div className="text-[12px] font-bold text-gray-500 -mt-2 pb-1 italic">
                        Last update {updatedAt}
                    </div>
                    <div className="flex flex-start">
                        <SelectTags type="NOTE" primaryId={note?.id} />
                    </div>
                </div>
            </div>
            <div className="text-editor-container" ref={wrapperRef} />
        </div>
    )
}
