// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useCallback } from 'react';
// import { cleanObject } from 'utils';
// import { useAsync } from 'utils/useAsync';
import { Project } from 'types/project'
import { useHttp } from 'utils/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { useProjectSearchParams } from 'screens/project-list/util'
import { QueryKey } from 'react-query'
import { useAddConfig, useDeleteConfig, useEditConfig } from 'utils/useOptimisticOption'
export const  useProjects = (params?: Partial<Project>) => {
    const client = useHttp();
    // const { run, ...result } = useAsync<Project[]>();
    // const fetchProjects = useCallback(
    //     () => client('projects', { data: cleanObject(params || {}) 
    // }), [client, params])
    // useEffect(() => {
    //     run(fetchProjects(), {
    //         retry: fetchProjects
    //     })
    //     // 使用useHttp
    //     // client('projects', {data: cleanObject(params || {})})
    // },[params, run, fetchProjects]);
    // return result;
    // useQuery 第一个参数不仅可以是字符串  也可以是tuple  
    // params  发生变化的时候他会触发
    return useQuery<Project[]>(['projects', params], () =>  client('projects', {data: params}))
}

// 编辑
export const useEditProject = (queryKey: QueryKey) => {
    // const { run, ...asyncResult } = useAsync();
    // const edit = (params: Partial<Project>) => {
        //  return run(client(`projects/${params.id}`, {
        //      data: params,
        //      method: 'PATCH',
        //  }))
        // }
        // return {
        //     edit,
        //     asyncResult
        // }
        // const [searchParams] = useProjectSearchParams()
        // const queryClient = useQueryClient();
        // const queryKey = ['projects', searchParams];
        const client = useHttp();
        return useMutation(
        (params: Partial<Project>) => 
            client(`projects/${params.id}`, {
                data: params,
                method: 'PATCH',
            }), 
            useEditConfig(queryKey)
        //  第二个参数 请求发送完成之后进行刷新  之前使用的是retry
        // onSuccess: () => queryClient.invalidateQueries(queryKey),
        // onSuccess: () => queryClient.invalidateQueries('projects'),
        // async onMutate(target: Partial<Project>) {
        //     const previousItems = queryClient.getQueryData(queryKey);
        //     queryClient.setQueryData(queryKey, (old?: Project[]) => {
        //         return old?.map(project => project.id === target.id ? {...project, ...target} : project) || [];
        //     })
        //     return { previousItems }
        // }, 
        // onError(error, newItem,  context) {
            // queryClient.setQueryData(queryKey, context?.previousItems)
            // queryClient.setQueryData(queryKey, (context as {previousItems:Project[]}).previousItems);
        // }
    )
}

// 增加
export const useAddProject = (queryKey: QueryKey) => {
    // const { run, ...asyncResult } = useAsync();
    // const add = (params: Partial<Project>) => {
        //     return run(client(`projects/${params.id}`, {
            //         data: params,
            //         method: 'POST',
            //     }))
            // }
            // return {
                //     add,
                //     asyncResult
                // }
    const client = useHttp();
    // const queryClient = useQueryClient();
    return useMutation(
        (params: Partial<Project>) => client(`projects`, {
                data: params,
                method: 'POST',
        }),
            useAddConfig(queryKey)
        )
        // { 
        //  第二个参数 请求发送完成之后进行刷新  之前使用的是retry
        // onSuccess: () => queryClient.invalidateQueries('projects')
    // }
    // )
}

// 删除任务
export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    // const queryClient = useQueryClient();
    return useMutation(
        ({id}: {id: number}) => client(`projects/${id}`, {
                // data: params,
                method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}

// 获取详情
export const useGetProject = (params?: number) => {
    const client = useHttp();
    // const queryClient = useQueryClient();
    return useQuery<Project>(
        ['projects', {params}],
        () =>  client(`projects/${params}`),
        // 当id为undefined时候  就不要再发起请求了
        {
            // enabled: !!params
            // 或者
            enabled: Boolean(params),
        }
    )
}