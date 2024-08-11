import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Sp {
  maSP: number;
  tenSP: string;
  gia: number;
  hinhAnhURL: string;
}

interface Card_proProps {
  selectedLoai: number | null;
}

const Card_pro: React.FC<Card_proProps> = ({ selectedLoai }) => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLoadedId, setLastLoadedId] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSanPhams(0); // Load the first set of products
  }, [selectedLoai]);

  const fetchSanPhams = async (lastLoadedId: number) => {
    try {
      setLoading(true);
      const url = selectedLoai !== null 
        ? `https://localhost:7095/api/SanPhams/filter?MaLoai=${selectedLoai}&limit=8&lastLoadedId=${lastLoadedId}`
        : `https://localhost:7095/api/SanPhams?limit=8&lastLoadedId=${lastLoadedId}`;
      const response = await axios.get<Sp[]>(url);
      const newProducts = response.data;
      setSanPhams(prev => lastLoadedId === 0 ? newProducts : [...prev, ...newProducts]);
      if (newProducts.length > 0) {
        setLastLoadedId(newProducts[newProducts.length - 1].maSP);
      }
      if (newProducts.length < 8) {
        setHasMore(false); // No more products to load
      }
      setLoading(false);
    } catch (err) {
      setError('Không thể lấy danh sách sản phẩm');
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchSanPhams(lastLoadedId);
  };

  const CtWeb = async (maSP: number) => {
    try {
      const response = await axios.get<Sp[]>(`https://localhost:7095/api/SanPhams/${maSP}`);
      setSanPhams(response.data);
      navigate(`/${maSP}`);
    } catch (error) {
      console.error('Lỗi trong CtWeb:', error);
    }
  };

  if (loading && sansp.length === 0) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  // Tạo formatter cho tiền tệ VND
  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

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
              <div className="block2-txt-child1 flex-col-l">
                <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                  {item.tenSP}
                </a>
                <span className="stext-105 cl3">{formatPrice(item.gia)}</span>
              </div>
              <div className="block2-txt-child2 flex-r p-t-3"></div>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <div className="flex-c-m flex-w w-full p-t-45">
          <button onClick={loadMore} className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
            Xem thêm
          </button>
        </div>
      )}
    </>
  );
};

export default Card_pro;
