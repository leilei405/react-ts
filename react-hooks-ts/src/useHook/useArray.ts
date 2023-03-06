import { useState } from "react"

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            // 浅拷贝一层
            const copy = [...value];
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}