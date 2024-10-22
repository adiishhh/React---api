import { Modal, Table, Input, Button } from "antd";
import { useState } from "react";

function Customer() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [data, setData] = useState([]); 
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', place: '' }); 
    const [editingIndex, setEditingIndex] = useState(null); 

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
            render: (_, record, index) => (
                <>
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                </>
            ),
        },
    ];

    const handleCreate = () => {
        setData([...data, { ...formData, id: data.length + 1 }]);
        setFormData({ name: '', phone: '', email: '', place: '' });
        setAddModal(false);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(data[index]);
        setUpdateModal(true);
    };

    const handleUpdate = () => {
        const updatedData = [...data];
        updatedData[editingIndex] = { ...formData, id: editingIndex + 1 }; 
        setData(updatedData);
        setUpdateModal(false);
        setFormData({ name: '', phone: '', email: '', place: '' });
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={data} rowKey="id" />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
            >
                <h3>Create New Customer</h3>
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
                <Button onClick={handleCreate}>Submit</Button>
            </Modal>

            <Modal
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
                <Button onClick={handleUpdate}>Update</Button>
            </Modal>
        </div>
    );
}

export default Customer;