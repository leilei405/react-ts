// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useMemo} from 'react';
import { useSetUrlSearchParams, useUrlQueryParam } from 'utils/url'
import { useGetProject } from 'utils/useProject';

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name', 'personId']);
    // 不能将 string 类型 分配给Number
    return [
        useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]),
        setParams
    ] as const
}

export const useProjectQueryKey = () => {
    const [ params ] = useProjectSearchParams()
    return ['projects', params]
}

//  全局状态管理器的功能
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])

    const setUrlParams  = useSetUrlSearchParams()

    const { data: editingProject, isLoading } = useGetProject(Number(editingProjectId))

    // 打开关闭
    const open = () => setProjectCreate({ projectCreate: true })
    // const close = () => {
    //     projectCreate ? setProjectCreate({ projectCreate: undefined }) : setEditingProjectId({ editingProjectId: undefined })
    // }
    const close = () => setUrlParams({projectCreate: "", editingProjectId: ""})
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
    // 超过三个返回使用tuple类型
    // return [
    //     projectCreate === 'true',
    //     open,
    //     close
    // ] as const
}