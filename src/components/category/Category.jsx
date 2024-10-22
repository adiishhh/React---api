import { Modal, Table, Input, Button } from "antd";
import { useState } from "react";

function Category() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [data, setData] = useState([]); 
    const [formData, setFormData] = useState({ name: '' }); 
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
        setFormData({ name: '' });
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
        setFormData({ name: '' });
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
                <h3>Create New Category</h3>
                <Input
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Button onClick={handleCreate}>Submit</Button>
            </Modal>

            <Modal
                footer={null}
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
            >
                <h3>Edit Category</h3>
                <Input
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Button onClick={handleUpdate}>Update</Button>
            </Modal>
        </div>
    );
}

export default Category;