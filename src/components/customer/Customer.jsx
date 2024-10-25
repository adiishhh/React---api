import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Input, Button, Form, message } from "antd";
import { useState } from "react";
import { getCustomer } from "../../utils/customer/CustomerApi";
import { useCreateCustomer, useDeleteCustomer, useUpdateCustomer } from "../../utils/customer/CustomerHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Customer() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const {data, refetch} = useQuery({
        queryKey: ['getCustomer'],
        queryFn: getCustomer,
    })
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreateCustomer()
    const {mutate:update} = useUpdateCustomer()
    const {mutate:Delete} = useDeleteCustomer()

console.log({data});



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
            title: "Place",
            key: "place",
            dataIndex: "place",
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

    // const handleCreate = () => {
    //     setData([...data, { ...formData, id: data.length + 1 }]);
    //     setFormData({ name: '', phone: '', email: '', place: '' });
    //     setAddModal(false);
    // };

    // const handleEdit = (index) => {
    //     setEditingIndex(index);
    //     setFormData(data[index]);
    //     setUpdateModal(true);
    // };

    // const handleUpdate = () => {
    //     const updatedData = [...data];
    //     updatedData[editingIndex] = { ...formData, id: editingIndex + 1 }; 
    //     setData(updatedData);
    //     setUpdateModal(false);
    //     setFormData({ name: '', phone: '', email: '', place: '' });
    // };

    // const handleDelete = (index) => {
    //     const updatedData = data.filter((_, i) => i !== index);
    //     setData(updatedData);
    // };

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
            place:values.place,

        })
        setUpdateModal(true)
    }

    const handleUpdate = (values) => {
        console.log(values);

        const id = updateId
        console.log(id);
        

        update({data:values,id:id},{
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
                title='Create Customer'
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
                    <Form.Item name={'place'} label='place' rules={[{required: true,message:'Enter place'}]}>

                <Input
                    placeholder="Place"
                   
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
                title = 'Update Customer'
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
                    <Form.Item name={'place'} label='place' rules={[{required: true,message:'Enter place'}]}>

                <Input
                    placeholder="Place"
                   
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

export default Customer;