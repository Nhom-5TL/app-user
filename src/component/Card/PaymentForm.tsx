import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './payment-form.css';

interface CartItem {
    MaSP: number;
    tenSP: string;
    tenKT: string;
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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [customerId, setCustomerId] = useState<string | null>(null);

    useEffect(() => {
        const data = location.state as { cartItems: CartItem[] };
        if (data && data.cartItems) {
            setCartItems(data.cartItems);
        } else {
            setError('No cart items available.');
        }

        const fetchCustomerId = () => {
            const id = localStorage.getItem('customerId');
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
    
        if (!customerId) {
            setError('ID khách hàng không có sẵn. Vui lòng đăng nhập lại.');
            return;
        }
    
        // Kiểm tra giá trị MaSP trong giỏ hàng
        const invalidItems = cartItems.filter(item => !item.MaSP || item.MaSP === undefined);
    
        if (invalidItems.length > 0) {
            setError('Một số sản phẩm có ID không hợp lệ hoặc bị thiếu.');
            return;
        }
    
        try {
            const response = await axios.post('https://localhost:7095/api/DonHang/CreateOrder', {
                TenKh: name,
                DiaChi: address,
                SDT: phone,
                GhiChu: note,
                TrangThaiThanhToan: paymentMethod,
                ChiTietDonHangs: cartItems.map(item => ({
                    MaSP: item.MaSP,
                    MaMauSac: null,
                    MaKichThuoc: null,
                    SoLuong: item.soLuong,
                    DonGia: item.gia,
                    TenSP: item.tenSP
                })),
                MaKH: customerId
            });
            setSuccess('Đơn hàng đã được tạo thành công.');
            setError(null);
            console.log('Order created:', response.data);
        } catch (error) {
            setError('Không thể tạo đơn hàng. Vui lòng thử lại.');
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
                </label>
                <label>
                    Địa chỉ:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </label>
                <label>
                    Số điện thoại:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </label>
                <label>
                    Ghi chú:
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
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
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.tenSP}</td>
                                    <td>{item.tenKT}</td>
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
