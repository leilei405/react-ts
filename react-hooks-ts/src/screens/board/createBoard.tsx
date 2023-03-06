import { Input } from 'antd';
import React, { useState } from 'react';
import { useAddBoard } from 'utils/board';
import { Container } from './boardColumn';
import { useBoardQueryKey, useProjectIdInUrl } from './useProject';


export const CreateBoard = () => {
    const [name, setName] = useState<string | undefined>();
    const projectId  = useProjectIdInUrl();
    const { mutateAsync: addBoard } = useAddBoard(useBoardQueryKey())
    const submitBoard = async () => {
        await addBoard({projectId, name});
        setName('');
    }

    return <Container>
        <Input 
            size='large' 
            placeholder='新建看板名称' 
            onPressEnter={submitBoard} 
            value={name} 
            onChange={e => setName(e.target.value)}
        />
    </Container>
}