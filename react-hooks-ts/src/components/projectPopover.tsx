import React from 'react';
import { Popover, Typography, List, Divider } from 'antd'
import { useProjects } from 'utils/useProject';
import { ButtonNoPadding } from 'components/lib'
import styled from '@emotion/styled';
// import { ModalProps } from 'authenticated-app';
import { useProjectModal } from 'screens/project-list/util';

// const ProjectPopover = ({ projectButton }: ModalProps) => {
const ProjectPopover = () => {
    const { open } = useProjectModal()
    const { data: projects } = useProjects();
    //  筛选收藏项目
    const filteredProjects = projects && projects.filter(project => project.pin)
    // const filteredProjects1 = projects?.filter(project => project.pin)
    //  筛选未收藏项目
    // const unFavoriteProjects = projects?.filter(project =>!project.pin)
    const unFavoriteProjects1 = projects && projects?.filter(project =>!project.pin)
    const content = <ContainerPopover>
        <Typography.Text style={{ color: 'red' }}>已收藏项目</Typography.Text>
        <List>
           {
                filteredProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            } 
        </List>
        <Typography.Text style={{ color: 'red' }}>未收藏项目</Typography.Text>
        <List>
            {
                unFavoriteProjects1?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding onClick={open} type='link'>创建项目</ButtonNoPadding>
        {/* { projectButton } */}
    </ContainerPopover>
    return <Popover placement='bottom' content={content}>
        <span>项目</span>
    </Popover>
}

const ContainerPopover = styled.div`
    min-width: 30rem;
`



export {
    ProjectPopover
}
