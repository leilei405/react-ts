import React, { useEffect } from "react";
import { useForm } from 'antd/es/form/Form';
import { useTaskModal, useTaskQueryKey } from 'screens/board/useProject';
import { useDeleteTask, useEditTask } from "utils/task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/userSelect";
import { TaskTypeSelect } from "components/taskTypeSelect";

export const  TaskModal = () => {
    const [ form ] = useForm();
    const { editingTask, close, editingTaskId } = useTaskModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTaskQueryKey())

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };

    const onCancel = () => {
        close();
        form.resetFields();
    }

    useEffect(()=> {
        form.setFieldsValue(editingTask);
    }, [editingTask, form])

    const layout = {
        labelCol: { span: 8 }, // 左边文字
        wrapperCol: { span: 16 }, // 右边表单
    }

    const { mutate: deleteTask } = useDeleteTask(useTaskQueryKey());

    const confirmDeleteTask = () => {
        close();
        Modal.confirm({
            title: 'Are you sure you want to delete this task?',
            content: `Are you sure you want`,
            okText: 'Are you sure',
            onOk: () => {
                deleteTask({id: Number(editingTaskId)});
            }
        })
    }

    return <Modal 
                okText='确认' 
                cancelText='取消' 
                confirmLoading={editLoading}
                title="编辑任务"
                open={!!editingTaskId}
                onCancel={onCancel}
                onOk={onOk}
                forceRender={true}
            >
                <Form 
                    initialValues={editingTask} 
                    form={form} 
                    {...layout}
                >
                    <Form.Item 
                        label="任务名称" 
                        name={"name"} 
                        rules={[{ required: true, message: "请输入任务名" }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item 
                        label="经办人"
                        name={"processorId"} 
                    >
                       <UserSelect defaultOptionName="经办人" />
                    </Form.Item>
                    <Form.Item 
                        label="类型"
                        name={"typeId"} 
                    >
                       <TaskTypeSelect  />
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'right' }}>
                    <Button 
                        type="link" 
                        size='large'
                        onClick={confirmDeleteTask}
                    >    
                        删除
                    </Button>
                </div>
    </Modal>
}