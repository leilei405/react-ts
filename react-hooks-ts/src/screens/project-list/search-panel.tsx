import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input, Form, Select } from 'antd'
import { Users } from 'types/user'
import { Project } from 'types/project';
import { UserSelect } from 'components/userSelect'

interface SearchPanelProps {
    user: Users[], 
    // params: {
    //     name: string,
    //     personId: string,
    // },
    params: Partial<Pick<Project, 'name' | 'personId'>>
    setParams: (params: SearchPanelProps['params']) => void;
}

export const SearchPanel = ({params, user, setParams}: SearchPanelProps) => {
    // console.log(user, 'user');
    
    return <Form layout='inline' style={{ marginBottom: '2rem' }}>
        <Form.Item label="名称">
            <Input 
                type='text' 
                value={params.name}
                // 解构params
                // setParams(Object.assign({}, params, {name:e.target.value}))  ===  setParams({...params, name: e.target.value})}
                onChange={e => setParams({
                    ...params, name: e.target.value
                })}
            />
        </Form.Item>
        <Form.Item label="负责">
            <UserSelect 
                defaultOptionName='负责人'
                value={params.personId} 
                onChange={value => 
                    setParams({
                      ...params, 
                      personId: value
                    })
                }
            />

            {/* <Select
                value={params.personId}
                onChange={e =>
                    setParams({
                        ...params, 
                        personId: e
                    })
                }
            >   
                <Select.Option value="">负责人</Select.Option>
                {
                    user.map(item => <Select.Option key={item.id} value={String(item.id)}>{item.name}</Select.Option>)
                }
            </Select> */}
        </Form.Item>
    </Form>
}
