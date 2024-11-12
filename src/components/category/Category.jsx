import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Input, Button, Form, message } from "antd";
import { useState } from "react";
import { getCategory } from "../../utils/category/CategoryApi";
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from "../../utils/category/CategoryHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Category() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const {data, refetch} = useQuery({
        queryKey: ['getCategory'],
        queryFn: getCategory,
    })
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm() 

    const {mutate:Create} = useCreateCategory()
    const {mutate:Update} = useUpdateCategory()
    const {mutate:Delete} = useDeleteCategory()

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <>
                    <div className="flex space-x-4">
                    <button onClick={()=>{
                        setUpdateId(record.id)
                        openUpdateModal(record)
                    }}><FaEdit /></button>
                    <button onClick={() => 
                        handleDelete(record.id)}><MdDelete /></button>
                 </div>
                </>

            ),
        },
    ];

    const onFinish = (values) => {
        console.log(values);
        Create(values, {
            onSuccess: () => {
                message.success("Success");
                setAddModal(false);
                form.resetFields()
                refetch();
            },
            onError: (error) => {
                console.log(error);
                message.error("error");
            }
        });
    };

    const openUpdateModal = (values)=>{
        updateForm.setFieldsValue({
            name:values.name,
        })
        setUpdateModal(true)
    }

    const handleUpdate = (values) => {
        console.log(values);

        const id = updateId
        console.log(id);
        

        Update({data:values,id:id},{
            onSuccess(){
                setUpdateModal(false)
                refetch()
                message.success('success')
            },
            onError: (error) => {
                console.log(error);
                message.error("error");
            }
        })
        
    }

    const handleDelete = (id) => {
        Delete(id, {
            onSuccess(){
                message.success('deleted')
                refetch()
            },
            onError(){
                message.error('failed')
            }
        })
    }
    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={data?.data} pagination={{ pageSize: 6 }}/>

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title='Create Category'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                <Form.Item>
                <Button className="w-full" htmlType="submit">Submit</Button>
                </Form.Item>
                </Form>
                
            </Modal>

            <Modal
                footer={null}
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
                title = 'Update Category'
            >
                  <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                <Form.Item>
                <Button className="w-full" htmlType="submit">Update</Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Category;