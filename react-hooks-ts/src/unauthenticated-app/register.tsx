import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input  } from 'antd'
import { UserInfoProps } from 'types/userInfo'
import { LoginButton } from 'unauthenticated-app';
import { useAsync } from 'utils/useAsync';
export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
    const handelSubmit = async ({surePassword, ...value}: UserInfoProps) => {
        // 阻止浏览器默认行为
        // event.preventDefault();
        // 使用  as 是因为 event.currentTarget.elements[0]  没有value
        // 使用 as 强制转换成  HTMLInputElement   类型断言
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        if (surePassword !== value.password) {
            onError(new Error('请确认俩次输入的密码相同哦'))
            return 
        }
        try {
           await run(register(value))
        } catch(e: any) {
            onError(e)
        }
    }

    return (
        <Form onFinish={handelSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input type="text" placeholder="用户名"/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item name="surePassword" rules={[{ required: true, message: '请确认密码' }]}>
                <Input type="password" placeholder="确认密码" />
            </Form.Item>
            <Form.Item>
                <LoginButton loading={isLoading} type='primary' htmlType='submit'>注册</LoginButton>
            </Form.Item>
        </Form>
    )
}
