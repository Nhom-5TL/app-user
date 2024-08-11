import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home/Index';
import Shop from './component/Shop/Index';
import Card from './component/Card/Index';
import Test from './component/Test';
import Details from './component/Home/Product/Details';
import DangKy from './component/Home/DangKy/DangKy';
import DangNhap from './component/Home/DangKy/DangNhap';
import PaymentForm from './component/Card/PaymentForm';
// import { AuthProvider } from './component/Card/AuthContext';
import PrivateRoute from './component/Home/DangKy/PrivateRoute'; // Điều chỉnh đường dẫn nếu cần
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import TTKHH  from './component/Home/DangKy/TTKhH';
import LoadDH from './component/DonHang/LoadDH';
import CTDH from './component/DonHang/CTDH';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/card",
        element: <Card />
      },
      {
        path: "test",
        element: <Test />
      },
      {
        path: ":maSP",
        element: <Details />
      },
      {
        path: "/DangKy",
        element: <DangKy />
      },
      {
        path: "/DangNhap",
        element: <DangNhap />
      },
      {
        path: "/TTKhH",
        element: <TTKHH />
      },
      {
        path: "/loadDH",
        element: <LoadDH />
      },
      {
        path: "/loadDH/:maDH",
        element: <CTDH />
      },
      {
        path: "/PaymentForm",
        element: (
          <PrivateRoute>
            <PaymentForm />
          </PrivateRoute>
        )
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <RouterProvider router={router} />
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
    {/* </AuthProvider> */}
  </React.StrictMode>
);
