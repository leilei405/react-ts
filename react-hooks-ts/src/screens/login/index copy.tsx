import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';
// 鸭子类型(duck typing): 面向接口继承  而不是面向对象编程(java)
interface ParamsProps {
    username: string;
    password: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {

    const { user, login } = useAuth();

    const loginUser = (params: ParamsProps) => {
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }).then( async res => {
            if(res.ok) {
            }
        })
    }

    const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止浏览器默认行为
        event.preventDefault();
        // 使用  as 是因为 event.currentTarget.elements[0]  没有value
        // 使用 as 强制转换成  HTMLInputElement   类型断言
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        loginUser({username, password})
    }

    return (
        <form onSubmit={handelSubmit}>
            {
                user ? <div>
                    登录成功, 用户名 : {user?.name}
                </div> : null
            }
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" value="admin" id={'username'} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" value="admin" id={'password'} />
            </div>
            <button type='submit'>登录</button>
        </form>
    )
}
