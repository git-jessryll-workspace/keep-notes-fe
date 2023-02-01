import { NoteContext } from '@/context/notes'
import { useNote } from '@/hooks/note'
import axios from '@/lib/axios'
import { CancelToken } from 'axios'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'

const SelectTags = ({ type, primaryId }) => {
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [value, setValue] = useState('')
    const { addNoteTag, removeNoteTag } = useNote()
    const { state } = useContext(NoteContext)

    function filterTags() {
        let search = value
        if (search === '') return []

        return tags
            .filter(val => !selectedTags.includes(val))
            .filter(item =>
                item.label.toLowerCase().includes(search.toLowerCase()),
            )
    }

    useEffect(() => {
        setTags(state.tags)
    }, [state.tags])

    useEffect(() => {
        let source = CancelToken.source()
        axios
            .get(`/api/tags?tag_type=${type}&tag_id=${primaryId}`)
            .then(res =>
                setSelectedTags(selectedTags => [...selectedTags, ...res.data]),
            )
        return () => {
            source.cancel()
        }
    }, [type, primaryId])

    return (
        <div className="w-auto flex items-center">
            <div className="flex space-x-2 items-center w-auto pr-2">
                {selectedTags.map((item, index) => (
                    <div
                        key={index}
                        className="py-1 hover:bg-gray-100 pl-2 pr-0.5 rounded-md font-bold text-sm border border-gray-300 flex items-center shadow-md w-auto whitespace-nowrap">
                        {item.label}{' '}
                        <XMarkIcon
                            className="h-4 w-4 ml-2 cursor-pointer"
                            onClick={async () => {
                                setSelectedTags(selectedTags =>
                                    selectedTags.filter(
                                        i => i.label !== item.label,
                                    ),
                                )
                                let timeout = setTimeout(await removeNoteTag({id: item.id}), 2000);
                                clearTimeout(timeout);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="relative">
                <input
                    className="w-full focus:outline-none border-transparent border text-lg font-bold"
                    placeholder="Tags...."
                    onKeyDown={async event => {
                        if (value === '') return

                        if (event.key === 'Enter') {
                            const findItem = tags.filter(i => i.label === value)
                            if (findItem.length === 0) {
                                setSelectedTags(selectedTags => [
                                    ...selectedTags,
                                    { label: value },
                                ])
                                setTags(tags => [...tags, { label: value }])
                                setValue('')
                                const timeout = setTimeout(
                                    await addNoteTag({
                                        tag_id: primaryId,
                                        type: type,
                                        label: value,
                                    }),
                                    2000,
                                )
                                clearTimeout(timeout)
                                return
                            }
                            setSelectedTags(selectedTags => [
                                ...selectedTags,
                                findItem[0],
                            ])
                            setValue('')
                            return
                        }
                        return
                }}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
                {value !== '' && filterTags().length > 0 && (
                    <div className="z-10 absolute bg-white shadow-md w-[100%] border divide-y">
                        {filterTags().map((item, index) => (
                            <div
                                key={index}
                                onClick={async () => {
                                    setSelectedTags(selectedTags => [
                                        ...selectedTags,
                                        {
                                            ...item,
                                        },
                                    ])
                                    setValue('')
                                    const timeout = setTimeout(
                                        await addNoteTag({
                                            tag_id: primaryId,
                                            type: type,
                                            label: item.label,
                                        }),
                                        2000,
                                    )
                                    clearTimeout(timeout)
                                }}
                                className="text-[14px] font-medium cursor-pointer p-2">
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectTags
