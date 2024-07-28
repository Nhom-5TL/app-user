import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { Sp } from '../../api/SanPhams';
const Card_pro = () => {
  const [sansp, setSanPhams] = useState<Sp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate  = useNavigate();
  useEffect(() => {
    const fetchSanPhams = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7095/api/SanPhams"
          );
          console.log("DATA:", response.data); // getSanPhamAPI đã trả về data
            setSanPhams(response.data); // data đã được xử lý bởi interceptor
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
    console.log('Response data:', response.data); // Kiểm tra dữ liệu trả về
    setSanPhams(response.data);
    navigate(`./${maSP}`);
  } catch (error) {
    console.error('Error in CtWeb:', error);
  }
};
if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  return (
    <>
    {sansp?.map((item, key) => (
      <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={key}>
      {/* Block2 */}
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={`src/assets/images/${item.hinhAnh}`} alt="IMG-PRODUCT" />
          <a onClick={() => CtWeb(item.maSP)} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
            Chi tiết sản phẩm
          </a>
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
             {item.tenSP}
            </a>
            <span className="stext-105 cl3">{item.gia} VND</span>
          </div>
          <div className="block2-txt-child2 flex-r p-t-3">
            <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
              <img className="icon-heart1 dis-block trans-04" src="src/assets/images/icons/icon-heart-01.png" alt="ICON" />
              <img className="icon-heart2 dis-block trans-04 ab-t-l" src="src/assets/images/icons/icon-heart-02.png" alt="ICON" />
            </a>
          </div>
        </div>
      </div>
</div>
    ))}
        
    </>
  )
}

export default Card_pro