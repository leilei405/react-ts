import React from 'react';
import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

// HttpConfig  继承之后就会有  RequestInit  所有的属性
interface HttpConfig extends RequestInit {
    data?: object;
    token?: string;
}

// data, token, headers  除了这三个  其他的统一叫customConfig
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: HttpConfig = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }


    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请先登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

// JS 中的typeof 是在runtime时候运行的
// return typeof 1 === 'number

// TS 中的typeof 是在静态时候运行的
// return (...[endpoint, config]: Parameters<typeof http>)

export const useHttp = () => {
        const { user } = useAuth();
        // TODO 讲解操作符  Utility Types  充当工具的一种类型
        // Utility Types用法: 用泛型给他传入一个其他类型, 然后Utility Types 对这个类型进行某种操作

        // ...  可以将 endpoint, config 解构出来
        return React.useCallback(
            (...[endpoint, config]: Parameters<typeof http>) => 
            http(
                endpoint, { ...config, token: user?.token }
            ), [user?.token]);
    }


// Utility Types  充当工具的一种类型
/**
 * 1, Parameters 
 */
// *******  联合类型 
// let myFavoriteNumber: string | number;
// myFavoriteNumber = '244';
// myFavoriteNumber = 143;

// *******  类型别名
// type FavoriteNumber = string | number;
// let test: FavoriteNumber = '6'
// console.log(test);


// *******  interface 也没法实现Utility Types
// type Person = {
//     name: string,
//     aeg: number,
// }
// *******  Partial  可以将定义的类型中的参数都变为可选的参数
// const test1: Partial<Person> = {name: '21421'}
// console.log(test1);
// *******  Omit 删除定义类型中的某一项属性
// const test2: Omit<Person, 'name'> = {aeg: 1}
// const test3: Omit<Person, 'name' | 'aeg'> = {aeg: 1} //  第二个参数  也可以写为联合类型  <Person, 'name' | 'aeg'>
// console.log(test2);
// console.log(test3);




