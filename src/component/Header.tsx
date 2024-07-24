import { useEffect, useState } from "react"
import "./header.css"
// import { getSanPhamAPI } from "../api/SanPhams"


// const fetchData = async () => {
//     const data = await getSanPhamAPI();
//     console.log(data);
// };
const Header = () => {
  const [showCard, setShowCard] = useState(false)
  const [showHeaderCart, setShowHeaderCart] = useState("")
  const handleShowCard = () => {
    setShowCard(!showCard)
    setShowHeaderCart("show-header-cart")
  }
  useEffect(() => {
    // fetchData();
  }, [])

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
                    <ul className="sub-menu">
                      <li>
                        <a href="/">Trang Chủ</a>
                      </li>
                      <li>
                        <a href="home-02.html">Homepage 2</a>
                      </li>
                      <li>
                        <a href="home-03.html">Homepage 3</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/shop">Sản Phẩm</a>
                  </li>
                  <li className="label1" data-label1="hot">
                    <a href="shoping-cart.html">Features</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </div>
              {/* Icon header */}
              <div className="wrap-icon-header flex-w flex-r-m">
                
                <div>
                  <div className="search-container">
                    <input
                      type="text"
                      id="search-input"

                      placeholder="Tìm kiếm..."
                    />
                    <button id="search-button" >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                  <div id="search-results"></div>
                </div>
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" onClick={handleShowCard} data-notify={2}>
                  <i className="zmdi zmdi-shopping-cart" />
                </div>
                <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify={0}>
                  <i className="zmdi zmdi-favorite-outline" />
                </a>
              </div>
            </nav>
          </div>
        </div>
        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          {/* Logo moblie */}
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
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify={2}>
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
            <li>
              <div className="left-top-bar">Giao hàng miễn phí cho đơn hàng tiêu chuẩn trên 100.000 VND</div>
            </li>
            <li>
              <div className="right-top-bar flex-w h-full">
                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  Help &amp; FAQs
                </a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  My Account
                </a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  EN
                </a>
                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  USD
                </a>
              </div>
            </li>
          </ul>
          <ul className="main-menu-m">
            <li>
              <a href="index.html">Trang chủ</a>
              {/* <ul className="sub-menu-m">
                <li>
                  <a href="index.html">Homepage 1</a>
                </li>
                <li>
                  <a href="home-02.html">Homepage 2</a>
                </li>
                <li>
                  <a href="home-03.html">Homepage 3</a>
                </li>
              </ul> */}
              <span className="arrow-main-menu-m">
                <i className="fa fa-angle-right" aria-hidden="true" />
              </span>
            </li>
            <li>
              <a href="product.html">Sản phẩm</a>
            </li>
            <li>
              <a href="shoping-cart.html" className="label1 rs1" data-label1="hot">
                Features
              </a>
            </li>
            <li>
              <a href="blog.html">Blog</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
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
            <span className="mtext-103 cl2"> Your Cart </span>
            <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
              <i className="zmdi zmdi-close" onClick={() => setShowHeaderCart('')} />
            </div>
          </div>
          <div className="header-cart-content flex-w js-pscroll">
            <ul className="header-cart-wrapitem w-full">
              <li className="header-cart-item flex-w flex-t m-b-12">
                <div className="header-cart-item-img">
                  <img src="src/assets/images/item-cart-01.jpg" alt="IMG" />
                </div>
                <div className="header-cart-item-txt p-t-8">
                  <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    {" "}
                    White Shirt Pleat{" "}
                  </a>
                  <span className="header-cart-item-info"> 1 x $19.00 </span>
                </div>
              </li>
              <li className="header-cart-item flex-w flex-t m-b-12">
                <div className="header-cart-item-img">
                  <img src="src/assets/images/item-cart-02.jpg" alt="IMG" />
                </div>
                <div className="header-cart-item-txt p-t-8">
                  <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    {" "}
                    Converse All Star{" "}
                  </a>
                  <span className="header-cart-item-info"> 1 x $39.00 </span>
                </div>
              </li>
              <li className="header-cart-item flex-w flex-t m-b-12">
                <div className="header-cart-item-img">
                  <img src="src/assets/images/item-cart-03.jpg" alt="IMG" />
                </div>
                <div className="header-cart-item-txt p-t-8">
                  <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    {" "}
                    Nixon Porter Leather{" "}
                  </a>
                  <span className="header-cart-item-info"> 1 x $17.00 </span>
                </div>
              </li>
            </ul>
            <div className="w-full">
              <div className="header-cart-total w-full p-tb-40">Total: $75.00</div>
              <div className="header-cart-buttons flex-w w-full">
                <a href="/card" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                  {" "}
                  View Cart{" "}
                </a>
                <a href="shoping-cart.html" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                  {" "}
                  Check Out{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header


