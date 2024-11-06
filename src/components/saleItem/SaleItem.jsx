import { useQuery } from "@tanstack/react-query";
import { Table, Button } from "antd";
import { getSales } from "../../utils/sales/SalesApi";

function SaleItem() {
    const { data: salesData, refetch } = useQuery({
        queryKey: ['getSales'],
        queryFn: getSales,
        onSuccess: (data) => console.log("Sales Data:", data),
    });

   
    const saleItemData = Array.isArray(salesData) ? salesData.map(sale => ({
        id: sale.id,
        customerName: sale.customerName,
        employeeName: sale.employeeName,
        productName: sale.productName, 
        quantity: sale.quantity,
    })) : [];

    const columns = [
        {
            title: 'Sale Info',
            key: 'saleInfo',
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
            <Table columns={columns} dataSource={saleItemData} rowKey="id" />
        </div>
    );
}

export default SaleItem;