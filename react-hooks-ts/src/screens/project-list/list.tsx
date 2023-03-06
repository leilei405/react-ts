import React from 'react';
import { Users } from 'types/user';
import { Table, Dropdown, Modal } from 'antd'
import type { MenuProps } from 'antd';
import { TableProps } from 'antd/es/table'
import  dayjs from 'dayjs'
import { Project } from 'types/project'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/useProject';
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectQueryKey } from './util';

// TableProps  Table表格组件的属性类型
interface ListProps extends TableProps<Project>{
    // list: Project[];
    user: Users[];
    // refresh?: () => void,
    // setProjectModalOpen: (isOpen: boolean) => void;
    // projectButton: JSX.Element;
}

// export const TableList = ({ user, projectButton ,...props}: ListProps) => {
export const TableList = ({ user , ...props}: ListProps) => {
    // const { open } = useProjectModal()
    const { mutate } = useEditProject(useProjectQueryKey())
    // const { startEdit } = useProjectModal()
    // 函数科利华
    // const pinProject = (id: number) => (pin: boolean) => edit({id, pin}).then(props.refresh)
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
    // const editProject = (id: number) => () => startEdit(id);
    const columns = [
        {
            title: <Pin checked={true} disabled={true}/>,
            render: (value: number, project: Project) => {
                return (
                    <Pin checked={project.pin}  onCheckedChange={pinProject(project.id)}/>
                )
            }
        },
        {
            title: '名称',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (value: string, project: Project) => {
                return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            dataIndex: 'personId',
            render: (personId: number, record: Project) => {
                return <span>{user.find(user1 => user1.id === record.personId)?.name || '未知'}</span>
            }
        },
        {
            title: '创建时间',
            render: (value: number, project: Project) => {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '没时间哦'}
                </span>
            }
            
        },
        {
            title: "操作",
            render: (value: any, project: Project) => {
                return <More project={project}/>
            }
        }
    ]
    return (
        <div>
            {/* dataSource  替换为 props */}
             <Table rowKey="id" {...props} columns={columns} pagination={false}/>
        </div>
    )
}


const More = ({project}: {project: Project}) => {
    const editProject = (id: number) => () => startEdit(id);
    const { startEdit } = useProjectModal()
    const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this project?',
            content: `Are you sure you want`,
            okText: 'Are you sure',
            onOk: () => {
                deleteProject({id});
            }
        })
    }
    const items: MenuProps['items'] = [
        {
            label: <ButtonNoPadding type='link' onClick={editProject(project.id)} >编辑</ButtonNoPadding>,
            key: 'edit',
        },
        {
            label: <ButtonNoPadding type='link' onClick={() => confirmDeleteProject(project.id)}>删除</ButtonNoPadding>,
            key: 'delete',
        },
    ]
    return <Dropdown menu={{items}}>
        <ButtonNoPadding type='link' >...</ButtonNoPadding>
    </Dropdown>
}