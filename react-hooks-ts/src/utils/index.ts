// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from "react";

export const isFalsy = (value: any) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里, 改变传入的对象本身是不好的
export const cleanObject = (obj: {[key: string] : unknown}) => {
    const result = {...obj}
    // 遍历对象的键
    Object.keys(result).forEach(key => {
        const value = result[key];
        // if value为0是不能删的
        if(isVoid(value)) {
            delete result[key];
        }
    })
    return result;
}

// 页面第一次加载时候 hook
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // TODO 依赖项里面加上callback会造成无限循环 这个和useCallback以及useMemo有关系
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

//  防抖hook
export const useDebounce = <T>(value: T, delay?: number) => {
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


export const resetRoute = () => window.location.href = window.location.origin
























// js版本的防抖
// export const debounce = (func: any, delay?: number) => {
//     let timeout;
//     return (...param) => {
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(function() {
//             func(...param);
//         }, delay);
//     }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()    