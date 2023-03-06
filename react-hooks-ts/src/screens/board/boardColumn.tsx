import React from 'react';
import { Board } from 'types/board';
import { useTask } from 'utils/task';
import { useBoardQueryKey, useTaskModal, useTaskSearchParams } from './useProject';
import { useTaskTypes } from 'utils/taskTypes';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { CreateTask } from './createTask';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteBoard } from 'utils/board';
import { Row } from 'components/lib';


const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(item => item.id === id)?.name
    if (!name) {
         return null
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} alt="bugOrTask" style={{ width: '1.6rem' }}/>
}

// 实现搜索关键字高亮
const TaskCard = ({task}: {task: Task}) => {
    const { startEdit } = useTaskModal();
    const { name: keyword } = useTaskSearchParams();
    return <Card 
                onClick={() => startEdit(task.id)} 
                style={{ marginBottom: '0.5rem' }} 
                key={task.id}
            >
                <p>
                    <Mark keyword={keyword} name={task.name} />
                </p>
                
            <TaskTypeIcon id={task.typeId} />
    </Card>
}


export const BoardColumn = ({board}: {board: Board}) => {
    const { data: allTasks } = useTask(useTaskSearchParams())
    const tasks = allTasks?.filter(item => item.kanbanId === board.id)
    return <Container>
        <TaskContainer>
            <Row between={true}>
                <h3>{board.name}</h3>
                <More board={board}/>
            </Row>
            {
                tasks?.map((task) => <TaskCard key={task.id} task={task} />) 
            }
            <CreateTask kanbanId={board.id} />
        </TaskContainer>
    </Container>
}

const More = ({board}: {board: Board}) => {
    const { mutateAsync: deleteBoard } = useDeleteBoard(useBoardQueryKey());
    const confirmDeleteBoard = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this board?',
            content: `Are you sure you want`,
            okText: 'Are you sure',
            onOk: () => {
                deleteBoard({id});
            }
        })
    }
    const items: MenuProps['items'] = [
        {
            label: <Button type='link' onClick={() => confirmDeleteBoard(board.id)}>删除</Button>,
            key: 'delete',
        },
    ]
    return <Dropdown menu={{items}}>
        <Button type='link' >...</Button>
    </Dropdown>
}


export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

const TaskContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`