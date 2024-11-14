import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { getExpense } from "../../utils/expense/ExpenseApi";
import { getSales } from "../../utils/sales/SalesApi";
import { getPurchase } from "../../utils/purchase/PurchaseApi";

function Accounts() {
    const { data: expenseData, refetch } = useQuery({
        queryKey: ['getExpense'],
        queryFn: getExpense,
    });

    const { data: salesData } = useQuery({
        queryKey: ['getSales'],
        queryFn: getSales,
    });

    const { data: purchaseData } = useQuery({
        queryKey: ['getPurchase'],
        queryFn: getPurchase,
    });

    const accountData = [];

    // Process expense data
    if (Array.isArray(expenseData?.data)) {
        expenseData.data.forEach(item => {
            accountData.push({
                id: item.id,
                debit: item.amount, 
                credit: 0,
                type: 'Expense',
            });
        });
    }

    // Process sales data
    if (Array.isArray(salesData?.data)) {
        salesData.data.forEach(item => {
            accountData.push({
                id: item.id, 
                debit: 0,
                credit: item.total_amount,
                type: item.type, 
            });
        });
    }

    // Process purchase data
    if (Array.isArray(purchaseData?.data)) {
        purchaseData.data.forEach(item => {
            // Calculate debit as buy price multiplied by quantity
            const debitAmount = item.buy * item.quantity; // Ensure item.quantity is available
            accountData.push({
                id: item.id, 
                debit: debitAmount, // Use the calculated debit amount
                credit: 0,
                type: item.type,
            });
        });
    }

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: 'Debit',
            dataIndex: 'debit',
            key: 'debit',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <span>{text}</span>,
        },
    ];

    return (
        <div>
            <Button onClick={() => refetch()}>Refresh</Button>
            <Table 
                columns={columns} 
                dataSource={accountData} 
                pagination={{ pageSize: 6 }} 
                rowKey="id" 
            />
        </div>
    );
}

export default Accounts;