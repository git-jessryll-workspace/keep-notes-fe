export const dateTimeFormat = date => {
    try {
        const datetime = new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        return datetime
    } catch (err) {
        console.error(err)
        return date
    }
}
export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}