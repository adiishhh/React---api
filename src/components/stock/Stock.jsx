import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Input, Button, Select, Form, message } from "antd";
import { useState } from "react";
import { getStock } from "../../utils/stock/StockApi";
import { getProduct } from "../../utils/product/ProductApi";
import { useCreateStock, useDeleteStock, useUpdateStock } from "../../utils/stock/StockHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function Stock() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const { Option } = Select; 
    const { data, refetch } = useQuery({
        queryKey: ['getStock'],
        queryFn: getStock,
    });
    
    const { data: productData } = useQuery({
        queryKey: ['getProduct'],
        queryFn: getProduct,
    });
    

    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreateStock()
    const {mutate:Update} = useUpdateStock()
    const {mutate:Delete} = useDeleteStock()

    const stockDataWithNames = data?.data?.map(stock => {
        const product = productData?.data?.find(product => product.id === stock.product);
        return {
            ...stock,
            productName: product ? product.name : 'N/A', // Set product name based on product data
        };
    });



    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Product",
            key: "product",
            render: (text, record) => record.productName || 'N/A',  // Use the mapped product name
        },
        {
            title: "Quantity",
            key: "total_quantity",
            dataIndex: "total_quantity",
        },
        {
            title: "Price",
            key: "selling_price",
            dataIndex: "selling_price",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <div className="flex space-x-4">
                    <button onClick={() => {
                        setUpdateId(record.id);
                        openUpdateModal(record);
                    }}><FaEdit /></button>
                    <button onClick={() => handleDelete(record.id)}><MdDelete /></button>
                </div>
            ),
        },
    ];
    const onFinish = (values) => {
        console.log(values);
        Create(values, {
            onSuccess: () => {
                message.success('Success');
                setAddModal(false);
                form.resetFields();
                refetch(); // Refetch stock data to get updated quantities
            },
            onError: (error) => {
                console.log(error);
                message.error('Error');
            }
        });
    };
    const openUpdateModal = (values) => {
        updateForm.setFieldsValue({
            product: values.product,
            total_quantity: values.total_quantity,
            selling_price: values.selling_price,
        });
        setUpdateModal(true);
    };
    const handleUpdate = (values) => {
        console.log("Update values:", values); // Log the values to check
        const id = updateId;
    
        Update({ data: values, id: id }, {
            onSuccess() {
                setUpdateModal(false);
                refetch();
                message.success('success');
            },
            onError: (error) => {
                console.log(error);
                message.error("error");
            }
        });
    };
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

    const getLatestPurchaseQuantity = (productId) => {
        const stock = data?.data?.find(stock => stock.product === productId);
        return stock ? stock.total_quantity : 0; // Return the total_quantity or 0 if not found
    };

    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={stockDataWithNames} />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title = 'Create Stock'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>           
                <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
                <Select 
    placeholder="Select a product"
    onChange={(value) => {
        const selectedProduct = productData?.data?.find(product => product.id === value);
        if (selectedProduct) {
            const latestQuantity = getLatestPurchaseQuantity(selectedProduct.id); // Get the latest total_quantity
            form.setFieldsValue({ 
                selling_price: selectedProduct.price, // Set the sell price based on selected product
                total_quantity: latestQuantity // Set the total quantity based on the latest stock
            });
        }
    }}
>
        {productData?.data?.map(product => (
            <Option key={product.id} value={product.id}>{product.name}</Option>
        ))}
    </Select>
</Form.Item>
                    <Form.Item name={'total_quantity'} label='quantity' rules={[{required: true,message:'Enter quantity'}]}>

                <Input
                    placeholder="Quantity"
                   
                />
                    </Form.Item>
                    <Form.Item name={'selling_price'} label='Price' rules={[{ required: true, message: 'Enter price' }]}>
    <Input placeholder="Price" />
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
                title = 'Update Stock'
            >
                <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
                <Select 
    placeholder="Select a product"
    onChange={(value) => {
        const selectedProduct = productData?.data?.find(product => product.id === value);
        if (selectedProduct) {
            const latestQuantity = getLatestPurchaseQuantity(selectedProduct.id); // Get the latest total_quantity
            form.setFieldsValue({ 
                selling_price: selectedProduct.price, // Set the sell price based on selected product
                total_quantity: latestQuantity // Set the total quantity based on the latest stock
            });
        }
    }}
>

        {productData?.data?.map(product => (
            <Option key={product.id} value={product.id}>{product.name}</Option>
        ))}
    </Select>
</Form.Item>
                    <Form.Item name={'total_quantity'} label='quantity' rules={[{required: true,message:'Enter quantity'}]}>

                <Input
                    placeholder="Quantity"
                   
                />
                    </Form.Item>
                    <Form.Item name={'selling_price'} label='Price' rules={[{ required: true, message: 'Enter price' }]}>
    <Input placeholder="Price" />
</Form.Item>
                <Form.Item>

                <Button className="w-full" htmlType="submit">Update</Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Stock;