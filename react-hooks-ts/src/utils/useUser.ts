// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useAsync } from 'utils/useAsync';
import { useHttp } from 'utils/http';
import { Users } from 'types/user';

export const useUser = (params?: Partial<Users>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Users[]>();
    
    useEffect(() => {
        run(client('users', { data: cleanObject(params || {}) }))
        // 使用useHttp
        // client('projects', {data: cleanObject(params || {})})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params, run, client]);

    return result;
}