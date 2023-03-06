import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd'
import { UserInfoProps } from 'types/userInfo'
import { LoginButton } from 'unauthenticated-app'
import { useAsync } from 'utils/useAsync';
export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
    const { login } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
    const handelSubmit = async (value: UserInfoProps) => {
        // 阻止浏览器默认行为
        // event.preventDefault();
        // 使用  as 是因为 event.currentTarget.elements[0]  没有value
        // 使用 as 强制转换成  HTMLInputElement   类型断言
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        try {
            await run(login(value))
        } catch(e: any) {
            onError(e)
        }
    }

    return (
        <Form onFinish={handelSubmit}>
            <Form.Item  name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input type="text" value="admin" id={'username'} placeholder="用户名"/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input type="password" value="admin" id={'password'} placeholder="密码" />
            </Form.Item>
            <Form.Item>
                <LoginButton loading={isLoading} type='primary' htmlType='submit'>登录</LoginButton>
            </Form.Item>
        </Form>
    )
}
