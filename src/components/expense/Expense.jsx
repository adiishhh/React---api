import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getExpense } from "../../utils/expense/ExpenseApi";
import { useCreateExpense, useDeleteExpense, useUpdateExpense } from "../../utils/expense/ExpenseHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button, Form, Input, message, Modal, Table } from "antd";


function Expense() {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState()
    const { data, refetch } = useQuery({
        queryKey: ['getExpense'],
        queryFn: getExpense,
        onSuccess: (data) =>{
            console.log(data)
        }
    })

    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const {mutate:Create} = useCreateExpense()
    const {mutate:Update} = useUpdateExpense()
    const {mutate:Delete} = useDeleteExpense()

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Expense",
            key: "expense",
            dataIndex: "expense",
        },
        {
            title: "Amount",
            key: "amount",
            dataIndex: "amount",
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
    const openUpdateModal = (values)=>{
        updateForm.setFieldsValue({
            name:values.name,
        })
        setUpdateModal(true)
    }

    const handleUpdate = (values) => {
        console.log(values);

        const id = updateId
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
            <Table columns={columns} dataSource={data?.data} pagination={{ pageSize: 6 }}/>

            <Modal
                footer={null}
                open={addModal}
                onCancel={() => setAddModal(false)}
                title = 'Create Expense'
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name={'expense'} label='Expense' rules={[{required: true,message:'Enter Expense'}]}>

                <Input
                    placeholder="Expense"
                   
                />
                    </Form.Item>
                    <Form.Item name={'amount'} label='Amount' rules={[{required: true,message:'Enter Amount'}]}>

                <Input
                    placeholder="Amount"
                   
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
    title='Update expense'
>
    <Form layout="vertical" onFinish={handleUpdate} form={updateForm}> 
    <Form.Item name={'expense'} label='Expense' rules={[{required: true,message:'Enter Expense'}]}>

<Input
    placeholder="Expense"
   
/>
    </Form.Item>
    <Form.Item name={'amount'} label='Amount' rules={[{required: true,message:'Enter Amount'}]}>

<Input
    placeholder="Amount"
   
/>
    </Form.Item>
<Form.Item>
            <Button className="w-full" htmlType="submit">Update</Button>
        </Form.Item>
    </Form>
</Modal>
    </div>
  )
}

export default Expense
