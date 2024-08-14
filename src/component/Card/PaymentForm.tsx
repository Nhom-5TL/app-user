import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment-form.css";

interface ChiTietDonHang {
    maSP: number;
    tenSP: string;
    tenKT: string;
    tenMS: string;
    gia: number;
    soLuong: number;
}

interface Province {
    id: number;
    name: string;
    name_en: string;
    full_name: string;
    full_name_en: string;
    latitude: string;
    longitude: string;
}

interface District {
    id: number;
    name: string;
    name_en: string;
    full_name: string;
    full_name_en: string;
    latitude: string;
    longitude: string;
}

interface Ward {
    id: number;
    name: string;
}

interface DonHangDto {
    tenKh: string;
    diaChi: string;
    sdt: string;
    ghiChu: string;
    trangThaiThanhToan: string;
    maKH: string;
    tinhThanh: string;
    quanHuyen: string;  
    phuongXa: string;
    chiTietDonHangs: ChiTietDonHangDto[];
}

interface ChiTietDonHangDto {
    maSP: string;
    tenMS: string;
    tenKT: string;
    soLuong: number;
    donGia: number;
    tenSP: string;
}

const PaymentForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("COD");
    const [cartItems, setCartItems] = useState<ChiTietDonHang[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [maKH, setCustomerId] = useState<string | null>(null);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [donHangPost, setDonHangPost] = useState<DonHangDto>({
        tenKh: "",
        diaChi: "",
        sdt: "",
        ghiChu: "",
        trangThaiThanhToan: "",
        maKH: "",
        tinhThanh: "",
        quanHuyen: "",
        phuongXa: "",
        chiTietDonHangs: [],
    });

    // const getProvinceName = (id: number | null): string => {
    //     const province = provinces.find(p => p.id === id);
    //     return province ? province.name : '';
    // };

    useEffect(() => {
        // Load provinces
        loadtinh();
    }, []);

    const loadtinh = () => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                const data = response.data;
                if (data.error === 0) {
                    setProvinces(data.data);

                } else {
                    setError("Không thể tải tỉnh thành.");
                }
            })
            .catch(error => {
                console.error(error);
                setError("Không thể tải tỉnh thành.");
            });
    }
    const loadhuyen = (idTinh: string | null) => {
        if (idTinh !== null) {
            
            // Load districts based on selected province
            axios.get(`https://esgoo.net/api-tinhthanh/2/${idTinh}.htm`)
                .then(response => {
                    const data = response.data;
                    if (data.error === 0) {
                        setDistricts(data.data);
                    } else {
                        setError("Không thể tải quận huyện.");
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("Không thể tải quận huyện.");
                });
        }
    }
    const loadxa = (idQuan: string | null) => {
        if (idQuan !== null) {
            // Load wards based on selected district
            axios.get(`https://esgoo.net/api-tinhthanh/3/${idQuan}.htm`)
                .then(response => {
                    const data = response.data;
                    if (data.error === 0) {
                        setWards(data.data);
                    } else {
                        setError("Không thể tải xã phường.");
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("Không thể tải xã phường.");
                });
        }
    }
    

    const handleProvinceChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const idTinh = event.target.value;
        setSelectedProvince(idTinh);
        const nameProvince = await getNameProvinceById(parseInt(event.target.value));
        await setDonHangPost({ ...donHangPost, tinhThanh: nameProvince });
        await loadhuyen(idTinh);
        
    };
    const handleDistrictChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const idQuan = event.target.value;
        setSelectedDistrict(idQuan);
        const nameProvince = await getNameDistrictById(parseInt(event.target.value));
        await setDonHangPost({ ...donHangPost, quanHuyen: nameProvince });
        await loadxa(idQuan);
    };
    const handleWardChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const idXa = event.target.value;
        setSelectedWard(idXa);
        const nameProvince = await getNameWardById(parseInt(event.target.value));
        await setDonHangPost({ ...donHangPost, phuongXa: nameProvince });
        
    };

    
    const getNameProvinceById = async (id: number | null): Promise<string> => {
        const provinceName = await provinces.find(p => p.id == id)?.name;
        return provinceName ? provinceName : '';
    }
    const getNameDistrictById = async (id: number | null): Promise<string> => {

        const provinceName = await districts.find(p => p.id == id)?.name;
        return provinceName ? provinceName : '';
    }
    const getNameWardById = async (id: number | null): Promise<string> => {
        const provinceName = await wards.find(p => p.id == id)?.name;
        return provinceName ? provinceName : '';
    }


    

    useEffect(() => {
        if (selectedProvince !== null) {
            // Load districts based on selected province
            axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
                .then(response => {
                    const data = response.data;
                    if (data.error === 0) {
                        setDistricts(data.data);
                        setSelectedDistrict(null); // Reset district and ward selections
                        setWards([]);
                    } else {
                        setError("Không thể tải quận huyện.");
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("Không thể tải quận huyện.");
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict !== null) {
            // Load wards based on selected district
            axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
                .then(response => {
                    const data = response.data;
                    if (data.error === 0) {
                        setWards(data.data);
                    } else {
                        setError("Không thể tải xã phường.");
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("Không thể tải xã phường.");
                });
        }

    }, [selectedDistrict]);

    useEffect(() => {
        const data = location.state as { cartItems: ChiTietDonHang[] };
        if (data && data.cartItems) {
            setCartItems(data.cartItems);
        } else {
            setError("Không có sản phẩm nào trong giỏ hàng.");
        }

        const id = localStorage.getItem("maKH");
        if (id) {
            setCustomerId(id);
        } else {
            setError("ID khách hàng không có sẵn. Vui lòng đăng nhập lại.");
        }
    }, [location.state]);




    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!maKH) {
            setError("ID khách hàng không có sẵn. Vui lòng đăng nhập lại.");
            return;
        }
        const donHangPost2=
            {
                tenKh: name,
                diaChi: address,
                sdt: phone,
                ghiChu: note,
                trangThaiThanhToan: paymentMethod,
                maKH:maKH,
                tinhThanh: donHangPost.tinhThanh,
                quanHuyen: donHangPost.quanHuyen,
                xaPhuong: donHangPost.phuongXa,
                chiTietDonHangs:cartItems
            }
        
        try {
            if (paymentMethod === "VNPay") {
                const orderResponse = await axios.post(
                    "https://localhost:7095/api/DonHang/CreateOrder",
                    donHangPost2
                );

                const maDH = orderResponse.data.maDH;

                const vnPayResponse = await axios.post(
                    "https://localhost:7095/api/DonHang/OrderPayVNPay",
                    {
                        Amount: cartItems.reduce(
                            (acc, item) => acc + item.gia * item.soLuong,
                            0
                        ),
                        Id: maDH,
                    }
                );

                window.location.href = vnPayResponse.data.message;
            } else {
                await axios.post(
                    "https://localhost:7095/api/GioHangs/CreateOrder",
                    donHangPost2
                );
                alert("Tạo đơn hàng thành công!");
                setSuccess("Đơn hàng đã được tạo thành công.");
                setError(null);
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                setError(`Lỗi: ${error.response.data.error}`);
            } else {
                setError("Không thể tạo đơn hàng. Vui lòng thử lại.");
            }
            setSuccess(null);
        }
    };

    return (
        <div className="payment-form-wrapper">
            <form onSubmit={handleSubmit} className="payment-form">
                <label>
                    Tên:
                    <input
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Tỉnh thành:
                    <select
                        value={selectedProvince ?? ''}
                        onChange={handleProvinceChange}
                        required
                    >
                        <option value="">Chọn tỉnh thành</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Quận huyện:
                    <select
                        value={selectedDistrict ?? ''}
                        onChange={handleDistrictChange}
                        required
                    >
                        <option value="">Chọn quận huyện</option>
                        {districts.map(district => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Xã phường:
                    <select
                        value={selectedWard ?? ''}
                        onChange={handleWardChange}
                        required
                    >
                        <option value="">Chọn xã phường</option>
                        {wards.map(ward => (
                            <option key={ward.id} value={ward.id}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Địa chỉ:
                    <input
                        type="text"
                        value={address}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Số điện thoại:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Ghi chú:
                    <textarea
                        value={note}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                    />
                </label>
                <label>
                    Phương thức thanh toán:
                    <select
                        value={paymentMethod}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value)}
                    >
                        <option value="COD">Thanh toán khi nhận hàng</option>
                        <option value="VNPay">Thanh toán VNPay</option>
                    </select>
                </label>
                <div className="cart-details">
                    <h3>Chi tiết đơn hàng</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.maSP}>
                                    <td>{item.tenSP}</td>
                                    <td>{item.tenKT}</td>
                                    <td>{item.tenMS}</td>
                                    <td>{item.gia} ₫</td>
                                    <td>{item.soLuong}</td>
                                    <td>{item.gia * item.soLuong} ₫</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="submit">Xác nhận đơn hàng</button>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </form>
        </div>
    );
};

export default PaymentForm;
