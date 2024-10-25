import { Modal, Table, Input, Button, Select, Form, message } from "antd";
import { useState } from "react";
// import PropTypes from "prop-types";
import { getPurchase } from "../../utils/purchase/PurchaseApi";
import { useCreatePurchase, useDeletePurchase, useUpdatePurchase } from "../../utils/purchase/PurchaseHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../utils/category/CategoryApi";
import { getVendor } from "../../utils/vendor/VendorApi";



function Purchase() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const { Option } = Select; 
    const { data, refetch } = useQuery({
        queryKey: ['getPurchase'],
        queryFn: getPurchase,
    });
    
    const { data: categoriesData } = useQuery({
        queryKey: ['getCategory'],
        queryFn: getCategory,
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
    const openUpdateModal = (values)=>{
        updateForm.setFieldsValue({
            product:values.product,
            name:values.name,
            vendor:values.vendor,
            unit:values.unit,
            price:values.price,

        })
        setUpdateModal(true)
    }
    const handleUpdate = (values) => {
        const id = updateId
        console.log(values);
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
                title = 'Create Purchase'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
                    <Select placeholder="Select a product">
                    {categoriesData?.data?.map(category => (
                    <Option key={category.id} value={category.name}>{category.name}</Option>
                    ))}
                    </Select>
                    </Form.Item>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"
                   
                />
                    </Form.Item>
                    <Form.Item name={'vendor'} label='Vendor' rules={[{ required: true, message: 'Select vendor' }]}>
                        <Select placeholder="Select a vendor">
                        {vendorsData?.data?.map(vendor => (
                        <Option key={vendor.id} value={vendor.name}>{vendor.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'unit'} label='unit' rules={[{required: true,message:'Enter unit'}]}>

                <Input
                    placeholder="Unit"
                   
                />
                    </Form.Item>
                    <Form.Item name={'price'} label='price' rules={[{required: true,message:'Enter price'}]}>

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
                title = 'Update Employee'
            >
                <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                <Form.Item name={'product'} label='product' rules={[{required: true,message:'Select product'}]}>

                <Input
                    placeholder="Product"

                />
                    </Form.Item>
                    <Form.Item name={'name'} label='NAME' rules={[{required: true,message:'Enter name'}]}>

                <Input
                    placeholder="Name"

                />
                    </Form.Item>
                    <Form.Item name={'vendor'} label='vendor' rules={[{required: true,message:'Select vendor'}]}>

                <Input
                    placeholder="Vendor"

                />
                    </Form.Item>
                    <Form.Item name={'unit'} label='unit' rules={[{required: true,message:'Enter unit'}]}>

                <Input
                    placeholder="Unit"

                />
                    </Form.Item>
                    <Form.Item name={'price'} label='price' rules={[{required: true,message:'Enter price'}]}>

                <Input
                    placeholder="Price"

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
export default Purchase;