import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';
import { Sp } from '../api/SanPhams';

const Index = () => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Khai báo useNavigate

  useEffect(() => {
    const fetchSanPhams = async () => {
      try {
        const response = await axios.get<Sp[]>(
          `https://localhost:7095/api/GioHangs`
        );
        setSanPhams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchSanPhams();
  }, []);

  const handlePurchase = () => {
    console.log('SanPham Data:', sansp);
    const invalidItems = sansp.filter(item => !item.maSP || item.maSP === undefined);

  if (invalidItems.length > 0) {
    setError('Một số sản phẩm có ID không hợp lệ hoặc bị thiếu.');
    return;
  }
    // Chuyển hướng đến trang thanh toán với dữ liệu giỏ hàng
    navigate('/PaymentForm', { state: { cartItems: sansp } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container mt-5">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">Shopping Cart</span>
        </div>
      </div>
      <form className="bg0 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      <tr className="table_head">
                        <th className="column-1">Sản Phẩm</th>
                        <th className="column-2" />
                        <th className="column-3">Size</th>
                        <th className="column-3">Giá</th>
                        <th className="column-4">Số Lượng</th>
                        <th className="column-5">Tổng Tiền</th>
                      </tr>
                      {sansp.map((item, key) => (
                        <tr className="table_row" key={key}>
                          <td className="column-1">
                            <div className="how-itemcart1">
                              <img src={LinkImg + item.hinhAnh}  alt="IMG" />
                            </div>
                          </td>
                          <td className="column-2">{item.tenSP}</td>
                          <td className="column-2">{item.tenKT}</td>
                          <td className="column-3">{item.gia} ₫</td>
                          <td className="column-4">
                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                              <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </div>
                              <input className="mtext-104 cl3 txt-center num-product" type="text" name="num-product1" defaultValue={item.soLuong} />
                              <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-plus" />
                              </div>
                            </div>
                          </td>
                          <td className="column-5">{item.gia * item.soLuong} ₫</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5">
                    <input className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="coupon" placeholder="Mã Giảm Giá" />
                    <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">Xác nhận</div>
                  </div>
                  <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10" onClick={handlePurchase}>Mua Ngay</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Index;
