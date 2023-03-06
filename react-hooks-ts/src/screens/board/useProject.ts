import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useGetTask } from 'utils/task';
import { useUrlQueryParam } from 'utils/url';
import { useGetProject } from 'utils/useProject';
// 自定义hook获取看板项目
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    // 通过正则表达式将id获取到
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useGetProject(useProjectIdInUrl())

export const useBoardSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useBoardQueryKey = () => ['kanbans', useBoardSearchParams()]

export const useTaskSearchParams = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [params, setParams] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl();
    return React.useMemo(()=> ({ 
        projectId,
        typeId: Number(params.typeId) || undefined,
        processorId: Number(params.processorId) || undefined,
        tagId: Number(params.tagId) || undefined,
        name: params.name || undefined
    })
    ,[projectId, params])
}

export const useTaskQueryKey = () => ['tasks', useTaskSearchParams()]

// 每点击一个任务都会打开一个模态框
export const useTaskModal = () => {
    const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
    const { data: editingTask, isLoading } = useGetTask(Number(editingTaskId));
    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id })
    }, [setEditingTaskId])
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' });
    }, [setEditingTaskId]);
    return { editingTask, isLoading, startEdit, close, editingTaskId }
}
