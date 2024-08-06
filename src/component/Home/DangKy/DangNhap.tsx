import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Card/AuthContext';

interface LoginVM {
    tenDN: string;
    mauKhau: string;
}

const DangNhap: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    // const [load, setload] = useState(false);
    
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    // const navigate  = useNavigate();
    // const { setIsLoggedIn } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData: LoginVM = {
            tenDN: username,
            mauKhau: password
        };
        const returnUrl = new URLSearchParams(window.location.search).get('ReturnUrl') || '/';
    // setload(true)
        try {
            const response = await axios.post('https://localhost:7095/api/KhachHangs/DangNhap', loginData);
            alert('Đăng Nhập Thành Công');
          if (response.data.success) {
            window.location.href = returnUrl;
            // navigate(returnUrl); // Điều hướng đến ReturnUrl sau khi đăng nhập thành công
          }
        //   const response = await axios.post('https://localhost:7095/api/KhachHangs/DangNhap', loginData);
        // setIsLoggedIn(true);

        const maKH = response.data?.maKH; // Sửa đổi từ MaKH thành maKH
        if (maKH) {
           
            localStorage.setItem('maKH', maKH.toString());
            localStorage.setItem('myData', JSON.stringify(response.data)); // Đảm bảo customerId là chuỗi
        } else {
            console.log('Không có maKH trong phản hồi từ API');
        }
        window.location.href = returnUrl;
        // Kiểm tra xem có URL redirect không
        // const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        // localStorage.removeItem('redirectAfterLogin'); // Xóa URL sau khi điều hướng
        
        // navigate(redirectPath);
        } catch (err) {
            
            if (axios.isAxiosError(err) && err.response && err.response.data) {
                const { message } = err.response.data;
                alert(err.response.data.error);
                if (message) {
                  // Cập nhật các lỗi cho từng trường
                  setFormErrors(message);
                  // Nếu cần, bạn có thể kết hợp các lỗi thành một thông báo chung
                  setError('Đăng nhập thất bại. Vui lòng kiểm tra các lỗi bên dưới.');
                } else {
                  setError('Đăng nhập thất bại. Vui lòng thử lại.');
                }
              } else {
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
              }
        }
        // setload(false);
    };

    return (
        <>
            <section className="bg0 p-t-104 p-b-116">
                <div className="container">
                    <div className="flex-w flex-tr">
                        <div className="container size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                            <form onSubmit={handleLogin}>
                                
                                <h4 className="mtext-105 cl2 txt-center p-b-30">Đăng Nhập</h4>
                                {error && <h3 className="error">{error}</h3>}
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
                                {formErrors.tenDN && (
                  <p className="error">{formErrors.tenDN.join(', ')}</p>
                )}
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
                                {formErrors.MatKhau && (
                  <p className="error">{formErrors.MatKhau.join(', ')}</p>
                )}
                                <button className={username && password ? "flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" : ""
                                    
                                }>
                                    <i className="fa-solid fa-sync fa-spin"></i>
                                    &nbsp; Login
                                    
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
