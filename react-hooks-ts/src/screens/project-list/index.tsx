// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
// import * as qs from 'qs'
import { SearchPanel } from './search-panel';
import { TableList } from './list';
import { useDebounce } from 'utils';
// import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
// import { Typography } from 'antd'
// import { useAsync } from 'utils/useAsync';
// import { Project } from 'types/project';
import { useProjects } from 'utils/useProject';
import { useUser } from 'utils/useUser';
import { useDocumentTitle } from 'utils/useTitle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useUrlQueryParam } from 'utils/url';
import { useProjectModal, useProjectSearchParams } from './util';
// import { ModalProps } from 'authenticated-app';
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib';
// import { Test } from './test'
// const apiUrl = process.env.REACT_APP_API_URL;
// export const ProjectListScreen = ({ projectButton }:ModalProps) => {
export const ProjectListScreen = () => {
    // const [isLoading, setIsLoading] = useState(false); // loading
    // const [error, setError] = useState<null | Error>(null); // Error
    // const [user, setUser] = useState([]);
    // const [list, setList] = useState([]);
    // const [,setParams] = useState({
    //     name: '',
    //     personId:''
    // });
    // 使用useDebounce 
    // const client = useHttp();
    // const { run, isLoading, error, data: list } = useAsync<Project[]>();
    // 当params改变的时候
    // useEffect(() => {
        // run(client('projects', {data: cleanObject(debounceParams)}))
        // 使用useHttp 
        // client('projects', {data: cleanObject(debounceParams)})
        // .then(setList)
        // .catch((err) => {
        //     setList([])
        //     setError(err)
        // })
        // .finally(() => setIsLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[debounceParams])
    // useMount(() => {
    //     client('users').then(setUser)
    // })
    // const [params, setParams] = useUrlQueryParam(['name', 'personId']);
    // 不能将 string 类型 分配给Number
    // const projectParams = { ...params, personId: Number(params.personId) || undefined }
    // const debounceParams = useDebounce(projectParams, 200);

    const [params, setParams] = useProjectSearchParams()

    // const { isLoading, error, data: list, retry } = useProjects(useDebounce(params, 200));
    const { isLoading, error, data: list } = useProjects(useDebounce(params, 200));
    const { data: users } = useUser()
    useDocumentTitle('项目列表', false)

    // 打开模态框
    const { open } = useProjectModal()

    return (
        <Container>
            {/* <Test /> */}
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding type='link' onClick={open}>创建项目</ButtonNoPadding>   
                {/* { projectButton } */}
            </Row>
            
            <SearchPanel params={params} user={users || []} setParams={setParams} />
            {/* { error ? <Typography.Text type='danger'>{ error.message }</Typography.Text> : null } */}
            <ErrorBox error={error} />
            <TableList 
                // setProjectModalOpen={setProjectModalOpen} 
                // projectButton={projectButton}
                // refresh={retry} 
                loading={isLoading}
                dataSource={list || []} 
                user={users || []}
            />
        </Container>)
}


ProjectListScreen.whyDidYouRender =  true;

const Container = styled.div`
    padding: 3.2rem;
`