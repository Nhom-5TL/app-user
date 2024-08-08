  import React, { useState ,useEffect} from 'react';
  import axios from 'axios';

  interface UserUpdate {
      email: string;
      sdt: string;
      cccd: string;
      tenKh: string;
      matKhau: string;
      tenTaiKhoan: string;
  }

  const TTKHH: React.FC = () => {
      const [user, setUser] = useState<UserUpdate| null>(null);
      const [error, setError] = useState<string | null>(null);
      const maKH = localStorage.getItem('maKH');
      useEffect(() => {
          
          const fetchData = async () => {
            try {
              const response = await axios.get<UserUpdate>(
                `https://localhost:7095/api/KhachHangs/${maKH}`
              );
              console.log("Response data:", response.data);
              setUser(response.data);
            } catch (error) {
              setError("Có lỗi xảy ra khi tải dữ liệu.");
            }
          };
      
          fetchData(); // Gọi hàm fetchData khi component được mount
        }, [maKH]);
        const handleChange = (
          event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
          const { name, value } = event.target;
          if (user) {
            setUser({
              ...user,
              [name]: value, // Cập nhật giá trị dựa trên tên trường
            });
          }
        };

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;

      const tenKh = (form.elements.namedItem("tenKH") as HTMLInputElement).value;
      const sdt = (form.elements.namedItem("SDT") as HTMLInputElement).value;
      const cccd = (form.elements.namedItem("CCCD") as HTMLInputElement)
        .value;
      const matKhau = (form.elements.namedItem("matKhau") as HTMLInputElement).value;
      const tenDN = (form.elements.namedItem("tenDN") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const maKH = localStorage.getItem('maKH');

          const KHViewModel = {
              maKh : maKH,
            tenKH: tenKh,
              sdt,
              cccd,
              matKhau,
              tenDN,
              email,
            };
          try {
              const response = await axios.put(`https://localhost:7095/api/KhachHangs/${maKH}`, KHViewModel);
              alert('Sửa Thông Tin Thành Công');
              window.location.href = "/TTKhH";
              return response.data;
          } catch (err) {
              setError('Failed to update user information');
          }
      };

      return (
          <>
          {user ? (
              
          <section className="bg0 p-t-104 p-b-116">
          <div className="container">
            <div className="flex-w flex-tr">
              <div className="container size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
            
                <form onSubmit={handleSubmit}>
                  <h4 className="mtext-105 cl2 txt-center p-b-30">Thông Tin Tài Khoản </h4>
                  {error && <p className="error">{error}</p>}
                  <label>Họ Và Tên: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="tenKH"
                      defaultValue={user.tenKh}
                      onChange={handleChange}
                      placeholder="Họ Và Tên"
                    />
                  </div>
                  <label>Số Điện Thoại: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="SDT"
                      defaultValue={user.sdt}
                      onChange={handleChange}
                      placeholder="Số Điện Thoại"
                    />
                  </div>
                  <label>CCCD: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="CCCD"
                      defaultValue={user.cccd}
                      onChange={handleChange}
                      placeholder="CCCD"
                    />
                  </div>
                  <label>Email: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="email"
                      defaultValue={user.email}
                      placeholder="Email"
                    />
                  </div>
                  <label>Tên Đăng Nhập: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="tenDN"
                      defaultValue={user.tenTaiKhoan}
                      placeholder="Tên Đăng Nhập"
                    />
                  </div>
                  <label>Mật Khẩu: </label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input
                      className="cl2 plh3 size-116 p-l-20"
                      type="text"
                      name="matKhau"
                      defaultValue={user.matKhau}
                      onChange={handleChange}
                      placeholder="Mật Khẩu"
                    />
                  </div>
                  <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    Lưu
                  </button>
                  <hr></hr>
                  <a className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    đơn hàng
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
          <div>Loading...</div>
        )}
          </>
      );
  };

  export default TTKHH;
