import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment-form.css";

interface ChiTietDonHang {
  maSP: number;
  tenSP: string;
  tenKT: string;
  tenMS: string;
  gia: number;
  soLuong: number;
}

const PaymentForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const [cartItems, setCartItems] = useState<ChiTietDonHang[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [maKH, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const data = location.state as { cartItems: ChiTietDonHang[] };
    if (data && data.cartItems) {
      setCartItems(data.cartItems);
    } else {
      setError("Không có sản phẩm nào trong giỏ hàng.");
    }

    const id = localStorage.getItem("maKH");
    if (id) {
      setCustomerId(id);
    } else {
      setError("ID khách hàng không có sẵn. Vui lòng đăng nhập lại.");
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!maKH) {
      setError("ID khách hàng không có sẵn. Vui lòng đăng nhập lại.");
      return;
    }

    const donHangPost = {
      tenKh: name,
      diaChi: address,
      sdt: phone,
      ghiChu: note,
      trangThaiThanhToan: paymentMethod,
      maKH: maKH,
      chiTietDonHangs: cartItems.map((item) => ({
        maSP: item.maSP,
        tenMS: item.tenMS,
        tenKT: item.tenKT,
        soLuong: item.soLuong,
        donGia: item.gia,
        tenSP: item.tenSP,
      })),
    };

    try {
      if (paymentMethod === "VNPay") {
        const orderResponse = await axios.post(
          "https://localhost:7095/api/DonHang/CreateOrder",
          donHangPost
        );

        const maDH = orderResponse.data.maDH;

        const vnPayResponse = await axios.post(
          "https://localhost:7095/api/DonHang/OrderPayVNPay",
          {
            Amount: cartItems.reduce(
              (acc, item) => acc + item.gia * item.soLuong,
              0
            ),
            Id: maDH,
          }
        );

        window.location.href = vnPayResponse.data.message;
      } else {
        await axios.post(
          "https://localhost:7095/api/DonHang/CreateOrder",
          donHangPost
        );
        alert("Thanh toán thành công!");
        setSuccess("Đơn hàng đã được tạo thành công.");
        setError(null);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(`Lỗi: ${error.response.data.error}`);
      } else {
        setError("Không thể tạo đơn hàng. Vui lòng thử lại.");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="payment-form-wrapper">
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Tên:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Địa chỉ:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Số điện thoại:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Ghi chú:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <label>
          Phương thức thanh toán:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="VNPay">Thanh toán VNPay</option>
          </select>
        </label>
        <div className="cart-details">
          <h3>Chi tiết đơn hàng</h3>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Size</th>
                <th>Color</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.maSP}>
                  <td>{item.tenSP}</td>
                  <td>{item.tenKT}</td>
                  <td>{item.tenMS}</td>
                  <td>{item.gia} ₫</td>
                  <td>{item.soLuong}</td>
                  <td>{item.gia * item.soLuong} ₫</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Xác nhận đơn hàng</button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
