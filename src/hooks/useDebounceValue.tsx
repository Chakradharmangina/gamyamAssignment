import { useEffect, useRef, useState } from "react"

export const useDebounceValue = (value : string, delay = 500 ) => {
    const [debouncedValue, setDebounceValue] = useState<string>(value);
    const timRef = useRef<number | null>(null);

    useEffect(() => {
        if (timRef.current) clearTimeout(timRef.current);
        timRef.current = setTimeout(() => {
            setDebounceValue(value);
        }, delay)
    }, [value, delay])
    return debouncedValue
}