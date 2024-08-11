import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './payment-form.css';

interface ChiTietDonHang {
    maSP: number;
    tenSP: string;
    tenKT: string;
    tenMS: string;
    maMS: number;
    maKT: number;
    gia: number;
    soLuong: number;
}

const PaymentForm: React.FC = () => {
    const location = useLocation();
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('COD');
    const [cartItems, setCartItems] = useState<ChiTietDonHang[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [maKH, setCustomerId] = useState<string | null>(null);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        const data = location.state as { cartItems: ChiTietDonHang[] };
        if (data && data.cartItems) {
            setCartItems(data.cartItems);
        } else {
            setError('No cart items available.');
        }

        const fetchCustomerId = () => {
            const id = localStorage.getItem('maKH');
            if (id) {
                setCustomerId(id);
            } else {
                setError('Customer ID is not available. Please log in again.');
            }
        };

        fetchCustomerId();
    }, [location.state]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!maKH) {
            setError('ID khách hàng không có sẵn. Vui lòng đăng nhập lại.');
            return;
        }

        const DonHangPoST = {
            tenKh: name,
            diaChi: address,
            sdt: phone,
            ghiChu: note,
            trangThaiThanhToan: paymentMethod,
            maKH: maKH,
            chiTietDonHangs: cartItems.map(item => ({
                maSP: item.maSP,
                tenMS: item.tenMS,
                tenKT: item.tenKT,
                soLuong: item.soLuong,
                donGia: item.gia,
                tenSP: item.tenSP
            })),
        };

        try {
            const response = await axios.post('https://localhost:7095/api/GioHangs/CreateOrder', DonHangPoST);
            alert('Thanh toán thành công!');
            setSuccess('Đơn hàng đã được tạo thành công.');
            setError(null);
            navigate('/');
            console.log('Order created:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                const { errors } = error.response.data;
                setError(`Lỗi: ${error.message}`);
                setFormErrors(errors);
            } else {
                setError('Không thể tạo đơn hàng. Vui lòng thử lại.');
            }
            setSuccess(null);
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="payment-form-wrapper">
            <form onSubmit={handleSubmit} className="payment-form">
                <label>
                    Tên:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    {formErrors.TenKh && (
                        <p className="error text-danger">{formErrors.TenKh.join(', ')}</p>
                    )}
                </label>
                <label>
                    Địa chỉ:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    {formErrors.DiaChi && (
                        <p className="error text-danger">{formErrors.DiaChi.join(', ')}</p>
                    )}
                </label>
                <label>
                    Số điện thoại:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    {formErrors.SDT && (
                        <p className="error text-danger">{formErrors.SDT.join(', ')}</p>
                    )}
                </label>
                <label>
                    Ghi chú:
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                    {formErrors.GhiChu && (
                        <p className="error text-danger">{formErrors.GhiChu.join(', ')}</p>
                    )}
                </label>
                <label>
                    Phương thức thanh toán:
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="COD">Thanh toán khi nhận hàng</option>
                        <option value="CreditCard">Thẻ tín dụng</option>
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
