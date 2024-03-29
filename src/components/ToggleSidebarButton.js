import { Bars3Icon } from "@heroicons/react/24/outline"

const ToggleSidebarButton = ({ setSidebarOpen }) => {
    return (
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-inset"
                onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
    )
}

export default ToggleSidebarButton
