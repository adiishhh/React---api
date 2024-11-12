import { Modal, Table, Input, Button, Select, Form, message } from "antd";
import { useState } from "react";
// import PropTypes from "prop-types";
import { getPurchase } from "../../utils/purchase/PurchaseApi";
import { useCreatePurchase, useDeletePurchase, useUpdatePurchase } from "../../utils/purchase/PurchaseHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getVendor } from "../../utils/vendor/VendorApi";
import { getProduct } from "../../utils/product/ProductApi";



function Purchase() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const { Option } = Select; 
    const { data, refetch } = useQuery({
        queryKey: ['getPurchase'],
        queryFn: getPurchase,
    });
    
    const { data: productData } = useQuery({
        queryKey: ['getProduct'],
        queryFn: getProduct,
    });
    
    const { data: vendorsData } = useQuery({
        queryKey: ['getVendor'],
        queryFn: getVendor,
    });

    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreatePurchase()
    const {mutate:Update} = useUpdatePurchase()
    const {mutate:Delete} = useDeletePurchase()

    const purchaseDataWithNames = data?.data?.map(purchase => {
        const vendor = vendorsData?.data?.find(vendor => vendor.id === purchase.vendor);
        const product = productData?.data?.find(product => product.id === purchase.product);
        return {
            ...purchase,
            vendorName: vendor ? vendor.name : 'N/A', // Set vendor name based on vendor data
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
            title: "Bill Number",
            key: "bill",
            dataIndex: "bill",
        },
        {
            title: "Product",
            key: "product",
            render: (text, record) => record.productName || 'N/A',  // Use the mapped product name
        },
        {
            title: "Vendor",
            key: "vendor",
            render: (text, record) => record.vendorName || 'N/A',  // Use the mapped vendor name
        },
        {
            title: "Quantity",
            key: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Buy Price",
            key: "buy",
            dataIndex: "buy",
        },
        {
            title: "Type",
            key: "type",
            dataIndex: "type",
        },
        {
            title: "Sell Price",
            key: "sell",
            dataIndex: "sell",
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
                refetch()
            },
            onError: (error) => {
                console.log(error);
                message.error('Error');
            }
        });
    };
    const openUpdateModal = (values) => {
        updateForm.setFieldsValue({
            bill: values.bill,
            product: values.product,
            vendor: values.vendor, // Ensure this is the ID, not the name
            quantity: values.quantity,
            buy: values.buy,
            type: values.type,
            sell: values.sell,
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

    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={purchaseDataWithNames} pagination={{ pageSize: 6 }}/>

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title = 'Create Purchase'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item name={'bill'} label='Bill' rules={[{required: true,message:'Enter bill number'}]}>

                <Input
                    placeholder="Bill Number"
   
                />
                </Form.Item>                   
                <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
    <Select 
        placeholder="Select a product"
        onChange={(value) => {
            const selectedProduct = productData?.data?.find(product => product.id === value);
            if (selectedProduct) {
                form.setFieldsValue({ sell: selectedProduct.price }); // Set the sell price based on selected product
            }
        }}
    >
        {productData?.data?.map(product => (
            <Option key={product.id} value={product.id}>{product.name}</Option>
        ))}
    </Select>
</Form.Item>
<Form.Item name={'vendor'} label='Vendor' rules={[{ required: true, message: 'Select vendor' }]}>
    <Select placeholder="Select a vendor">
        {vendorsData?.data?.map(vendor => (
            <Option key={vendor.id} value={vendor.id}>{vendor.name}</Option> // Use vendor.id as value
        ))}
    </Select>
</Form.Item>
                    <Form.Item name={'quantity'} label='quantity' rules={[{required: true,message:'Enter quantity'}]}>

                <Input
                    placeholder="Quantity"
                   
                />
                    </Form.Item>
                    <Form.Item name={'buy'} label='Buy Price' rules={[{ required: true, message: 'Enter buy price' }]}>
    <Input placeholder="Buy Price" />
</Form.Item>
                    <Form.Item name={'type'} label='Type' rules={[{ required: true, message: 'Select type' }]}>
    <Select placeholder='Select Type'>
        <Option value="Cash">Cash</Option>
        <Option value="Online">Online</Option>
    </Select>
</Form.Item>
                    <Form.Item name={'sell'} label='Sell Price' rules={[{ required: true, message: 'Enter sell price' }]}>
    <Input placeholder="Sell Price" />
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
                title = 'Update Purchase'
            >
                <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                <Form.Item name={'bill'} label='Bill' rules={[{ required: true, message: 'Enter bill number' }]}>
            <Input placeholder="Bill Number" />
        </Form.Item>
        <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
            <Select 
                placeholder="Select a product"
                onChange={(value) => {
                    const selectedProduct = productData?.data?.find(product => product.id === value);
                    if (selectedProduct) {
                        updateForm.setFieldsValue({ sell: selectedProduct.price }); // Set the sell price based on selected product
                    }
                }}
            >
                {productData?.data?.map(product => (
                    <Option key={product.id} value={product.id}>{product.name}</Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item name={'vendor'} label='Vendor' rules={[{ required: true, message: 'Select vendor' }]}>
            <Select placeholder="Select a vendor">
                {vendorsData?.data?.map(vendor => (
                    <Option key={vendor.id} value={vendor.id}>{vendor.name}</Option> // Use vendor.id as value
                ))}
            </Select>
        </Form.Item>
                    <Form.Item name={'quantity'} label='quantity' rules={[{required: true,message:'Enter quantity'}]}>

                <Input
                    placeholder="Quantity"
                   
                />
                    </Form.Item>
                    <Form.Item name={'buy'} label='Buy Price' rules={[{required: true,message:'Enter buy price'}]}>

                <Input
                    placeholder="Buy Price"
                   
                />
                    </Form.Item>
                    <Form.Item name={'type'} label='Type' rules={[{ required: true, message: 'Select type' }]}>
    <Select placeholder='Select Type'>
        <Option value="Cash">Cash</Option>
        <Option value="Online">Online</Option>
    </Select>
</Form.Item>
                    <Form.Item name={'sell'} label='Sell Price' rules={[{ required: true, message: 'Enter sell price' }]}>
    <Input placeholder="Sell Price" />
</Form.Item>
                <Form.Item>

                <Button className="w-full" htmlType="submit">Update</Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default Purchase;