import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'
import { TaskType } from 'types/taskTypes';
export const  useTaskTypes = (params?: Partial<TaskType>) => {
    const client = useHttp();
    return useQuery<TaskType[]>(['taskTypes'], () =>  
        client('taskTypes')
    );
};