# 笔记

#### 创建TS项目

```typescript
npx create-react-app  项目名  --template typescript
```



tsconfig.json

```
用来配置ts
```



 在tsconfig.json配置路径

```json
"compilerOptions": {
    "baseUrl": "./src",    //  添加这么一条
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ]
}
```



配置  prettier

```json
 1.安装
 yarn add --dev --exact prettier
 
 2.创建.prettierrc.json 文件 
 echo {}> .prettierrc.json
 
```



格式化代码

```powershell
npx mrm lint-staged 
npx mrm@2 lint-staged 

这俩个都不行就跳过吧

在pakeage.json中再添加 ts, tsx
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
}

git init 
npx husky insatll
```



eslint 配置

````powershell
yarn add eslint-config-prettier -D
````



commit  提交校验

```json
npm install --save-dev @commitlint/config-conventional @commitlint/cli -D

echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```



遇到eslnt 错误

```
npm i eslint prettier-eslint eslint-config-prettier --save-dev
```



Mock 方案  及工具

```
1.代码入侵   \
	代码中写死的数据  或者请求本地的JSON文件  不推荐
2.请求拦截   
	优点:Mock.js  生成随机数据  与前端代码分离
	缺点:假数据  无法模拟真实的增删改查情况  支持ajax   不支持fetch
3.接口管理工具
	rap
	swagger
	moco
	yapi
4.本地node服务器
	json-serve
	优点:配置简单 自定义程度比较高  增删改查真实模拟
	缺点:与接口管理工具比,无法随着后端app的修改而自动的修改

```



全局安装使用json-serve

```
npm i json-serve -g

create  一个db.json 

json-serve --watch db.json   启动服务
json-serve --watch --port 8000 db.json   启动服务   --port 8000  设置监听的端口

yarn add json-server -D

`package.json 中配置jsonserver
	scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "json-server": "json-server __json_serve_mock__/data.json --watch",
    "prepare": "husky install"
  },
`

npm run json-server   启动服务
```



REST API  标准

```
一句话总结  URl代表资源对象, METHOD代表行为

GET /list    列表
GEt /list/12  详情
POST  /list/1   增加
PUT  /list    替换
PATCH   /list/12  修改  
DELETE  /list/12  删除
```





安装  imooc-jira-tool

```
npx imooc-jira-tool
```



消除警告

```
npx msw init public
```



JWT 原理 与auth-provider实现

```typescript
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    // 设置存储token
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};



// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 退出时清除token
export const logout = async () => window.localStorage.removeItem(localStorageKey);

```



useContext 存储全局用户信息

```typescript

```



