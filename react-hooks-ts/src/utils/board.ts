import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Board } from 'types/board';
import { useAddConfig, useDeleteConfig } from './useOptimisticOption';
export const  useBoard = (params?: Partial<Board>) => {
    const client = useHttp();
    return useQuery<Board[]>(['kanbans', params], () =>  
        client('kanbans', {data: params})
    );
};

export const useAddBoard = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Board>) => client(`kanbans`, {
                data: params,
                method: 'POST',
        }),
            useAddConfig(queryKey)
        )
}

export const useDeleteBoard = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        ({id}: {id: number}) => client(`kanbans/${id}`, {
                method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}