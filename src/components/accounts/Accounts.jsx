import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { getExpense } from "../../utils/expense/ExpenseApi";
import { getSales } from "../../utils/sales/SalesApi";
import { getPurchase } from "../../utils/purchase/PurchaseApi";

function Accounts() {
    // Fetch data from Expense, Sales, and Purchase APIs
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

    // Prepare the data for the table
    const accountData = [];

    // Add expenses to account data
    if (Array.isArray(expenseData?.data)) {
        expenseData.data.forEach(item => {
            accountData.push({
                id: item.id, // Assuming each expense has a unique ID
                debit: item.amount, // Amount from Expense
                credit: 0,
                type: 'Expense',
            });
        });
    }

    // Add sales to account data
    if (Array.isArray(salesData?.data)) {
        salesData.data.forEach(item => {
            accountData.push({
                id: item.id, // Assuming each sale has a unique ID
                debit: 0,
                credit: item.total_amount, // Total amount from Sales
                type: 'Sale',
            });
        });
    }

    // Add purchases to account data
    if (Array.isArray(purchaseData?.data)) {
        purchaseData.data.forEach(item => {
            accountData.push({
                id: item.id, // Assuming each purchase has a unique ID
                debit: item.buy, // Buy Price from Purchase
                credit: 0,
                type: 'Purchase',
            });
        });
    }

    const columns = [
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
            <Button onClick={() => { refetch }}>Refresh</Button>
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