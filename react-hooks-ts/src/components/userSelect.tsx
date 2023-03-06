import React from 'react';
import { useUser } from 'utils/useUser'
import { SelectId } from 'components/selectId';


export const UserSelect = (props: React.ComponentProps<typeof SelectId>) => {
    const { data: users } = useUser()
    return (
        <SelectId
            options={users || []}
            {...props}
        />
    )
}