import { useEffect ,useState, FormEvent} from 'react';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/src/component/Home/Product/Details.css';
// import Card_pro from './Card_pro';
import { useParams,useNavigate } from 'react-router-dom';
import { Sp } from '../../api/SanPhams';
import axios from 'axios'


export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/"
const Details: React.FC  = () => {
    const [sansp, setSanPhams] = useState<Sp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const { maSP } = useParams<{ maSP: string }>();
      const [soLuong, setQuantity] = useState(1);
      const navigate  = useNavigate();
    useEffect(() => {
      const fetchSanPhams = async () => {
          try {
            const response = await axios.get<Sp>(
              `https://localhost:7095/api/SanPhams/${maSP}`
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
  
  
  }, [maSP]);
  console.log(sansp?.kichThuocs); // Kiểm tra toàn bộ dữ liệu sản phẩm

  
    useEffect(() => {
        const initializeSlick = () => {
            $('.slick3').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3000,
                speed: 500,
                fade: true,
                cssEase: 'linear'
            });
        };

        // Delay initialization to ensure the component is fully rendered
        const timer = setTimeout(initializeSlick, 100);

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);
    const handleMinus = () => {
        if (soLuong > 1) {
            setQuantity(soLuong - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(soLuong + 1);
    };
    const gioH = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
    
        const maKT = (form.elements.namedItem("size") as HTMLInputElement).value;
    const maMS = (form.elements.namedItem("color") as HTMLInputElement).value;

    const SanPhamViewModel = {
        maSP,soLuong,maKT,maMS
      };
      console.log("idsanPham:", SanPhamViewModel); 
        try {
        const res = await  axios.post(`https://localhost:7095/api/GioHangs`, SanPhamViewModel);
        console.log("idsanPham:", maSP); // Check if idsanPham is correctly received
        console.log("soLuong:", soLuong); 
        console.log("soLuong:", maKT); 
        console.log("soLuong:", maMS); 
          alert('Sản phẩm đã được thêm vào giỏ hàng!');
          navigate('/card');
          return res.data;
          
        } catch (error) {
            console.error('Lỗi không xác định:', error);
            alert('Đã xảy ra lỗi không xác định, vui lòng thử lại sau.');
          
        }
      };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <>
        <>
  {/* breadcrumb */}
  <div className="container" style={{marginTop: '80px'}}>
    <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
      <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
        Home
        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
      </a>
      <a href="product.html" className="stext-109 cl8 hov-cl1 trans-04">
        Men
        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
      </a>
      <span className="stext-109 cl4">Lightweight Jacket</span>
    </div>
  </div>
</>
{sansp && (
    <section className="sec-product-detail bg0 p-t-65 p-b-60">
    <div className="container">
        <form onSubmit={gioH}>
        <div className="row">
            <div className="col-md-5 col-lg-6 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                    <div className="wrap-slick3">
                        <div className="slick3 gallery-lb">
                            <div className="item-slick3">
                                <div className="wrap-pic-w pos-relative">
                                    <img src={`${LinkImg}${sansp.hinhAnh}`} alt="IMG-PRODUCT" />
                                    <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="src/assets/images/product-detail-01.jpg">
                                        <i className="fa fa-expand" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 col-lg-6 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                       {sansp?.tenSP}
                    </h4>
                    <span className="mtext-106 cl2">{sansp?.gia} VND</span>
                    <p className="stext-102 cl3 p-t-23">
                        {sansp?.moTa}
                    </p>
                    {/*  */}
                    <div className="p-t-33 select-container">
<div className="selection-block row">
{/* <div className="selection-label col-1" htmlFor={size}>Size</div> */}
<label htmlFor="size">Kích Thước: </label>
<div className="col-1"></div>
<div className="select-wrapper col-10">
<select className="select-box" name="size" id="size" >
{sansp.kichThuocs?.length > 0 ? (
                    sansp.kichThuocs.map(kt => (
                        <option className="optionselect" key={kt.maKT}  value={kt.maKT}> {kt.tenKT}</option>
                    ))
                ) : (
                    <p>Không có kích thước</p>
                )}
</select>

</div>
<div className="selection-block row">
{/* <div className="selection-label col-1">Màu Sắc: </div> */}
<label htmlFor="color">Màu Sắc: </label>
<div className="col-1"></div>
<div className="select-wrapper col-10">
<select className="select-box" name="color" id="color" >
{sansp.mauSacs?.length > 0 ? (
                    sansp.mauSacs.map(kt => (
                        <option className="optionselect" key={kt.maMS}  value={kt.maMS}> {kt.tenMS}</option>
                    ))
                ) : (
                    <p>Không có kích thước</p>
                )}
</select>
</div>
</div>

                        <div className="flex-w flex-r-m p-b-10">
                            <div className="size-204 flex-w flex-m respon6-next">
                                <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                    <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onClick={handleMinus}>
                                        <i className="fs-16 zmdi zmdi-minus" />
                                    </div>
                                    <input
                                        className="mtext-104 cl3 txt-center num-product"
                                        type="text"
                                        name="soLuong"
                                        value={soLuong} readOnly
                                    />
                                    <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"  onClick={handlePlus}>
                                        <i className="fs-16 zmdi zmdi-plus" />
                                    </div>
                                </div>
                                <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                type="submit">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </div>
        <div className="bor10 m-t-50 p-t-43 p-b-40">
            {/* Tab01 */}
            <div className="tab01">
                {/* Nav tabs */}
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item p-b-10">
                        <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#description"
                            role="tab"
                        >
                            Description
                        </a>
                    </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content" style={{width:"1200px" , margin:"0 auto"}}>
            <p className="stext-102 cl6 description-container">
                Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
            </p>
    </div>
            </div>
        </div>
    </div>
    </form>
    </div>
    <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
        <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>
        <span className="stext-107 cl6 p-lr-25">Categories: Jacket, Men</span>
    </div>
</section>
  // Kiểm tra dữ liệu màu sắc

)}
            
            {/* <section className="sec-relate-product bg0 p-t-45 p-b-105">
                <div className="container">
                    <div className="p-b-45">
                        <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
                    </div> */}
                    {/* Slide2 */}
                    {/* <div className="row isotope-grid">
            <Card_pro />
          </div>
                </div>
            </section> */}
        </>

    )
}

export default Details