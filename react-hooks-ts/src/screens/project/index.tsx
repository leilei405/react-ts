import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router'
import { BoardScreen } from 'screens/board'
import { EpicScreen } from 'screens/epic'
import styled from '@emotion/styled'
import { Menu } from 'antd'


// 自定义hook
const useRouterType = () => {
    const utils = useLocation().pathname.split('/')
    return utils[utils.length - 1]
}

export const ProjectScreen = () => {

    const routerType = useRouterType()
    return <Container>
        <Aside>
            <Menu mode='inline' selectedKeys={[routerType]}>
                <Menu.Item key="bulletinBoard">
                    <Link to={"bulletinBoard"}>看板</Link>
                </Menu.Item>
                <Menu.Item key="epic">
                    <Link to={"epic"}>任务组</Link>
                </Menu.Item>
            </Menu>
        </Aside>
        <Main>
            <Routes>
                <Route path='/bulletinBoard' element={<BoardScreen />}/>
                <Route path='/epic' element={<EpicScreen />}/>
                <Route index element={<BoardScreen />} />
            </Routes>
        </Main>
    </Container>
}

const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;   
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, .1);
    display: flex;
    overflow: hidden;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    overflow: hidden;
`