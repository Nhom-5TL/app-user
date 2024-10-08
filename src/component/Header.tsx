import { useEffect, useState } from "react";
import axios from 'axios';
import "./header.css";
import { Link } from 'react-router-dom';
import { getUser } from './authService'; 

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/";

interface CartItem {
  hinhAnh: string;
  tenSanPham: string;
  gia: number;
  soLuong: number;
}
const Header = () => {
  const [showCard, setShowCard] = useState(false);
  const [showHeaderCart, setShowHeaderCart] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
// const user = useSelector((state) => state.au)
  // Hàm lấy dữ liệu giỏ hàng từ API
  const [user, setUser] = useState<{ tenKh: string } | null>(null);
 
  useEffect(() => {
      // Hàm giả lập lấy thông tin người dùng
      const fetchUser = async () => {
          const currentUser = await getUser();
          setUser(currentUser);
      };

      fetchUser();
  }, []);
  const handleLogout = async () => {
     if(window.confirm('Bạn muốn đăng xuất không!')){
      await axios.post(`https://localhost:7095/api/KhachHangs/DangXuat`);
      localStorage.removeItem('maKH');
      localStorage.removeItem('myData');
      window.location.href = '/';
     }
  };
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`https://localhost:7095/api/KhachHangs/DangXuat`, {
  //       method: 'POST',
  //       credentials: 'include', // Gửi cookie nếu cần
  //     });
  
  //     if (response.ok) {
  //       window.location.href = '/'; // Chuyển hướng đến trang chủ
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Logout failed:', errorData);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };
  const fetchCartData = async () => {
    try {
      const maKH = localStorage.getItem('maKH');
      if (!maKH) {
        return;
      }
      const response = await axios.get<CartItem[]>(`https://localhost:7095/api/GioHangs/MaKH/${maKH}`);
      console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Có lỗi khi lấy dữ liệu giỏ hàng:', error);
    }
  };

  // Hàm xử lý khi nhấn vào icon giỏ hàng
  const handleShowCard = async () => {
      // Nếu giỏ hàng không hiển thị, gọi lại API để tải dữ liệu
      await fetchCartData();
    setShowCard(!showCard);
    setShowHeaderCart(showHeaderCart ? "" : "show-header-cart");
  };

  // Gọi fetchCartData khi component được mount
  useEffect(() => {
    fetchCartData();
  }, []);

    // Tạo formatter cho tiền tệ VND
    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });

  // Hàm thay thế ký hiệu ₫ bằng "VND"
  const formatPrice = (price: number) => {
      const formatted = currencyFormatter.format(price);
      return formatted.replace('₫', 'VND');
  };
  // Tính tổng số tiền giỏ hàng
  const total = cartItems.reduce((acc, item) => acc + item.gia * item.soLuong, 0);
  if (error) return <div>{error}</div>;

  return (
    <>
      <header>
        {/* Header desktop */}
        <div className="container-menu-desktop fix-menu-desktop">
          <div className="wrap-menu-desktop" style={{ marginTop: "-40px" }}>
            <nav className="limiter-menu-desktop container">
              {/* Logo desktop */}
              <a href="#" className="logo">
                <img src="src/assets/images/icons/logo-01.png" alt="IMG-LOGO" />
              </a>
              {/* Menu desktop */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li className="active-menu">
                    <a href="/">Trang Chủ</a>
                  </li>
                  <li><a href="/shop">Sản Phẩm</a></li>
                  {user ?(
                    <li><a href="\loadDH">DonHang</a></li>
                  ): (
                    ""
                  )}
                </ul>
              </div>
              {/* Icon header */}
              <div className="wrap-icon-header flex-w flex-r-m">

                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" onClick={handleShowCard}>
                  <i className="zmdi zmdi-shopping-cart" />
                </div>
                <div className="btn-group col-lg-4 col-6 text-right">
            {user ? (
                <>
                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                    {user.tenKh}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link to="/TTKhH" className="dropdown-item">Thông tin người dùng</Link>
                        <button onClick={handleLogout} className="dropdown-item">Đăng Xuất</button>
                    </div>
                </>
            ) : (
                <>
                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                        Tài Khoản
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link to="/dangky" className="dropdown-item">Đăng Ký</Link>
                        <Link to="/dangnhap" className="dropdown-item">Đăng Nhập</Link>
                    </div>
                </>
            )}
        </div>
                {/* <a href="/dangnhap" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 login-text">Đăng Nhập</a> */}
              </div>
            </nav>
          </div>
        </div>
        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          {/* Logo mobile */}
          <div className="logo-mobile">
            <a href="index.html">
              <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
            </a>
          </div>
          {/* Icon header */}
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search" />
            </div>
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" onClick={handleShowCard} data-notify={cartItems.length}>
              <i className="zmdi zmdi-shopping-cart" /> 
            </div>
            <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify={0}>
              <i className="zmdi zmdi-favorite-outline" />
            </a>
          </div> 
          {/* Button show menu */}
          <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        </div>
        {/* Menu Mobile */}
        <div className="menu-mobile">
          <ul className="topbar-mobile">
            <li><div className="left-top-bar">Giao hàng miễn phí cho đơn hàng tiêu chuẩn trên 100.000 VND</div></li>
            <li>
              <div className="right-top-bar flex-w h-full">
                <a href="#" className="flex-c-m p-lr-10 trans-04">Help &amp; FAQs</a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">My Account</a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">EN</a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">USD</a>
              </div>
            </li>
          </ul>
          <ul className="main-menu-m">
            <li><a href="index.html">Trang chủ</a></li>
            <li><a href="product.html">Sản phẩm</a></li>
            {user ?(
                    <li className="label1" data-label1="hot"><a href="\loadDH">DonHang</a></li>
                  ): (
                    ""
                  )}
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        {/* Modal Search */}
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>
            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search" />
              </button>
              <input className="plh3" type="text" name="search" placeholder="Search..." />
            </form>
          </div>
        </div>
      </header>

      {/* Cart */}
      <div className={`wrap-header-cart js-panel-cart ${showHeaderCart}`}>
        <div className="s-full js-hide-cart" />
        <div className="header-cart flex-col-l p-l-65 p-r-25">
          <div className="header-cart-title flex-w flex-sb-m p-b-8">
            <span className="mtext-103 cl2">Giỏ hàng</span>
            <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart" onClick={() => setShowHeaderCart('')}>
              <i className="zmdi zmdi-close" />
            </div>
          </div>
          <div className="header-cart-content flex-w js-pscroll">
            <ul className="header-cart-wrapitem w-full">
              {cartItems.length === 0 ? (
                <li className="header-cart-item flex-w flex-t m-b-12">
                  <div className="header-cart-item-txt p-t-8">
                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">Giỏ hàng của bạn đang trống</a>
                    <span className="header-cart-item-info">...</span>
                  </div>
                </li>
              ) : (
                cartItems.map((item, index) => (
                  <li key={index} className="header-cart-item flex-w flex-t m-b-12">
                    <div className="header-cart-item-img">
                      <img src={`${LinkImg}${item.hinhAnh}`} alt="IMG" />
                    </div>
                    <div className="header-cart-item-txt p-t-8">
                      <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">{item.tenSanPham}</a>
                      <span className="header-cart-item-info">{formatPrice(item.gia)} x {item.soLuong}</span>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="w-full">
              <div className="header-cart-total w-full p-tb-40">
                Tổng cộng: {formatPrice(total)}
              </div>
              <div className="header-cart-buttons flex-w w-full">
                <a href="/card" className="flex-c-m stext-101 cl2 size-107 bg3 bor13 hov1 trans-04 p-lr-15" style={{ marginLeft: -30 }}>
                  Xem giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
