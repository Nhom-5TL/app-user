import React ,  { useEffect ,useState}  from "react";
import { Sp } from '../api/SanPhams';
import axios from 'axios';
import { it } from "node:test";
const Index = () => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchSanPhams = async () => {
            try {
              const response = await axios.get<Sp[]>(
                `https://localhost:7095/api/GioHangs`
              );
              console.log("DATA1:", response.data); 
              // getSanPhamAPI đã trả về data
                setSanPhams(response.data); // data đã được xử lý bởi interceptor
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
    
        fetchSanPhams();
    
    
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  return (
    <>
      <>
        {/* breadcrumb */}
        <div className="container mt-5" >
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
            </a>
            <span className="stext-109 cl4">Shoping Cart</span>
          </div>
        </div>
        {/* Shoping Cart */}
        <form className="bg0 p-t-75 p-b-85">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                <div className="m-l-25 m-r--38 m-lr-0-xl">
                  <div className="wrap-table-shopping-cart">
                    <table className="table-shopping-cart">
                      <tbody>
                        <tr className="table_head">
                          <th className="column-1">Sản Phẩm</th>
                          <th className="column-2" />
                          <th className="column-3">Size</th>
                          <th className="column-3">Giá</th>
                          <th className="column-4">Số Lượng</th>
                          <th className="column-5">Tổng Tiền</th>
                        </tr>
                        {sansp.map((item, key) => (
                          <tr className="table_row" key={key}>
                          <td className="column-1">
                            <div className="how-itemcart1">
                              <img src="src/assets/images/rolex.jpg" alt="IMG" />
                            </div>
                          </td>
                          <td className="column-2">{item.tenSP}</td>
                          <td className="column-2">{item.kichThuocs?.length ? item.kichThuocs.map((kt) =>(
                           <button
                           key={kt.maKT}
                               style={{
                                   border: kt.maKT === kt.maKT? '2px solid black' : 'none',
                                   margin: '5px',
                                   cursor: 'pointer',
                                  //  display: selectedSize && !product.variants.some(v => v.kichThuoc === selectedSize && v.mauSac === variant.mauSac) ? 'none' : 'inline-block'
                              
                                 }}
                           >
                               {kt.tenKT}
                           </button>
                           
                       )) : <span>No colors available</span>}</td>
                          <td className="column-3">{item.gia} ₫</td>
                          <td className="column-4">
                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                              <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </div>
                              <input className="mtext-104 cl3 txt-center num-product" type="text" name="num-product1" defaultValue={item.soLuong} />
                              <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-plus" />
                              </div>
                            </div>
                          </td>
                          <td className="column-5">{item.gia * item.soLuong} ₫</td>
                        </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                    <div className="flex-w flex-m m-r-20 m-tb-5">
                      <input className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="coupon" placeholder="Mã Giảm Giá" />
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">Xác nhận</div>
                    </div>
                    <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">Cập Nhật Giỏ Hàng</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                  <h4 className="mtext-109 cl2 p-b-30">Thanh toán</h4>
                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Tổng tiền:</span>
                    </div>
                    <div className="size-209">
                      <span className="mtext-110 cl2">72,500,000 ₫</span>
                    </div>
                  </div>
                  <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                    <div className="size-208 w-full-ssm">
                      <span className="stext-110 cl2">HTVC:</span>
                    </div>
                    <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                      <p className="stext-111 cl6 p-t-2">Thanh toán khi nhận hàng</p>
                      <div className="p-t-15">
                        <span className="stext-112 cl8">Địa chỉ nhận hàng:</span>
                        <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                          <select className="js-select2" name="time">
                            <option>Chọn tỉnh thành phố</option>
                            <option>Daklak</option>
                            <option>sa</option>
                          </select>
                          <div className="dropDownSelect2" />
                        </div>
                        <div className="bor8 bg0 m-b-12">
                          <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state" placeholder="Huyện/Thành phố" />
                        </div>
                        <div className="bor8 bg0 m-b-22">
                          <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" placeholder="Số nhà-Đường" />
                        </div>
                        <div className="flex-w">
                          <div className="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">Lưu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-w flex-t p-t-27 p-b-33">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Tổng tiền:</span>
                    </div>
                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">72,500,000 ₫</span>
                    </div>
                  </div>
                  <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">Thanh toán</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    </>
  )
}

export default Index
