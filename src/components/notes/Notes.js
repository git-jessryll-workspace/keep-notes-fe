import { NoteContext } from '@/context/notes'
import { useNote } from '@/hooks/note'
import axios from '@/lib/axios'
import { dateTimeFormat } from '@/utils'
import {
    Cog6ToothIcon,
    EllipsisHorizontalIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useSWR from 'swr'

const Notes = () => {
    const router = useRouter()
    const { data: notes, error } = useSWR('/api/notes', () =>
        axios
            .get('/api/notes')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/login')
            }),
    )
    return (
        <div className="space-y-3">
            <div>
                <h1 className="font-bold text-2xl text-gray-600 flex items-center">
                    Notes
                </h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {notes &&
                    notes.map((item, index) => (
                        <div
                            className="border border-gray-300 p-3 cursor-pointer shadow-sm rounded-md flex justify-between"
                            key={index}>
                            <div>
                                <a
                                    className="font-bold text-sm cursor-pointer hover:border-b"
                                    onClick={() =>
                                        router.push(`/note/${item.id}`)
                                    }>
                                    {item.title}
                                </a>
                                <p className="text-xs -mt-0.5">
                                    {dateTimeFormat(item.updated_at)}
                                </p>
                                {item.tags && (
                                    <div className="flex space-x-1 pt-2">
                                        {item.tags.map((i, idx) => (
                                            <div
                                                key={idx}
                                                className="text-xs font-bold bg-gray-300 px-1.5 rounded-md">
                                                {i.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <EllipsisHorizontalIcon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Notes
