import { useAuth } from "@/hooks/auth"

const ProfileSidebar = () => {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {user.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                        </p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default ProfileSidebar
