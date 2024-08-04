import { useEffect, useState, FormEvent } from 'react';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/src/component/Home/Product/Details.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Sp } from '../../api/SanPhams';
import axios from 'axios';
import SPLQ from "../../Home/Product/SPLQ";
import { toast } from 'react-toastify';
import { useCart } from '../../api/CartContext'; // Đảm bảo đường dẫn đúng

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/";

const Details: React.FC = () => {
    const [sansp, setSanPhams] = useState<Sp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { maSP } = useParams<{ maSP: string }>();
    const [soLuong, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const response = await axios.get<Sp>(`https://localhost:7095/api/SanPhams/${maSP}`);
                console.log("DATA1:", response.data);
                setSanPhams(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchSanPhams();
    }, [maSP]);

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

        const timer = setTimeout(initializeSlick, 100);
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
        const maKT = (form.elements.namedItem("size") as HTMLInputElement)?.value || '';
        const maMS = (form.elements.namedItem("color") as HTMLInputElement)?.value || '';

        const SanPhamViewModel = {
            maSP, soLuong, maKT, maMS
        };

        try {
            const res = await axios.post(`https://localhost:7095/api/GioHangs`, SanPhamViewModel);
            toast.success("Đã thêm vào giỏ hàng thành công");
            
            // Cập nhật giỏ hàng
            addToCart(soLuong);

            // Điều hướng tới trang giỏ hàng (nếu cần)
            // navigate('/card');

            return res.data;
        } catch (error) {
            console.error('Lỗi không xác định:', error);
            toast.error("Thêm vào giỏ hàng thất bại");
        }
    };

    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
  
    // Hàm thay thế ký hiệu ₫ bằng "VND"
    const formatPrice = (price: number) => {
        const formatted = currencyFormatter.format(price);
        return formatted.replace('₫', 'VND');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const hinhAnhs = sansp?.hinhAnhs ?? [];
    const kichThuocs = sansp?.kichThuocs ?? [];
    const mauSacs = sansp?.mauSacs ?? [];

    return (
        <>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Trang chủ
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
                    </a>
                    {sansp && (
                    <span className="stext-109 cl4">{sansp.tenSP}</span>
                    )}
                </div>
            </div>

            {sansp && (
                <section className="sec-product-detail bg0 p-t-65 p-b-60">
                    <div className="container">
                        <form onSubmit={gioH}>
                            <div className="row">
                                <div className="col-md-5 col-lg-6 p-b-30">
                                    <div className="slick3">
                                        {hinhAnhs.map((image, index) => (
                                            <div key={index} className="slick-slide">
                                                <img className="d-block w-100" src={LinkImg + image.tenHinhAnh} alt={`Slide ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-7 col-lg-6 p-b-30">
                                    <div className="p-r-50 p-t-5 p-lr-0-lg">
                                        <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                            {sansp.tenSP}
                                        </h4>
                                        <span className="mtext-106 cl2">{formatPrice(sansp.gia)}</span>
                                        <p className="stext-102 cl3 p-t-23">
                                            {sansp.moTa}
                                        </p>
                                        <div className="p-t-33 select-container">
                                            <div className="selection-block row">
                                                <label htmlFor="size">Kích Thước: </label>
                                                <div className="select-wrapper col-10">
                                                    <select className="select-box" name="size" id="size">
                                                        {kichThuocs.length > 0 ? (
                                                            kichThuocs.map(kt => (
                                                                <option className="optionselect" key={kt.maKT} value={kt.maKT}> {kt.tenKT}</option>
                                                            ))
                                                        ) : (
                                                            <option value="">Không có kích thước</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="selection-block row">
                                                <label htmlFor="color">Màu Sắc: </label>
                                                <div className="select-wrapper col-10">
                                                    <select className="select-box" name="color" id="color">
                                                        {mauSacs.length > 0 ? (
                                                            mauSacs.map(ms => (
                                                                <option className="optionselect" key={ms.maMS} value={ms.maMS}> {ms.tenMS}</option>
                                                            ))
                                                        ) : (
                                                            <option value="">Không có màu sắc</option>
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
                                                            value={soLuong}
                                                            readOnly
                                                        />
                                                        <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" onClick={handlePlus}>
                                                            <i className="fs-16 zmdi zmdi-plus" />
                                                        </div>
                                                    </div>
                                                    <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" type="submit">
                                                        Thêm vào giỏ hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="bor10 m-t-50 p-t-43 p-b-40">
                            <div className="tab01">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item p-b-10">
                                        <a className="nav-link active" data-toggle="tab" href="#description" role="tab">
                                            Mô tả
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" style={{ width: "1200px", margin: "0 auto" }}>
                                    <p className="stext-102 cl6 description-container">
                                    {sansp.moTa}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="sec-relate-product bg0 p-t-45 p-b-105">
                <div className="container">
                    <div className="p-b-45">
                        <h3 className="ltext-106 cl5 txt-center">Sản phẩm liên quan</h3>
                    </div>
                    <div className="row isotope-grid">
            <SPLQ />
          </div>
                    <div className="row isotope-grid"></div>
                </div>
            </section>
        </>
    );
}

export default Details;
