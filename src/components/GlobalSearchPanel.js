import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const GlobalSearchPanel = () => {
    return (
        <div className="mt-4 flex lg:w-[30%] rounded-full border items-center mx-6 border-gray-300 bg-[#f5f5f5]">
            <MagnifyingGlassIcon className="w-6 h-6 ml-2 text-gray-400" />
            <input className="w-full p-1 font-medium border-transparent focus:outline-none bg-transparent" placeholder="Search..."/>
        </div>
    )
}

export default GlobalSearchPanel
