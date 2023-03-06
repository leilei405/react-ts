import React from 'react';
import { SelectId } from 'components/selectId';
import { useTaskTypes } from 'utils/taskTypes';


export const TaskTypeSelect = (props: React.ComponentProps<typeof SelectId>) => {
    const { data: taskTypes } = useTaskTypes()
    return (
        <SelectId
            options={taskTypes || []}
            {...props}
        />
    )
}