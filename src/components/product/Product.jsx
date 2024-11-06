import { Modal, Table, Input, Button, Select, Form, message } from "antd";
import { useState } from "react";
// import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../utils/category/CategoryApi";
import { getProduct } from "../../utils/product/ProductApi";
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from "../../utils/product/ProductHook";



function Product() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const { Option } = Select; 
    const { data, refetch } = useQuery({
        queryKey: ['getProduct'],
        queryFn: getProduct,
        onSuccess: (data) => {
            console.log(data);  // Log the data to check its structure
        },
    });
    
    const { data: categoriesData } = useQuery({
        queryKey: ['getCategory'],
        queryFn: getCategory,
    });
    

    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreateProduct()
    const {mutate:Update} = useUpdateProduct()
    const {mutate:Delete} = useDeleteProduct()



    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Category",
            key: "product",
            render: (text, record) => record.product?.name || 'N/A',  // Use optional chaining to avoid errors
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Price",
            key: "price",
            dataIndex: "price",
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
        console.log("Opening update modal with values:", values);  // Debugging line
        updateForm.setFieldsValue({
            product: values.product,  // Assuming values.product is the ID directly
            name: values.name,
            price: values.price,
        });
        setUpdateModal(true);
    }
    const handleUpdate = (values) => {
        console.log("Updating with values:", values); // Log the values object
    
        const id = updateId; // The ID of the product being updated
    
        // Prepare the data to send to the API
        const dataToUpdate = {
            name: values.name,
            price: values.price,
            product: values.product.id, // Ensure this is the ID
        };
    
        console.log("Data to update:", dataToUpdate); // Log the data being sent
    
        Update({ data: dataToUpdate, id: id }, {
            onSuccess() {
                setUpdateModal(false);
                refetch();
                message.success('Update successful');
            },
            onError: (error) => {
                console.log(error);
                message.error("Update failed");
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
            <Table columns={columns} dataSource={data?.data} />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title = 'Create Product'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item name={'product'} label='Category' rules={[{ required: true, message: 'Select category' }]}>
                <Select placeholder="Select a category">
                {categoriesData?.data?.map(category => (
                 <Option key={category.id} value={category.id}>{category.name}</Option>  // Use category.id as value
                ))}
                 </Select>
                </Form.Item>
                    <Form.Item name={'name'} label='Name' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                    <Form.Item name={'price'} label='Price' rules={[{required: true,message:'Enter price'}]}>

                <Input
                    placeholder="Price"
                   
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
    title='Update Product'
>
    <Form layout="vertical" onFinish={handleUpdate} form={updateForm}> 
        <Form.Item name={'product'} label='Category' rules={[{ required: true, message: 'Select category' }]}>
            <Select placeholder="Select a category">
                {categoriesData?.data?.map(category => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item name={'name'} label='Name' rules={[{ required: true, message: 'Enter name' }]}>
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name={'price'} label='Price' rules={[{ required: true, message: 'Enter price' }]}>
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
export default Product;