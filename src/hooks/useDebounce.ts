/**
 * source: https://usehooks.com/useDebounce/
 * date: 15.03.2021
 */

import { useEffect, useState } from "react";

/**
 * 
 * custom hook for using debounce effect in handling form input values
 * 
 * @param value value of input field
 * @param delay Timeout delay in ms
 * @returns the input value after ending typing for delay in ms
 */
const useDebounce = (value: string, delay: number):string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler =  setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])


    return debouncedValue;
}

export default useDebounce;