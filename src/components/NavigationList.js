import { GlobalContext } from '@/context/global'
import { classNames } from '@/utils'
import { SET_NAVIGATION_UPDATE } from '@/utils/constant'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const NavigationList = () => {
    const router = useRouter()
    const {
        state,
        dispatch,
    } = useContext(GlobalContext)
    useEffect(() => {
        let currentActiveNavigation = state.navigation.filter(item => item.current)[0];
        
        if (router.pathname !== currentActiveNavigation.href) {
            let getnavigation = state.navigation.filter(item => item.href === router.pathname);
            if (getnavigation.length === 1) {
                
                dispatch({
                    type: SET_NAVIGATION_UPDATE,
                    payload: getnavigation[0].name,
                })
            } 
        }
    }, []);
    return (
        <nav className="mt-5 space-y-1 px-2">
            {state.navigation.map(item => (
                <span
                    key={item.name}
                    onClick={() => {
                        dispatch({
                            type: SET_NAVIGATION_UPDATE,
                            payload: item.name,
                        })
                        router.push(item.href)
                    }}
                    className={classNames(
                        item.current
                            ? 'bg-[#44469a] text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-bold rounded-md cursor-pointer',
                    )}>
                    <item.icon
                        className={classNames(
                            item.current
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                    />
                    {item.name}
                </span>
            ))}
        </nav>
    )
}

export default NavigationList
