import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { useAddTask } from 'utils/task';
import { useProjectIdInUrl, useTaskQueryKey } from './useProject';


export const CreateTask = ({kanbanId}: {kanbanId: number}) => {
    const [name, setName] = useState<string | undefined>();
    const projectId  = useProjectIdInUrl();
    const { mutateAsync: addTask } = useAddTask(useTaskQueryKey())
    const [ inputMode, setInputMode ] = useState(false);
    const submitTask = async () => {
        await addTask({ projectId, name, kanbanId });
        setInputMode(false);
        setName('');
    }

    const toggle = () => {
        setInputMode(!inputMode);
    }

    useEffect(() =>{
        if(!inputMode){
            setName('');
        }
    },[inputMode])

    if (!inputMode) {
        return <Button type='link' onClick={toggle}>+创建事务</Button>
    }

    return <Card>
        <Input 
            size='large' 
            placeholder='需要做些什么' 
            autoFocus={true}
            onPressEnter={submitTask} 
            value={name} 
            onChange={e => setName(e.target.value)}
        />
    </Card>
}
