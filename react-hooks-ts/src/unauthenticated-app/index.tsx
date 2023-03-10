import React, { useState } from "react";
import { LoginScreen } from "unauthenticated-app/login";
import { RegisterScreen } from "unauthenticated-app/register";
import { Button, Card } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useDocumentTitle } from "utils/useTitle";
import { ErrorBox } from "components/lib";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<Error | null>(null);

    useDocumentTitle('请登录注册以继续', false)
    return (
        <Container>
            <Header />
            <Background />
            {/* <Button onClick={() => {throw new Error('点击抛出异常')}}>抛出异常</Button> */}
            <CardLogin>
                <Title>{ isRegister ? '注册账号' : '登录账号'}</Title>
                {/* { error ? <Typography.Text style={{ color: 'red' }}>{error.message}</Typography.Text> : null} */}
                <ErrorBox error={error} />
                { isRegister ? <RegisterScreen onError={setError} />  : <LoginScreen onError={setError} /> }
                <Button type='link' onClick={() => setIsRegister(!isRegister) }>
                    切换到{isRegister ? '已经有账号了？请登录' : '没有账号？注册新账号'}
                </Button>
            </CardLogin>
        </Container>
    )
}

export const LoginButton = styled(Button)`
    width: 100%;
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
    text-align: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const CardLogin = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0,0,0,.1) 0 0 10px;
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem), cover;
    background-image: url(${left}), url(${right});
`