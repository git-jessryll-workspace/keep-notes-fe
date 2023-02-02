import DefaultNotification from '@/components/DefaultNotification'
import { NotificationProvider } from '@/context/global'
import { NoteProvider } from '@/context/notes'
import 'tailwindcss/tailwind.css'
import './../components/notes/text-editor.styles.css'
import './../assets/global.css'
const App = ({ Component, pageProps }) => {
    return (
        <NotificationProvider>
            <NoteProvider>
                <Component {...pageProps} />
            </NoteProvider>
            <DefaultNotification />
        </NotificationProvider>
    )
}

export default App
