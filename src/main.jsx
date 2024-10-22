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
        path: '/purchase',
        element: <PurchasePage/>
      },
    ]  
  },
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);