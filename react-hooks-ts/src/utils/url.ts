// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils';
// 返回页面url中  指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [ searchParams ] = useSearchParams();
    const setSearchParams = useSetUrlSearchParams();
    const [ stateKeys ] = useState(keys);
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || ''}
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, {} as { [key in K]: string }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
        // iterator  遍历器 凡是上面部署了iterator得数据 都可以用for( v  of  a ) 来遍历
        // fromEntries  专门用来处理 iterator   将他转换成一个对象来通过 for of 来遍历
        // const obj =  cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
        // return setSearchParams(obj);
        return setSearchParams(params);
    }
    // setSearchParams
    ] as const
}


export const useSetUrlSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const obj =  cleanObject({ 
            ...Object.fromEntries(searchParams), 
            ...params 
        }) as URLSearchParamsInit;
        return setSearchParams(obj);
    }
}