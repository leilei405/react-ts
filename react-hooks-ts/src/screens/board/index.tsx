import React from 'react'
import { useDocumentTitle } from 'useHook/useTitle'
import { useBoard } from 'utils/board'
import { useBoardSearchParams, useProjectInUrl, useTaskSearchParams } from './useProject'
import { BoardColumn } from './boardColumn'
import styled from '@emotion/styled';
import { SearchPanelForm } from './searchPanel'
import { ScreenContainer } from 'components/lib'
import { useTask } from 'utils/task'
import { Spin } from 'antd'
import { CreateBoard } from './createBoard'
import { TaskModal } from './taskModal'

export const BoardScreen = () => {
    useDocumentTitle("看板列表")

    // 读到项目名字
    const { data: currentProject } = useProjectInUrl();
    // 看板数据 board 有可能是undefined
    const { data: board, isLoading: boardIsLoading } = useBoard(useBoardSearchParams());

    const { isLoading: taskIsLoading } = useTask(useTaskSearchParams())
    const isLoading = taskIsLoading || boardIsLoading;
    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanelForm />
        {isLoading ? <Spin size='large' /> :
            <ColumnsContainer>
                {
                    board?.map(item => <BoardColumn board={item} key={item.id} />) 
                }
                <CreateBoard />
            </ColumnsContainer>
        }
        <TaskModal />
    </ScreenContainer>
}


export const ColumnsContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`