import { useQuery } from "@tanstack/react-query";
import { Table, Button } from "antd";
import { getSaleItems } from "../../utils/SaleItem/SaleItemApi";


function SaleItem() {
    const { data: saleItemsData, refetch } = useQuery({
        queryKey: ['getSaleItems'],
        queryFn: getSaleItems,
        onSuccess: (data) => {
            console.log("Sale Items Data:", data); // Log the entire response
        },
    });

    // Map the sale items data to extract the needed fields
    const saleItemData = Array.isArray(saleItemsData?.data) ? saleItemsData.data.map(item => ({
        id: item.id,
        customerName: item.customerName,
        employeeName: item.employeeName,
        productName: item.productName,
        quantity: item.quantity,
    })) : [];

    const columns = [
        {
            title: 'Sale Info',
            key: 'sales_form',
            render: (text, record) => (
                <span>
                    {record.customerName} - {record.employeeName}
                </span>
            ),
        },
        {
            title: 'Product',
            key: 'product',
            render: (text, record) => record.productName,
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (text, record) => record.quantity,
        },
    ];

    return (
        <div>
            <Button onClick={refetch}>Refresh</Button>
            <Table columns={columns} dataSource={saleItemData} pagination={{ pageSize: 6 }} rowKey="id" />
        </div>
    );
}

export default SaleItem;