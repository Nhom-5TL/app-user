import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sp } from '../../api/SanPhams';
import axios from 'axios';
import '/src/component/Home/Product/SPXN.css';
interface SPLQProps {
    excludeId?: number; // Use optional if it's not always required
}
const SPXN: React.FC<SPLQProps> = ({ excludeId }) => {
    const [sansp, setSanPhams] = useState<Sp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const response = await axios.get<Sp[]>("https://localhost:7095/api/SanPhams");
                // Sắp xếp và giới hạn số lượng sản phẩm
                const sortedProducts = response.data // Lọc sản phẩm hiện tại
                    .sort((a, b) => b.soLuotXem - a.soLuotXem) // Sắp xếp theo số lượt xem giảm dần
                    .slice(0, 4); // Lấy 4 sản phẩm đầu tiên

                setSanPhams(sortedProducts);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchSanPhams();
    }, [excludeId]);

    const handleViewDetails = async (maSP: number) => {
        try {
            // Gọi API để cập nhật số lượt xem
            await axios.post(`https://localhost:7095/api/SanPhams/update-views/${maSP}`);
            navigate(`/${maSP}`);
        } catch (err) {
            console.error('Failed to update views', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {sansp.map((item) => (
                <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={item.maSP}>
                    <div className="block2">
                        <div className="block2-pic hov-img0">
                            <img src={item.hinhAnhURL} alt="IMG-PRODUCT" />
                            <span className="hot-banner">HOT</span>
                            <a 
                                onClick={() => handleViewDetails(item.maSP)} 
                                className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                            >
                                Chi tiết sản phẩm
                            </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                            <div className="block2-txt-child1 flex-col-l">
                                <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    {item.tenSP}
                                </a>
                                <span className="stext-105 cl3">{item.gia} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SPXN;
