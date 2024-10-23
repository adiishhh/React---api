import { Modal, Table, Input, Button, Select } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";


Purchase.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAddPurchase: PropTypes.func.isRequired, // Add this line
    vendor: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })
    ).isRequired, // Add this line
};


function Purchase({ categories = [], onAddPurchase, vendor = [] }) { // Correct destructuring
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [data, setData] = useState([]); 
    const [formData, setFormData] = useState({ product: '',name: '',vendor: '',unit: '', price: '' }); 
    const [editingIndex, setEditingIndex] = useState(null); 

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Product",
            key: "product",
            dataIndex: "product",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Vendor",
            key: "vendor",
            dataIndex: "vendor",
        },
        {
            title: "Unit",
            key: "unit",
            dataIndex: "unit",
        },
        {
            title: "Price",
            key: "price",
            dataIndex: "price",
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
        const newPurchase = { ...formData, id: data.length + 1 };
        setData([...data, newPurchase]);
        onAddPurchase(newPurchase); // Notify the parent about the new purchase
        setFormData({ product: '', name: '', vendor: '', unit: '', price: '' });
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
        onAddPurchase(updatedData[editingIndex]); // Notify the parent about the updated purchase
        setUpdateModal(false);
        setFormData({ product: '', name: '',vendor: '',unit: '', price: '' });
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
                <h3>Create New Purchase</h3>
                <Select
                    placeholder="Select Product"
                    value={formData.product}
                    onChange={(value) => setFormData({ ...formData, product: value })}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {categories.map(category => (
                        <Select.Option key={category.id} value={category.name}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Select
                    placeholder="Select Vendor"
                    value={formData.vendor}
                    onChange={(value) => setFormData({ ...formData, vendor: value })}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {vendor.map(vendor => (
                        <Select.Option key={vendor.id} value={vendor.name}>
                            {vendor.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input
                    placeholder="Unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Button onClick={handleCreate}>Submit</Button>
            </Modal>

            <Modal
                footer={null}
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
            >
                <h3>Edit Purchase</h3>
                <Select
                    placeholder="Select Product"
                    value={formData.product}
                    onChange={(value) => setFormData({ ...formData, product: value })}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {categories.map(category => (
                        <Select.Option key={category.id} value={category.name}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Select
                    placeholder="Select Vendor"
                    value={formData.vendor}
                    onChange={(value) => setFormData({ ...formData, vendor: value })}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {vendor.map(vendor => (
                        <Select.Option key={vendor.id} value={vendor.name}>
                            {vendor.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input
                    placeholder="Unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Button onClick={handleUpdate}>Update</Button>
                </Modal>
                </div>
    );
}
export default Purchase;