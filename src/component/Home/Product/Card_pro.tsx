import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Sp {
    maSP: number;
    tenSP: string;
    gia: number;
    hinhAnhURL: string;
}

const Card_pro = () => {
    const [sansp, setSanPhams] = useState<Sp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const response = await axios.get<Sp[]>(
                    "https://localhost:7095/api/SanPhams"
                );
                console.log("DATA:", response.data);
                setSanPhams(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchSanPhams();
    }, []);

    const CtWeb = async (maSP: number) => {
        try {
            const response = await axios.get<Sp[]>(`https://localhost:7095/api/SanPhams/${maSP}`);
            console.log('Response data:', response.data);
            setSanPhams(response.data);
            navigate(`/${maSP}`);
        } catch (error) {
            console.error('Error in CtWeb:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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

    return (
        <>
            {sansp.map((item, key) => (
                <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={key}>
                    <div className="block2">
                        <div className="block2-pic hov-img0">
                            <img src={item.hinhAnhURL} alt="IMG-PRODUCT" />
                            <a onClick={() => CtWeb(item.maSP)} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                Chi tiết sản phẩm
                            </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                            <div className="block2-txt-child1 flex-col-l ">
                                <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    {item.tenSP}
                                </a>
                                <span className="stext-105 cl3">{formatPrice(item.gia)}</span>
                            </div>
                            <div className="block2-txt-child2 flex-r p-t-3">
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card_pro;
