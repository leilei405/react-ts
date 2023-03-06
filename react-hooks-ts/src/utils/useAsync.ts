// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback, useReducer } from 'react'
import { useMountedRef } from './useMountedRef';
interface State<D> {
    error: Error | null; // 异常状态
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';  // 异步操作没有发生  已经发生  出现错误  成功状态
}

// 默认的state
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();

    return useCallback((...args: T[]) => (
        mountedRef.current ? dispatch(...args) : void 0
    ), [dispatch, mountedRef])
}

// 
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    // 
    const config = {...defaultConfig, initialConfig};
    const [state, dispatch] =  useReducer(
        (
            state: State<D>, 
            action: Partial<State<D>>
        ) => (
            { 
                ...state, 
                ...action
            }
        ),{
        ...defaultInitialState,  // 默认
        ...initialState,  // 用户传入
    })

    // const  mountedRef  = useMountedRef();
    const safeDispatch = useSafeDispatch(dispatch);

    // useState 直接传入函数的含义是: 惰性初始化;  所以,要用useState保存函数  不能直接传入函数
    const [retry, setRetry] = useState(() => () => {
    })  
    
    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    // 用来触发异步请求
    // useCallback和useMemo  一样的  只有当依赖列表里的数据变化的时候才会执行run重新定义
    const run = useCallback((
        promise: Promise<D>, 
        runConfig?: {retry: () => Promise<D> }
    ) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 Promise 类型数据")
        }
        setRetry(() => () => {
            if (runConfig && runConfig.retry) {
                return runConfig.retry()
            }
            // if (runConfig?.retry) {
            //     run(runConfig?.retry(), runConfig)
            // }
        })
        // setState(prevState => ({...prevState, stat: 'loading'}))
        safeDispatch({ stat: 'loading' })
        return promise.then(data => {
                // if (mountedRef.current)
                setData(data)
                return data
            })
            // 登录时候 账号密码不正确上方提示挂掉
            // 原因是因为catch会消化异常, 如果不主动抛出, 外面是接收不到异常的
            .catch((error) => {
                setError(error)
                if (config.throwOnError) {
                    return Promise.reject(error)
                }
                return error
        });
    }, [config.throwOnError, safeDispatch, setData, setError])
// }, [config.throwOnError, mountedRef, setData, setError]).
    
    // 记住上一次的状态
    // const retry = () => {
    //     run(oldPromise)
    // }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry 被调用时重新跑一遍run, 让state刷新一遍
        retry,
        ...state
    }
}