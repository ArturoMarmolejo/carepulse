export { cn } from "cn"

// Deep-copies a value through JSON, turning it into plain data that can be
// passed from a server action to a client component
export const parseStringify = <T>(value: T): T => JSON.parse(JSON.stringify(value))

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// FORMAT DATE TIME
export const formatDateTime = (
    dateString: Date | string,
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
    const date = new Date(dateString)
    const format = (options: Intl.DateTimeFormatOptions) =>
        date.toLocaleString("en-US", { ...options, timeZone })

    return {
        // e.g. "Oct 25, 2023, 8:30 AM"
        dateTime: format({ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }),
        // e.g. "Wed, 10/25/2023"
        dateDay: format({ weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" }),
        // e.g. "Oct 25, 2023"
        dateOnly: format({ month: "short", day: "numeric", year: "numeric" }),
        // e.g. "8:30 AM"
        timeOnly: format({ hour: "numeric", minute: "numeric", hour12: true }),
    }
}

export function encryptKey(passkey: string) {
    return btoa(passkey)
}

export function decryptKey(passkey: string) {
    return atob(passkey)
}