import React, { useEffect } from 'react';
import { Drawer, Button, Spin, Form, Input } from 'antd'
import { useProjectModal, useProjectQueryKey } from './util';
import { UserSelect } from 'components/userSelect'
import { useAddProject, useEditProject } from 'utils/useProject';
import { useForm } from 'antd/es/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';
// interface ProjectModalProps {
//     projectModalOpen: boolean;
//     onClose: () => void;
// }

// export const ProjectModal = ({projectModalOpen, onClose}: ProjectModalProps) => {
export const ProjectModal = () => {
    const { 
        projectModalOpen, 
        close, 
        editingProject, 
        isLoading  
    } = useProjectModal()


    const title = editingProject ? '编辑项目' : '创建项目';
    const useMutateProject = editingProject ? useEditProject : useAddProject;
    

    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectQueryKey())
    const [ form ] = useForm();
    const onFinish = (values: any) => {
        mutateAsync({  ...editingProject, ...values }).then(() => {
            form.resetFields();
            close();
        })
    }

    // 清空输入框
    const closeModal = () => {
        form.resetFields();
        close();
    }

    useEffect(() => {
        form.setFieldsValue(editingProject)
    },[editingProject, form])

    // forceRender={true}  不管显示还是隐藏
    return <Drawer forceRender={true} onClose={closeModal} open={projectModalOpen} width="100%">
        <Container>
            {
                isLoading ? <Spin size={'large'} /> : <> 
                    <h1>{title}</h1>
                    <ErrorBox error={error} />
                    <Form form={form} layout='vertical' style={{ width: '40rem' }} onFinish={onFinish}>
                        <Form.Item label="名称" name={"name"} rules={[{ required: true, message: "请输入项目名" }]}>
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                        <Form.Item label="部门" name={"organization"} rules={[{ required: true, message: "请输入部门名" }]}>
                            <Input placeholder="请输入部门名" />
                        </Form.Item>
                        <Form.Item label="负责人" name={"personId"}>
                            <UserSelect defaultOptionName='负责人' />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: '100%' }} loading={mutateLoading} type='primary' htmlType='submit'>{!editingProject ? "创建" : "编辑"}</Button>
                        </Form.Item>
                    </Form> 
                </>
            }
            {/* <Button type='link' onClick={close}>关闭</Button> */}
        </Container>
    </Drawer>
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`