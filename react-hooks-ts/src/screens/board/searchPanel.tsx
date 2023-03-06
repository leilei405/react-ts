import { Button, Input } from 'antd';
import { Row } from 'components/lib';
import { TaskTypeSelect } from 'components/taskTypeSelect';
import { UserSelect } from 'components/userSelect';
import React  from 'react';
import { useTaskSearchParams } from 'screens/board/useProject';
import { useSetUrlSearchParams } from 'utils/url'

export const SearchPanelForm = () => {
    const searchParams = useTaskSearchParams();
    const setSearchParams = useSetUrlSearchParams();
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined
        });
    }
    return <Row marginBottom={4} gap={true}>
        <Input 
            style={{ width: '20rem' }} 
            placeholder="任务名" 
            value={searchParams.name}
            onChange={e => {
                setSearchParams({ name: e.target.value })
            }}
        />

        <UserSelect 
            defaultOptionName='经办人'
            style={{ width: '20rem' }} 
            value={searchParams.processorId}
            onChange={e => {
                setSearchParams({ processorId: e })
            }}
        />

        <TaskTypeSelect 
            defaultOptionName='类型' 
            style={{ width: '20rem' }} 
            value={searchParams.typeId}
            onChange={e => {
                setSearchParams({ typeId: e })
            }}
        />

        <Button
            onClick={reset}
            type='link'
        >
            清除筛选器
        </Button>
    </Row>
}