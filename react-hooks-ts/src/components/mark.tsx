import React from 'react';

export const Mark = ({name, keyword}: {name: string, keyword: string | undefined}) => {
    if(!keyword) {
        return <>{name}</>
    }
    const arr = name.split(keyword);
    return <>
        {
            arr.map((item, index) => <span key={index}>
                {item}
                {
                    index === arr.length - 1 ? '' : <span style={{ color: '#257AFD' }}>{keyword}</span>
                }
            </span>)
        }
    </>;
}