import React from "react";
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from 'jira-dev-tool';

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${props => props.marginBottom + 'rem'};
    > * {  //  设置他下面的直接子元素
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageLoading = () => <FullPage>
    <Spin size='large'></Spin>
</FullPage>

export const FullPageErrorFallback = ({error}:{error: Error | null}) => <FullPage>
    <DevTools />
    {/* <Typography.Text type="danger">{error?.message}</Typography.Text> */}
    <ErrorBox error={error} />
</FullPage>


// 类型守卫
// 符合这个条件的时候 value?.message  就返回整个类型  value is Error(js原生error类型)
const isError = (value: any): value is Error => value?.message 

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>
    }
    return null
}


export const ButtonNoPadding = styled(Button)`
    padding: 0;
`


export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`