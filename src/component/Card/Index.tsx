import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sp } from "../api/SanPhams";

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/";

const Index = () => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSanPhams = async () => {
      try {
        const maKH = localStorage.getItem("maKH");
        if (!maKH) {
          return;
        }

        const response = await axios.get<Sp[]>(
          `https://localhost:7095/api/GioHangs/MaKH/${maKH}`
        );
        setSanPhams(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchSanPhams();
  }, []);

  const handlePurchase = () => {
    const maKH = localStorage.getItem("maKH");
    if (!maKH) {
      navigate("/DangNhap");
      return;
    }

    const invalidItems = sansp.filter(
      (item) => !item.maSP || item.maSP === undefined
    );
    if (invalidItems.length > 0) {
      return;
    }

    // Chuyển hướng đến trang thanh toán với dữ liệu giỏ hàng
    navigate("/PaymentForm", { state: { cartItems: sansp } });
  };

  const handleMinus = async (maSP: number) => {
    try {
      const item = sansp.find(item => item.maSP === maSP);
      if (item && item.soLuong > 1) {
        const res = await axios.put(
          `https://localhost:7095/api/GioHangs/giamsl?id=${maSP}`
        );
        setSanPhams(sansp.map(sp => sp.maSP === maSP ? { ...sp, soLuong: sp.soLuong - 1 } : sp));
        return res;
      } else {
        alert("Số lượng không thể giảm nhỏ hơn 1");
      }
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      alert("Không thể giảm số lượng");
    }
  };

  const handlePlus = async (maSP: number) => {
    try {
      const item = sansp.find(item => item.maSP === maSP);
      if (item && item.soLuong < 10) {
        const res = await axios.put(
          `https://localhost:7095/api/GioHangs/tangsl?id=${maSP}`
        );
        setSanPhams(sansp.map(sp => sp.maSP === maSP ? { ...sp, soLuong: sp.soLuong + 1 } : sp));
        return res;
      } else {
        alert("Số lượng không thể vượt quá 10");
      }
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      alert("Không thể tăng số lượng");
    }
  };

  const XoaSL = async (maSP: number) => {
    const confirmDelete = window.confirm(
      "Bạn chắc chắn muốn xóa sản phẩm này không?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `https://localhost:7095/api/GioHangs/xoagh?id=${maSP}`
        );
        setSanPhams(sansp.filter(item => item.maSP !== maSP));
        return res;
      } catch (error) {
        console.error("Lỗi không xác định:", error);
        alert("Không thể xóa sản phẩm này");
      }
    }
  };

  const handleQuantityChange = (maSP: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 10) {
      setSanPhams(sansp.map(sp => sp.maSP === maSP ? { ...sp, soLuong: value } : sp));
    } else {
      alert("Số lượng phải từ 1 đến 10");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="container mt-5">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
            Trang chủ
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">Giỏ hàng</span>
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
                        <th className="column-3">Màu</th>
                        <th className="column-3">Giá</th>
                        <th className="column-4">Số Lượng</th>
                        <th className="column-5">Tổng Tiền</th>
                      </tr>
                      {sansp.map((item, key) => (
                        <tr className="table_row" key={key}>
                          <td className="column-1">
                            <div
                              className="how-itemcart1"
                              onClick={() => XoaSL(item.maSP)}
                            >
                              <img src={LinkImg + item.hinhAnh} alt="IMG" />
                            </div>
                          </td>
                          <td className="column-2">{item.tenSP}</td>
                          <td className="column-2">{item.tenKT}</td>
                          <td className="column-2">{item.tenMS}</td>
                          <td className="column-3">{item.gia} ₫</td>
                          <td className="column-4">
                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                              <div
                                className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() => handleMinus(item.maSP)}
                              >
                                <i className="fs-16 zmdi zmdi-minus" />
                              </div>
                              <input
                                className="mtext-104 cl3 txt-center num-product"
                                type="number"
                                min="1"
                                max="10"
                                value={item.soLuong}
                                onChange={(e) => handleQuantityChange(item.maSP, e)}
                              />
                              <div
                                className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() => handlePlus(item.maSP)}
                              >
                                <i className="fs-16 zmdi zmdi-plus" />
                              </div>
                            </div>
                          </td>
                          <td className="column-5">
                            {item.gia * item.soLuong} ₫
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5">
                    <input
                      className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                      type="text"
                      name="coupon"
                      placeholder="Mã Giảm Giá"
                    />
                    <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                      Xác nhận
                    </div>
                  </div>
                  <div
                    className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                    onClick={handlePurchase}
                  >
                    Mua Ngay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Index;
