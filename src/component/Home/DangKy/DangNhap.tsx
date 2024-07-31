import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginVM {
    tenDN: string;
    mauKhau: string;
}

const DangNhap: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate  = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData: LoginVM = {
            tenDN: username,
            mauKhau: password
        };
        try {
          const response = await axios.post('https://localhost:7095/api/KhachHangs/DangNhap', loginData);
        console.log('Phản hồi từ API:', response.data);
        const customerId = response.data?.maKH; // Sửa đổi từ MaKH thành maKH
        if (customerId) {
            localStorage.setItem('customerId', customerId.toString()); // Đảm bảo customerId là chuỗi
            console.log('Customer ID đã được lưu vào localStorage:', customerId);
        } else {
            console.log('Không có maKH trong phản hồi từ API');
        }
            alert('Đăng Nhập Thành Công!');
            navigate('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMsg = err.response?.data?.Error || 'Đăng nhập thất bại. Vui lòng thử lại.';
                setError(errorMsg);
            } else {
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        }
    };

    return (
        <>
            <section className="bg0 p-t-104 p-b-116">
                <div className="container">
                    <div className="flex-w flex-tr">
                        <div className="container size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                            <form onSubmit={handleLogin}>
                                {error && <p className="error">{error}</p>}
                                <h4 className="mtext-105 cl2 txt-center p-b-30">Đăng Nhập</h4>
                                <label>Tên Đăng Nhập: </label>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="cl2 plh3 size-116 p-l-20"
                                        type="text"
                                        name="tenDN"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        placeholder="Tên Đăng Nhập"
                                    />
                                </div>
                                <label>Mật Khẩu: </label>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="cl2 plh3 size-116 p-l-20"
                                        type="password"
                                        name="matKhau"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Mật Khẩu"
                                    />
                                </div>
                                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                                    Login
                                </button>
                                <a href='/DangKy'>Đăng Ký</a>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DangNhap;
