const DangKy = () => {
    return(
        <>
        <section className="bg0 p-t-104 p-b-116">
  <div className="container">
    <div className="flex-w flex-tr">
      <div className="container size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
        <form>
          <h4 className="mtext-105 cl2 txt-center p-b-30">Đăng Ký</h4>
          <label>Họ Và Tên: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="cl2 plh3 size-116 p-l-20"
              type="text"
              name="tenKH"
              placeholder="Họ Và Tên"
            />
          </div>
          <label>Số Điện Thoại: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="cl2 plh3 size-116 p-l-20"
              type="text"
              name="SDT"
              placeholder="Số Điện Thoại"
            />
          </div>
          <label>CCCD: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="cl2 plh3 size-116 p-l-20"
              type="text"
              name="CCCD"
              placeholder="CCCD"
            />
          </div>
          <label>Email: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="stext-111 cl2 plh3 size-116 p-l-20"
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <label>Tên Đăng Nhập: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="cl2 plh3 size-116 p-l-20"
              type="text"
              name="tenDN"
              placeholder="Tên Đăng Nhập"
            />
          </div>
          <label>Mật Khẩu: </label>
          <div className="bor8 m-b-20 how-pos4-parent">
            <input
              className="cl2 plh3 size-116 p-l-20"
              type="text"
              name="matKhau"
              placeholder="Mật Khẩu"
            />
          </div>
          <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default DangKy