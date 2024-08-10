import React, { useState, useEffect } from 'react';
import {  useParams} from 'react-router-dom';
import axios from 'axios';

interface ChiTietDonHang {
    maSP: number;
    tensp: string;
    tenKT: string;
    tenMS: string;
    maMS: number;
    maKT: number;
    gia: number;
    soLuong: number;
    tenKh: string;
    diaChi: string;
    sdt: string;
    ghiChu: string;
    trangThaiThanhToan: string;

}

const PaymentForm: React.FC = () => {
    // const location = useLocation();
    const [cartItems, setCartItems] = useState<ChiTietDonHang[]>([]);
    const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState<string | null>(null);
    const {maDH} = useParams<{maDH : string} >();
    // const navigate = useNavigate();
    // const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});

    // useEffect(() => {
    //     const data = location.state as { cartItems: ChiTietDonHang[] };
    //     if (data && data.cartItems) {
    //         setCartItems(data.cartItems);
    //     } else {
    //         setError('No cart items available.');
    //     }

    //     const fetchCustomerId = () => {
    //         const id = localStorage.getItem('maKH');
    //         if (id) {
    //             setCustomerId(id);
    //         } else {
    //             setError('Customer ID is not available. Please log in again.');
    //         }
    //     };

    //     fetchCustomerId();
    // }, [location.state]);
    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const response = await axios.get<ChiTietDonHang[]>(`https://localhost:7095/api/DonHang/DonHUSERCT?maDH=${maDH}`);
                console.log("DATA1:", response.data);
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };

        fetchSanPhams();
    }, [maDH]);
    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();

    //     if (!maKH) {
    //         setError('ID khách hàng không có sẵn. Vui lòng đăng nhập lại.');
    //         return;
    //     }

    //     const DonHangPoST = {
    //         tenKh: name,
    //         diaChi: address,
    //         sdt: phone,
    //         ghiChu: note,
    //         trangThaiThanhToan: paymentMethod,
    //         maKH: maKH,
    //         chiTietDonHangs: cartItems.map(item => ({
    //             maSP: item.maSP,
    //             tenMS: item.tenMS,
    //             tenKT: item.tenKT,
    //             soLuong: item.soLuong,
    //             donGia: item.gia,
    //             tenSP: item.tenSP
    //         })),
    //     };

    //     try {
    //         const response = await axios.post('https://localhost:7095/api/GioHangs/CreateOrder', DonHangPoST);
    //         alert('Thanh toán thành công!');
    //         setSuccess('Đơn hàng đã được tạo thành công.');
    //         setError(null);
    //         navigate('/');
    //         console.log('Order created:', response.data);
    //     } catch (error) {
    //         if (axios.isAxiosError(error) && error.response && error.response.data) {
    //             const { errors } = error.response.data;
    //             setError(`Lỗi: ${error.message}`);
    //             setFormErrors(errors);
    //         } else {
    //             setError('Không thể tạo đơn hàng. Vui lòng thử lại.');
    //         }
    //         setSuccess(null);
    //         console.error('Error creating order:', error);
    //     }
    // };
    const firstItem = cartItems[0]; // Assuming all items have the same customer details

    return (
        <div className="payment-form-wrapper">
            {firstItem && (
                <form className="payment-form" >
                    <label>
                        Tên:
                        <input type="text" value={firstItem.tenKh} readOnly />
                    </label>
                    <label>
                        Địa chỉ:
                        <input type="text" value={firstItem.diaChi} readOnly />
                    </label>
                    <label>
                        Số điện thoại:
                        <input type="text" value={firstItem.sdt} readOnly />
                    </label>
                    <label>
                        Ghi chú:
                        <textarea value={firstItem.ghiChu} readOnly />
                    </label>
                    <label>
                        Phương thức thanh toán:
                        <select value={firstItem.trangThaiThanhToan} >
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
                                        <td>{item.tensp}</td>
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
                    <a type="submit" href='/loadDH'> Trở về</a>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default PaymentForm;
