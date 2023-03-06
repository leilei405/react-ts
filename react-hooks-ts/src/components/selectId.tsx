import React from 'react';
import { Select } from 'antd'
import { Raw } from 'types';


// 拿到Select身上自带的所有类型
type SelectProps = React.ComponentProps<typeof Select>
// interface IdSelectProsp  extends React.ComponentProps<typeof Select>{

// 直接用Omit  一了百了  删除相冲突的元素
export interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionName' | 'options'>{
    value?: Raw | null | undefined;
    onChange?: (valueType?: number) => void;
    defaultOptionName?: string;  // 作为默认值  空值存在
    options?: { name: string; id: number}[];
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number| undefined 类型
 * 当isNaN(Number(value)) 为true的时候 代表选择默认类型
 * 当选择默认类型的时候, onChange会回调undefined
 * @param props 
 * @returns 
 */

export const SelectId = (props: IdSelectProps) => {
    // ...restProps 接收的是Select剩余所有的类型  
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    const { Option } = Select;
    // const onChange = () => {
    //     if (onChange) {
    //         onChange(typeof value === 'number'? value : undefined)
    //     }
    // }
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange?.(toNumber(value) || undefined)}
            style={{ width: '100%' }}
            {...restProps}
        >
            {
                options && options?.map(item => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
            }
            {
                defaultOptionName && <Option value={0}>{defaultOptionName}</Option>
            }
        </Select>
    )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)