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
  selectedBrand: number | null;
  selectedSize: string | null;
  selectedColor: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  searchTerm: string;
}

const Card_pro: React.FC<Card_proProps> = ({
  selectedLoai,
  selectedBrand,
  selectedSize,
  selectedColor,
  minPrice,
  maxPrice,
  searchTerm
}) => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLoadedId, setLastLoadedId] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset lại ID sản phẩm đã tải và danh sách sản phẩm khi bộ lọc hoặc từ khóa tìm kiếm thay đổi
    setLastLoadedId(0);
    setSanPhams([]);
    fetchSanPhams(0, true); // Tải sản phẩm đầu tiên
  }, [selectedLoai, selectedBrand, selectedSize, selectedColor, minPrice, maxPrice, searchTerm]);

  const fetchSanPhams = async (lastLoadedId: number, reset: boolean = false) => {
    try {
      setLoading(true);
      const params = {
        MaLoai: selectedLoai,
        MaNhanHieu: selectedBrand,
        TenKichThuoc: selectedSize,
        TenMauSac: selectedColor,
        GiaToiThieu: minPrice,
        GiaToiDa: maxPrice,
        SearchTerm: searchTerm,
        limit: 8,
        lastLoadedId: lastLoadedId
      };

      const { data } = await axios.get<Sp[]>('https://localhost:7095/api/SanPhams/filter', { params });
      setSanPhams(prev => reset ? data : [...prev, ...data]);

      if (data.length > 0) {
        setLastLoadedId(data[data.length - 1].maSP);
      }
      setHasMore(data.length === 8);
      setLoading(false);
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm', err);
      setError('Không thể tải sản phẩm.');
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchSanPhams(lastLoadedId);
  };

  const handleProductClick = (maSP: number) => {
    navigate(`/${maSP}`);
  };

  // Tạo formatter cho tiền tệ VND
  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const formatPrice = (price: number) => {
    return currencyFormatter.format(price).replace('₫', 'VND');
  };

  if (loading && sansp.length === 0) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {sansp.map((item) => (
        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={item.maSP}>
          <div className="block2">
            <div className="block2-pic hov-img0">
              <img src={item.hinhAnhURL} alt={item.tenSP} />
              <a 
                onClick={() => handleProductClick(item.maSP)} 
                className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
              >
                Chi tiết sản phẩm
              </a>
            </div>
            <div className="block2-txt flex-w flex-t p-t-14">
              <div className="block2-txt-child1 flex-col-l">
                <a href={`/${item.maSP}`} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
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
