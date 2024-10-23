import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Input, Button, Form, message } from "antd";
import { useState } from "react";
import { getCustomer } from "../../utils/customer/CustomerApi";
import { useCreateCustomer } from "../../utils/customer/CustomerHook";

function Customer() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const {data, refetch} = useQuery({
        queryKey: ['getCustomer'],
        queryFn: getCustomer,
    })
    const [form] = Form.useForm()

    const {mutate:Create} = useCreateCustomer()

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
                    {/* <Button onClick={() => handleEdit(index)}>Edit</Button>
                    <Button onClick={() => handleDelete(index)}>Delete</Button> */}
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
                message.error("Failed");
            }
        });
    };

    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={data?.data} />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title='Create New Customer'
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

            {/* <Modal
                footer={null}
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
            >
                <h3>Edit Customer</h3>
                <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    placeholder="Place"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Button>Update</Button>
            </Modal> */}
        </div>
    );
}

export default Customer;