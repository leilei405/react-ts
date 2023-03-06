import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task';
import { useAddConfig, useDeleteConfig, useEditConfig } from './useOptimisticOption';
export const  useTask = (params?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', params], () =>  
        client('tasks', {data: params})
    );
};


export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) => client(`tasks`, {
                data: params,
                method: 'POST',
        }),
            useAddConfig(queryKey)
        )
}

// 获取详情
export const useGetTask = (id?: number) => {
    const client = useHttp();
    return useQuery<Task>(
        ['tasks', {id}],
        () =>  client(`tasks/${id}`),
        {
            enabled: !!id
        }
    )
}


// 编辑
export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
    (params: Partial<Task>) => 
        client(`tasks/${params.id}`, {
            data: params,
            method: 'PATCH',
        }), 
        useEditConfig(queryKey)
    )
}

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        ({id}: {id: number}) => client(`tasks/${id}`, {
                method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}