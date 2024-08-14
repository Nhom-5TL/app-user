import React, { useState, useEffect } from "react";
import axios from "axios";
import Card_pro from "../Home/Product/Card_pro";

interface Loais {
  maLoai: number;
  tenLoai: string;
}

interface Brands {
  maNhanHieu: number;
  tenNhanHieu: string;
}

interface Sizes {
  maKichThuoc: number;
  tenKichThuoc: string;
}

interface Colors {
  maMauSac: number;
  tenMauSac: string;
}

const Index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterItem, setShowFilterItem] = useState("none");
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchItem, setShowSearchItem] = useState("none");
  const [loais, setLoais] = useState<Loais[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [sizes, setSizes] = useState<Sizes[]>([]);
  const [colors, setColors] = useState<Colors[]>([]);
  const [selectedLoai, setSelectedLoai] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Loais
        const loaiResponse = await axios.get(
          `https://localhost:7095/api/Loais`
        );
        setLoais(loaiResponse.data);

        // Fetch Brands
        const brandResponse = await axios.get(
          `https://localhost:7095/api/NhanHieux`
        );
        setBrands(brandResponse.data);

        // Fetch Sizes
        const sizeResponse = await axios.get(
          `https://localhost:7095/api/KichThuocs`
        );
        const uniqueSizes = removeDuplicates(sizeResponse.data, "tenKichThuoc");
        setSizes(uniqueSizes);

        // Fetch Colors
        const colorResponse = await axios.get(
          `https://localhost:7095/api/MauSacs`
        );
        const uniqueColors = removeDuplicates(colorResponse.data, "tenMauSac");
        setColors(uniqueColors);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const removeDuplicates = (array: any[], key: string) => {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
  };

  const handleLoaiClick = (maLoai: number | null) => {
    setSelectedLoai(maLoai);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
    setShowFilterItem(showFilter ? "none" : "block");
    if (showSearch) {
      handleShowSearch();
    }
  };

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
    setShowSearchItem(showSearch ? "none" : "block");
    if (showFilter) {
      handleShowFilter();
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    if (value !== null && value > 1000000000) {
      alert('Giá tối thiểu không được vượt quá 1.000.000.000 VND');
      return;
    }
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    if (value !== null && value > 1000000000) {
      alert('Giá tối đa không được vượt quá 1.000.000.000 VND');
      return;
    }
    setMaxPrice(value);
  };

 

  return (
    <>
      <section className="bg0 p-t-23 p-b-140">
        <div className="container" style={{marginTop:"20px"}}>
          <div className="p-b-10" style={{marginTop:"20px", marginBottom: "20px", display: 'flex', justifyContent: 'center' }}>
          </div>
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  selectedLoai === null ? "how-active1" : ""
                }`}
                onClick={() => handleLoaiClick(null)}
              >
                Tất cả sản phẩm
              </button>
              {loais.map((item) => (
                <button
                  key={item.maLoai}
                  className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                    selectedLoai === item.maLoai ? "how-active1" : ""
                  }`}
                  onClick={() => handleLoaiClick(item.maLoai)}
                >
                  {item.tenLoai}
                </button>
              ))}
            </div>
            <div className="flex-w flex-c-m m-tb-10">
              <div
                className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
                onClick={handleShowFilter}
              >
                <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list" />
                <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                Bộ Lọc
              </div>
              <div
                className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search"
                onClick={handleShowSearch}
              >
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                Tìm Kiếm
              </div>
            </div>
            {/* Search product */}
            <div
              className="dis-none panel-search w-full p-t-10 p-b-15"
              style={{ display: showSearchItem }}
            >
              <div className="bor8 dis-flex p-l-15">
                <button
                  className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04"
                  onClick={() => setSearchTerm(searchTerm)}
                >
                  <i className="zmdi zmdi-search" />
                </button>
                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Tìm Kiếm Sản Phẩm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
           {/* Filter */}
<div className="panel-filter w-full p-t-10" style={{ display: showFilterItem }}>
  <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
    {/* Thương hiệu */}
    <div className="filter-col1 p-r-15 p-b-27">
      <div className="mtext-102 cl2 p-b-15">THƯƠNG HIỆU</div>
      <div className="filter-options">
        {brands.map((brand) => (
          <button
            key={brand.maNhanHieu}
            className={`filter-button ${selectedBrand === brand.maNhanHieu ? "active" : ""}`}
            onClick={() =>
              setSelectedBrand(
                selectedBrand === brand.maNhanHieu
                  ? null
                  : brand.maNhanHieu
              )
            }
          >
            {brand.tenNhanHieu}
          </button>
        ))}
      </div>
    </div>

    {/* Kích thước */}
    <div className="filter-col2 p-r-15 p-b-27">
      <div className="mtext-102 cl2 p-b-15">KÍCH THƯỚC</div>
      <div className="filter-options">
        {sizes.map((size) => (
          <button
            key={size.maKichThuoc}
            className={`filter-button ${selectedSize === size.tenKichThuoc ? "active" : ""}`}
            onClick={() =>
              setSelectedSize(
                selectedSize === size.tenKichThuoc
                  ? null
                  : size.tenKichThuoc
              )
            }
          >
            {size.tenKichThuoc}
          </button>
        ))}
      </div>
    </div>

    {/* Màu sắc */}
    <div className="filter-col3 p-r-15 p-b-27">
      <div className="mtext-102 cl2 p-b-15">MÀU SẮC</div>
      <div className="filter-options">
        {colors.map((color) => (
          <button
            key={color.maMauSac}
            className={`filter-button ${selectedColor === color.tenMauSac ? "active" : ""}`}
            onClick={() =>
              setSelectedColor(
                selectedColor === color.tenMauSac
                  ? null
                  : color.tenMauSac
              )
            }
          >
            {color.tenMauSac}
          </button>
        ))}
      </div>
    </div>


    {/* Khoảng giá */}
    <div className="filter-col4 p-r-15 p-b-27">
      <div className="mtext-102 cl2 p-b-15">KHOẢNG GIÁ</div>
      <div>
        <label>Giá tối thiểu:</label>
        <input
          type="number"
          max={10000000000}
          onChange={handleMinPriceChange}
        />
      </div>
      <div>
        <label>Giá tối đa:</label>
        <input
          type="number"
          max={10000000000}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>

   
  </div>
</div>

          </div>

          <div className="row isotope-grid">
            <Card_pro
              selectedLoai={selectedLoai}
              selectedBrand={selectedBrand}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              minPrice={minPrice}
              maxPrice={maxPrice}
              searchTerm={searchTerm}
            />
          </div>
          {/* Load more */}
        
        </div>
      </section>
    </>
  );
};

export default Index;
