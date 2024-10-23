import { Modal, Table, Input, Button, Select } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

Stock.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

function Stock({ categories = [] }) {
    const [addModal, setAddModal] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ product: '', quantity: '', price: '' });

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
            title: "Quantity",
            key: "quantity",
            dataIndex: "quantity",
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
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                </>
            ),
        },
    ];

    const handleCreate = () => {
        setData([...data, { ...formData, id: data.length + 1 }]);
        setFormData({ product: '', quantity: '', price: '' });
        setAddModal(false);
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
                <h3>Create New Stock</h3>
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
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
        </div>
    );
}

export default Stock;