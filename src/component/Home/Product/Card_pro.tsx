interface Product {
  maSP: number;
  tenSP: string;
  moTa: string;
  gia: number;
  htvc: number;
  trangThai: number;
  maLoai: number;
  maNhanHieu: number;
  hinhAnh: string;
}

interface CardProProps {
  product: Product;
}
export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/"
const Card_pro: React.FC<CardProProps> = ({ product }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={`${LinkImg}${product.hinhAnh}`} alt={product.tenSP} />
          <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
            Quick View
          </a>
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l">
            <a href="#" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
              {product.tenSP}
            </a>
            <span className="stext-105 cl3">${product.gia}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_pro;
