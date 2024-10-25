import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Input, Button, message, Form } from "antd";
import { useState } from "react";
import { getVendor } from "../../utils/vendor/VendorApi";
import { useCreateVendor, useDeleteVendor, useUpdateVendor } from "../../utils/vendor/VendorHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Vendor() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const {data, refetch} = useQuery({
        queryKey:['getVendor'],
        queryFn: getVendor
    })
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreateVendor()
    const {mutate:Update} = useUpdateVendor()
    const {mutate:Delete} = useDeleteVendor()

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
            title: "Phone",
            key: "phone",
            dataIndex: "phone",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
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
            phone:values.phone,
            email:values.email,
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
            <Table columns={columns} dataSource={data?.data} />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title='Create Vendor'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                    <Form.Item name={'phone'} label='phone' rules={[{required: true,message:'Enter phone'}]}>

                <Input
                    placeholder="Phone"
                   
                />
                    </Form.Item>
                    <Form.Item name={'email'} label='email' rules={[{required: true,message:'Enter email'}]}>

                <Input
                    placeholder="Email"
                   
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
                title = 'Update Vendor'
            >
                  <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                    <Form.Item name={'phone'} label='phone' rules={[{required: true,message:'Enter phone'}]}>

                <Input
                    placeholder="Phone"
                   
                />
                    </Form.Item>
                    <Form.Item name={'email'} label='email' rules={[{required: true,message:'Enter email'}]}>

                <Input
                    placeholder="Email"
                   
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

export default Vendor;