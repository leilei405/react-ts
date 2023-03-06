import React, {useEffect, useState} from "react";

// 防抖 
export const useDebounce = (value: any, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // 每次在value变化以后设置一个定时器
        const timeOut = setTimeout(() => setDebouncedValue(value), delay)
        // return 一个回调函数会在上一个useEffect 执行完之后再运行  
        // 相当于类组件中的销毁钩子
        return () => {
            clearTimeout(timeOut)
        }
    },[value, delay])
    return debouncedValue;
}