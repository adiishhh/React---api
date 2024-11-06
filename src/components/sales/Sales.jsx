import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useState } from "react";
import { getSales } from "../../utils/sales/SalesApi";
import { getCustomer } from "../../utils/customer/CustomerApi";
import { getEmployee } from "../../utils/employee/EmployeeApi";
import { useCreateSales, useDeleteSales, useUpdateSales } from "../../utils/sales/SalesHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getProduct } from "../../utils/product/ProductApi";

function Sales() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState();
    const { Option } = Select;

    const { data: salesData, refetch } = useQuery({
        queryKey: ['getSales'],
        queryFn: getSales,
    });

    const { data: customerData } = useQuery({
        queryKey: ['getCustomer'],
        queryFn: getCustomer,
    });

    const { data: employeeData } = useQuery({
        queryKey: ['getEmployee'],
        queryFn: getEmployee,
    });

    const { data: productData } = useQuery({
        queryKey: ['getProduct'],
        queryFn: getProduct,
    });

    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    const { mutate: Create } = useCreateSales();
    const { mutate: Update } = useUpdateSales();
    const { mutate: Delete } = useDeleteSales();

    const salesDataWithNames = Array.isArray(salesData) ? salesData.map(sales => {
        const customer = customerData?.data?.find(customer => customer.id === sales.customer);
        const employee = employeeData?.data?.find(employee => employee.id === sales.employee);
        const product = productData?.data?.find(product => product.id === sales.product);
        return {
            ...sales,
            customerName: customer ? customer.name : 'N/A',
            employeeName: employee ? employee.name : 'N/A',
            productName: product ? product.name : 'N/A',
        };
    }) : [];

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Customer",
            key: "customer",
            render: (text, record) => record.customerName,
        },
        {
            title: "Employee",
            key: "employee",
            render: (text, record) => record.employeeName,
        },
        {
            title: "Total amount",
            key: "total_amount",
            dataIndex: "total_amount",
        },
        {
            title: "Type",
            key: "type",
            dataIndex: "type",
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
        const saleData = {
            customer: values.customer,
            employee: values.employee,
            total_amount: values.total_amount,
            type: values.type,
            product: values.product,
            quantity: values.quantity,
        };
    
        console.log("Sale Data:", saleData); 
        Create(saleData, {
            onSuccess: () => {
                message.success('Success');
                refetch();
                setAddModal(false);
                form.resetFields();
            },
            onError: () => {
                message.error('Error');
            },
        });
    };

    const openUpdateModal = (values) => {
        updateForm.setFieldsValue({
            customer: values.customer,
            employee: values.employee,
            product: values.product,
            quantity: values.quantity,
            total_amount: values.total_amount,
            type: values.type,
        });
        setUpdateModal(true);
    };

    const handleUpdate = async (values) => {
        const id = updateId;
        try {
            await Update({ data: values, id: id });
            setUpdateModal(false);
            refetch();
            message.success('Updated');
        } catch (error) {
            console.log(error);
            message.error("Error");
        }
    };


    


    const handleDelete = (id) => {
        console.log("Deleting ID:", id);
        Delete(id, {  
            onSuccess() {
                message.success('Deleted');
                refetch();  
            },
            onError(error) {
                message.error('Failed');
                console.log(error);
            }
        });
    };

    

    

    return (
        <div>
            <Button onClick={() => setAddModal(true)}>Create</Button>
            <Table columns={columns} dataSource={salesDataWithNames} />

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title='Create Sales'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name={'customer'} label='Customer' rules={[{ required: true, message: 'Select Customer' }]}>
                        <Select placeholder="Select Customer">
                            {customerData?.data?.map(customer => (
                                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'employee'} label='Employee' rules={[{ required: true, message: 'Select employee' }]}>
                        <Select placeholder="Select employee">
                            {employeeData?.data?.map(employee => (
                                <Option key={employee.id} value={employee.id}>{employee.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
                <Select 
    placeholder="Select a product"
    onChange={(value) => {
        const selectedProduct = productData?.data?.find(product => product.id === value);
        if (selectedProduct) {
            form.setFieldsValue({ 
                sell: selectedProduct.price 
            });
            const quantity = form.getFieldValue('quantity') || 0; 
            const totalAmount = selectedProduct.price * quantity;
            form.setFieldsValue({ total_amount: totalAmount }); 
        }
    }}
>
        {productData?.data?.map(product => (
            <Option key={product.id} value={product.id}>{product.name}</Option>
        ))}
    </Select>
</Form.Item>
<Form.Item name={'quantity'} label='Quantity' rules={[{ required: true, message: 'Enter quantity' }]}>
    <Input
        placeholder="Quantity"
        onChange={(e) => {
            const quantity = e.target.value; 
            const sellingPrice = form.getFieldValue('sell'); 
            const totalAmount = sellingPrice * quantity; 
            form.setFieldsValue({ total_amount: totalAmount }); 
        }}
    />
</Form.Item>
                    <Form.Item name={'total_amount'} label='Total amount' rules={[{ required: true, message: 'Enter Total amount' }]}>
                        <Input placeholder="Total amount" />
                    </Form.Item>
                    <Form.Item name={'type'} label='Type' rules={[{ required: true, message: 'Select type' }]}>
                        <Select placeholder='Select Type'>
                            <Option value="Cash">Cash</Option>
                            <Option value="Online">Online</Option>
                        </Select>
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
                title='Update Sales'
            >
                <Form layout="vertical" onFinish={handleUpdate} form={updateForm}>
                    <Form.Item name={'customer'} label='Customer' rules={[{ required: true, message: 'Select Customer' }]}>
                        <Select placeholder="Select Customer">
                            {customerData?.data?.map(customer => (
                                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'employee'} label='Employee' rules={[{ required: true, message: 'Select employee' }]}>
                        <Select placeholder="Select employee">
                            {employeeData?.data?.map(employee => (
                                <Option key={employee.id} value={employee.id}>{employee.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'product'} label='Product' rules={[{ required: true, message: 'Select product' }]}>
                <Select 
    placeholder="Select a product"
    onChange={(value) => {
        const selectedProduct = productData?.data?.find(product => product.id === value);
        if (selectedProduct) {
            form.setFieldsValue({ 
                sell: selectedProduct.price 
            });
            const quantity = form.getFieldValue('quantity') || 0; 
            const totalAmount = selectedProduct.price * quantity;
            form.setFieldsValue({ total_amount: totalAmount });
        }
    }}
>
        {productData?.data?.map(product => (
            <Option key={product.id} value={product.id}>{product.name}</Option>
        ))}
    </Select>
</Form.Item>
<Form.Item name={'quantity'} label='Quantity' rules={[{ required: true, message: 'Enter quantity' }]}>
    <Input
        placeholder="Quantity"
        onChange={(e) => {
            const quantity = e.target.value;
            const sellingPrice = form.getFieldValue('sell'); 
            const totalAmount = sellingPrice * quantity; 
            form.setFieldsValue({ total_amount: totalAmount });
        }}
    />
</Form.Item>
                    <Form.Item name={'total_amount'} label='Total amount' rules={[{ required: true, message: 'Enter Total amount' }]}>
                        <Input placeholder="Total amount" />
                    </Form.Item>
                    <Form.Item name={'type'} label='Type' rules={[{ required: true, message: 'Select type' }]}>
                        <Select placeholder='Select Type'>
                            <Option value="Cash">Cash</Option>
                            <Option value="Online">Online</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button className="w-full" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Sales;
