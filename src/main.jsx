import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import CustomerPage from './pages/CustomerPage.jsx'; 
import VendorPage from './pages/VendorPage.jsx';
import EmployeePage from './pages/EmployeePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';
import StockPage from './pages/StockPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductPage from './pages/ProductPage.jsx';
import SalesPage from './pages/SalesPage.jsx';
import SaleItemPage from './pages/SaleItemPage.jsx';
import ExpensePage from './pages/ExpensePage.jsx';
import AccountsPage from './pages/AccountsPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/customer',
        element: <CustomerPage />, 
      },
      {
        path: '/vendor',
        element: <VendorPage/>
      },
      {
        path: '/employee',
        element: <EmployeePage/>
      },
      {
        path: '/category',
        element: <CategoryPage/>
      },
      {
        path: '/product',
        element: <ProductPage/>
      },
      {
        path: '/purchase',
        element: <PurchasePage/>
      },
      {
        path: '/stock',
        element: <StockPage/>
      },
      {
        path: '/sales',
        element: <SalesPage/>
      },
      {
        path: '/saleItem',
        element: <SaleItemPage/>
      },
      {
        path: '/expense',
        element: <ExpensePage/>
      },
      {
        path: '/accounts',
        element: <AccountsPage/>
      },
    ]  
  },
 
]);

const querClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={querClient}>

    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);