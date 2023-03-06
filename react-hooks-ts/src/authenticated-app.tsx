import { useAuth } from "context/auth-context";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { Button, Dropdown }  from 'antd';
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'; // 将图片转为组件的形式  可以设置宽高
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "components/lib";
import type { MenuProps } from 'antd';
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from 'screens/project-list/projectModal'
import { ProjectPopover } from "components/projectPopover";
export const AuthenticatedApp = () => {
    // const value: any =undefined;
    // const [projectModalOpen, setProjectModalOpen] = useState(false);

    return (
        <Container>
            <Router>
                <PageHeader 
                    // projectButton={
                    //     <ButtonNoPadding 
                    //         onClick={() => setProjectModalOpen(true)} 
                    //         type='link'
                    //     >
                    //         创建项目
                    //     </ButtonNoPadding>
                    // }
                    // setProjectModalOpen={setProjectModalOpen}
                />
                <Main>
                    <Routes>
                        <Route 
                            path="/projects" 
                            element={
                                <ProjectListScreen 
                                    // setProjectModalOpen={setProjectModalOpen} 
                                    // projectButton={
                                    //     <ButtonNoPadding 
                                    //         onClick={() => setProjectModalOpen(true)} 
                                    //         type='link'
                                    //     >
                                    //         创建项目
                                    //     </ButtonNoPadding>
                                    // }
                                />
                            } 
                        />
                        <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
                        <Route 
                            index 
                            element={
                                <ProjectListScreen 
                                    // setProjectModalOpen={setProjectModalOpen}
                                    // projectButton={
                                    //     <ButtonNoPadding 
                                    //         onClick={() => setProjectModalOpen(true)} 
                                    //         type='link'
                                    //     >
                                    //         创建项目
                                    //     </ButtonNoPadding>
                                    // }
                                />
                            }
                        />
                        {/* <Navigate to="/projects" /> */}
                    </Routes>
                </Main>
                {/* <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} /> */}
                <ProjectModal />
            </Router>
        </Container>
    )
}

export interface ModalProps {
    // setProjectModalOpen: (isOpen: boolean) => void;
    projectButton: JSX.Element;
}

// const PageHeader = (props: ModalProps) => {
const PageHeader = () => {
    const { logout, user } = useAuth();
    const items: MenuProps['items'] = [
        {
          label: <Button type='link' onClick={logout} >退出登录</Button>,
          key: 'logout',
        },
    ]
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type="link" onClick={resetRoute}>
                <SoftWareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
            </ButtonNoPadding>
            {/* <ProjectPopover {...props} /> */}
            <ProjectPopover />
            <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown menu={{items}}>
                <Button type='link' onClick={e => e.preventDefault()}>
                    hi,welcome{user?.name}  
                </Button>
            </Dropdown>
            {/* <Button type="primary" onClick={logout}>登出</Button> */}
        </HeaderRight>
    </Header>
}


/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    /* display: grid; */
    /* grid-template-columns: 20rem 1fr 20rem; */
    height: 100vh;
    /* grid-template-areas:  
    "header header header"
    "nav main aside"
    "footer footer footer"; */
`

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    z-index: 1;
    /* height: 6rem;
    grid-area: header;
    display: flex;
    flex-direction: row;  // 默认
    align-items: center;
    justify-content: space-between; */
`

const HeaderLeft = styled(Row)`
    /* display: flex;
    align-items: center; */
`

const HeaderRight = styled.div``

const Main = styled.main` 
    /* grid-area: main; */
    height: calc(100vh - 6rem);
    /* display: flex; */
    overflow: hidden;
`

// const Nav = styled.nav`grid-area: nav;`

// const Aside = styled.aside`grid-area: aside;`

// const Footer = styled.footer`grid-area: footer;`